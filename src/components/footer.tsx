"use client";

import "../styles/Landingpage/footer.css";

export default function Footer() {
  const footerSections = [
    {
      titulo: "PetCare Memorial",
      conteudo: ["Cuidando com amor da despedida do seu melhor amigo."],
    },
    {
      titulo: "Contato",
      conteudo: [
        "📞 (11) 9999-9999",
        "✉️ contato@petcarememorial.com.br",
        "📍 São Paulo, SP",
      ],
    },
    {
      titulo: "Horário de Atendimento",
      conteudo: [
        "Segunda a Sexta: 8h às 18h",
        "Sábado: 8h às 14h",
        "Emergências: 24h",
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {footerSections.map((section, index) => (
            <div key={index} className="footer-section">
              <h4>{section.titulo}</h4>
              {section.conteudo.map((item, itemIndex) => (
                <p key={itemIndex}>{item}</p>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom"></div>
      </div>
    </footer>
  );
}
