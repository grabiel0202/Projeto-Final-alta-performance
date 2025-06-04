import React, { useState } from "react";

export default function AuthModal({ show, onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const url = isLogin ? "http://localhost:4000/api/login" : "http://localhost:4000/api/register";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Erro desconhecido");
        return;
      }

      if (isLogin) {
        onLogin(data.token);
        onClose();
      } else {
        setMessage("Usuário criado! Agora faça login.");
        setIsLogin(true);
      }
    } catch (err) {
      setMessage("Erro na comunicação com o servidor");
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
      justifyContent: "center", alignItems: "center",
      zIndex: 9999,
    }}>
      <div style={{ background: "white", padding: 20, borderRadius: 8, width: 300 }}>
        <h2>{isLogin ? "Login" : "Cadastro"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 10, padding: 8 }}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 10, padding: 8 }}
          />
          {message && <p style={{ color: "red" }}>{message}</p>}
          <button type="submit" style={{ width: "100%", padding: 10 }}>
            {isLogin ? "Entrar" : "Cadastrar"}
          </button>
        </form>
        <p style={{ marginTop: 10, cursor: "pointer", color: "blue", textAlign: "center" }} onClick={() => { setIsLogin(!isLogin); setMessage(""); }}>
          {isLogin ? "Criar uma conta" : "Já tenho conta"}
        </p>
        <button onClick={onClose} style={{ marginTop: 10, width: "100%" }}>Fechar</button>
      </div>
    </div>
  );
}
