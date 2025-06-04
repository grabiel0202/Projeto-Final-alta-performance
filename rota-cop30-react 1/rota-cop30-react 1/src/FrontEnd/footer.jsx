import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <p>&copy; {currentYear} Rota COP30. Desenvolvido pelos Alunos de BCC Noite 3° Semestre da UNAMA.</p>
    </footer>
  );
};

export default Footer;