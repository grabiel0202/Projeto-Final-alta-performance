const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = "./users.json";
const SECRET_KEY = "qualquerchave"; // troca isso depois

// Ler usuários do arquivo
function readUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Salvar usuários no arquivo
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Rota cadastro
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ error: "Username e senha obrigatórios" });

  const users = readUsers();
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: "Usuário já existe" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  saveUsers(users);

  res.status(201).json({ message: "Usuário criado com sucesso" });
});

// Rota login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username);

  if (!user) return res.status(401).json({ error: "Usuário ou senha inválidos" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ error: "Usuário ou senha inválidos" });

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ token });
});

// Rota protegida de teste
app.get("/api/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: `Bem-vindo, ${decoded.username}!` });
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
