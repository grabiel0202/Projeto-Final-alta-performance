import React, { useState, useEffect } from "react";
import RotaCOP30 from "./RotaCOP30";
import Sobre from "./sobre";
import Footer from "./footer";
import AuthModal from "./AuthModal";
import './custom.css';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("login");
  const [token, setToken] = useState(null);
  const [activeSection, setActiveSection] = useState("inicio");

  const handleLogout = () => setToken(null);

  const openLoginModal = () => {
    setModalMode("login");
    setModalOpen(true);
  };

  const openRegisterModal = () => {
    setModalMode("register");
    setModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "inicio", offset: 0 },
        { id: "pontos-turisticos", offset: document.getElementById("pontos-turisticos")?.offsetTop },
        { id: "restaurantes", offset: document.getElementById("restaurantes")?.offsetTop },
        { id: "sobre", offset: document.getElementById("sobre")?.offsetTop }
      ];

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].offset - 80) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Para setar na primeira renderização
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="custom-header text-center">
        <img src="images/rotaIcon.png" alt="Logo Rota COP30" className="logo-img mb-2" />
        <div className="titulo-site">ROTA COP30</div>

        <div className="d-flex nav nav-pills nav-centralizada align-items-center justify-content-center">
          <a className={`nav-link ${activeSection === "inicio" ? "active" : ""}`} href="#">Início</a>
          <a className={`nav-link ${activeSection === "pontos-turisticos" ? "active" : ""}`} href="#pontos-turisticos">Ponto Turístico</a>
          <a className={`nav-link ${activeSection === "restaurantes" ? "active" : ""}`} href="#restaurantes">Restaurante</a>
          <a className={`nav-link ${activeSection === "sobre" ? "active" : ""}`} href="#sobre">Sobre</a>

          {!token ? (
            <>
              <button className="nav-link" onClick={openLoginModal}>Login</button>
              <button className="nav-link" onClick={openRegisterModal}>Cadastro</button>
            </>
          ) : (
            <button className="nav-link" onClick={handleLogout}>Sair</button>
          )}
        </div>
      </header>

      <main>
        <div id="inicio" className="container secao-destaque">
          {/* Conteúdo de destaque */}
        </div>

        <RotaCOP30 />
        <Sobre />
      </main>

      <Footer />

      <AuthModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        onLogin={setToken}
        initialMode={modalMode}
      />
    </>
  );
}

export default App;
