"use client";

import "../styles/planos.css";

export default function Planos() {
  const planos = [
    {
      nome: "Básico",
      preco: "29",
      features: [
        "✓ Cremação individual",
        "✓ Urna básica incluída",
        "✓ Certificado de cremação",
        "✓ Coleta em domicílio",
      ],
      featured: false,
    },
    {
      nome: "Premium",
      preco: "59",
      features: [
        "✓ Cremação individual",
        "✓ Urna premium personalizada",
        "✓ Certificado de cremação",
        "✓ Coleta em domicílio",
        "✓ Memorial online",
        "✓ Suporte 24h",
      ],
      featured: true,
    },
    {
      nome: "Família",
      preco: "99",
      features: [
        "✓ Até 3 pets por mês",
        "✓ Cremação individual",
        "✓ Urnas premium personalizadas",
        "✓ Certificados de cremação",
        "✓ Coleta em domicílio",
        "✓ Memorial online",
        "✓ Suporte prioritário 24h",
      ],
      featured: false,
    },
  ];

  return (
    <section id="planos" className="planos">
      <div className="container">
        <h2>Nossos Planos de assinatura</h2>
        <p className="section-subtitle">
          Escolha o plano que melhor atende às suas necessidades
        </p>

        <div className="planos-grid">
          {planos.map((plano, index) => (
            <div
              key={index}
              className={`plano-card ${plano.featured ? "featured" : ""}`}
            >
              {plano.featured && <div className="badge">Mais Popular</div>}
              <div className="plano-header">
                <h3>{plano.nome}</h3>
                <div className="preco">
                  <span className="valor">R$ {plano.preco}</span>
                  <span className="periodo">/mês</span>
                </div>
              </div>
              <ul className="plano-features">
                {plano.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
              <button className="btn-plano">Escolher Plano</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
