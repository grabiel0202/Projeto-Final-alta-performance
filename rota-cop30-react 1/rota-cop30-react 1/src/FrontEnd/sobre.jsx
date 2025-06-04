import React from 'react';

const Sobre = () => {
  return (
    <section id="sobre" className="sobre-secao">
      <div className="container content-block text-center">
        <h2 className="titulo-secao">Sobre Nós</h2>
        <p className="texto-sobre">
        Somos alunos do 3º semestre de Ciência da Computação (turma da noite) da UNAMA, e estamos desenvolvendo um site com a temática COP30.
        Se você tiver sugestões ou quiser contribuir com ideias para melhorarmos o projeto, entre no nosso grupo do WhatsApp! Sua participação será muito bem-vinda.
        </p>
        {/*  pra botar aqui o link do nosso grupo */}
        <a href="https://chat.whatsapp.com/KxzGekhpAQkGD0VmldZgXB" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
          <i className="fab fa-whatsapp"></i> Entrar no Grupo do WhatsApp
        </a>
      </div>
    </section>
  );
};

export default Sobre;