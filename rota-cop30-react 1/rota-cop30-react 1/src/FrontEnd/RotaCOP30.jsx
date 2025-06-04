import React from "react";

const locais = {
  pontosTuristicos: [
    {
      nome: "Estação das Docas",
      imagem: "/images/docas.jpg",
      descricao:
        "Armazéns portuários revitalizados com bares, restaurantes, lojas e vista para a Baía do Guajará.",
      link: "https://estacaodasdocas.com/",
      avaliacoes: 450,
      estrelas: 4.5
    },
    {
      nome: "Parque Estadual do Utinga",
      imagem: "/images/parqueutinga.jpg", 
      descricao:
        "Unidade de conservação com trilhas, lagos e rica biodiversidade amazônica.",
      link: "https://parquedoutinga.com.br/",
      avaliacoes: 380,
      estrelas: 5
    },
    {
      nome: "Theatro da Paz",
      imagem: "/images/theatrodapaz.jpg",
      descricao:
        "Joia arquitetônica neoclássica e um dos mais importantes teatros do Brasil.",
      link: "https://www.theatrodapaz.com.br/",
      avaliacoes: 520,
      estrelas: 4.5
    }
  ],
  restaurantes: [
    {
      nome: "Casa do Saulo",
      imagem: "/images/casasaulo.jpg", 
      descricao:
        "Gastronomia amazônica com toque contemporâneo e vista deslumbrante.",
      link: "https://www.instagram.com/casadosauloonzejanelas/",
      avaliacoes: 615,
      estrelas: 5
    },
    {
      nome: "Ver-o-Açaí",
      imagem: "/images/veroacai.jpg",
      descricao: "Comida fresca e um ambiente acolhedor.",
      link: "https://www.instagram.com/veroacaibelem/",
      avaliacoes: 198,
      estrelas: 4
    },
    {
      nome: "Ver-o-Peso",
      imagem: "/images/veropeso-expedicao-para.jpg", 
      descricao:
        "Variedades de Restaurantes, tudo com a cara de Belém, típica comida regional.",
      link: "https://viajeleve.net/mercado-ver-o-peso/",
      avaliacoes: 412,
      estrelas: 4.5
    }
  ]
};
const Card = ({ local }) => {
  return (
    <a
      href={local.link}
      target="_blank"
      rel="noopener noreferrer"
      className="col-md-4 text-decoration-none text-dark mb-4"
    >
      <div className="card h-100">
        <img src={local.imagem} className="card-img-top" alt={local.nome} />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title fw-bold">{local.nome}</h5>
            <p className="card-text">{local.descricao}</p>
          </div>
          <div className="rating mt-2">
            {[...Array(Math.floor(local.estrelas))].map((_, i) => (
              <i className="fas fa-star" key={i}></i>
            ))}
            {local.estrelas % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
            <span className="rating-text ms-2">({local.avaliacoes} avaliações)</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default function RotaCOP30() {
  return (
    <div className="container mt-5">
      <section id="pontos-turisticos" className="mb-5">
        <h3 className="text-center mb-4">Pontos Turísticos</h3>
        <div className="row">
          {locais.pontosTuristicos.map((local, index) => (
            <Card key={index} local={local} />
          ))}
        </div>
      </section>

      <section id="restaurantes" className="mb-5">
        <h3 className="text-center mb-4">Restaurantes</h3>
        <div className="row">
          {locais.restaurantes.map((local, index) => (
            <Card key={index} local={local} />
          ))}
        </div>
      </section>
    </div>
  );
}
