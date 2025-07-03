"use client";

import "../styles/sobre.css";

export default function Sobre() {
  const stats = [
    { numero: "15+", descricao: "Anos de experiência" },
    { numero: "5000+", descricao: "Familia Atendidas" },
    { numero: "24h+", descricao: "Suporte Disponível" },
  ];

  return (
    <section id="sobre" className="sobre">
      <div className="container">
        <div className="sobre-content">
          <div className="sobre-text">
            <h2>Sobre Nós</h2>
            <p>
              Há mais de 15 anos, a RAplication tem sido uma referência em
              serviços de cremação para animais de estimação. Entendemos que a
              perda de um pet é um momento muito difícil, e por isso oferecemos
              um serviço compassivo e respeitoso.
            </p>
            <p>
              Nossa equipe é formada por profissionais especializados que tratam
              cada animal com o mesmo carinho que você dedicou durante toda a
              vida. Utilizamos equipamentos modernos e seguimos os mais altos
              padrões de qualidade e ética.
            </p>
            <div className="stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat">
                  <h3>{stat.numero}</h3>
                  <p>{stat.descricao}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="sobre-image">
            <img
              src="/placeholder.svg?height=400&width=500"
              alt="Nossa Equipe"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
