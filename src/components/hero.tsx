"use client";

import "../styles/hero.css";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Despedida com Amor e Dignidade</h1>
          <p>
            Oferecemos serviços de cremação para pets com o carinho e respeito
            que seu companheiro merece. Planos acessíveis para garantir uma
            despedida tranquila
          </p>
          <button
            onClick={() => scrollToSection("planos")}
            className="btn-primary"
          >
            Ver Planos
          </button>
        </div>
        <div className="hero-image">
          <img src="/placeholder.svg?height=400&width=500" alt="Pet Memorial" />
        </div>
      </div>
    </section>
  );
}
