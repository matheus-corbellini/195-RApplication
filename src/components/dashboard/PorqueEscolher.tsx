"use client";

import "../../styles/dashboard/PorqueEscolher.css";
import { Heart, Award, Shield, Car, Clock, Building, Star } from "lucide-react";

export default function PorqueEscolher() {
  const reasons = [
    {
      icon: <Heart size={48} />,
      title: "Cuidado Compassivo",
      description:
        "Tratamos cada pet com o mesmo amor e carinho que você dedicou durante toda a vida dele.",
    },
    {
      icon: <Award size={48} />,
      title: "15 Anos de Experiência",
      description:
        "Mais de uma década cuidando da despedida de pets com profissionalismo e respeito.",
    },
    {
      icon: <Shield size={48} />,
      title: "Cremação Individual",
      description:
        "Garantimos que cada cremação seja individual, você recebe apenas as cinzas do seu pet.",
    },
    {
      icon: <Car size={48} />,
      title: "Coleta Domiciliar",
      description:
        "Nossa equipe vai até sua casa ou clínica veterinária para buscar seu pet.",
    },
    {
      icon: <Clock size={48} />,
      title: "Suporte 24 Horas",
      description:
        "Estamos disponíveis 24h por dia, 7 dias por semana para atendê-lo quando precisar.",
    },
    {
      icon: <Building size={48} />,
      title: "Instalações Modernas",
      description:
        "Equipamentos de última geração e instalações preparadas para oferecer o melhor serviço.",
    },
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      text: "Quando perdemos nossa Luna, a PetCare Memorial nos deu todo o suporte necessário. O carinho da equipe fez toda a diferença nesse momento difícil.",
      rating: 5,
    },
    {
      name: "João Santos",
      text: "Profissionais extremamente cuidadosos e respeitosos. O processo foi transparente e nos sentimos seguros em todos os momentos.",
      rating: 5,
    },
    {
      name: "Ana Costa",
      text: "Recomendo de olhos fechados. Trataram nosso Max com toda dignidade que ele merecia. Muito obrigada por tudo!",
      rating: 5,
    },
  ];

  const stats = [
    { number: "5000+", label: "Famílias Atendidas" },
    { number: "15+", label: "Anos de Experiência" },
    { number: "24h", label: "Suporte Disponível" },
    { number: "100%", label: "Satisfação dos Clientes" },
  ];

  return (
    <div className="porque-escolher">
      <div className="page-header">
        <h1>Por que nos Escolher?</h1>
        <p>
          Descubra os diferenciais que fazem da PetCare Memorial a melhor
          escolha para cuidar da despedida do seu pet
        </p>
      </div>

      <div className="reasons-grid">
        {reasons.map((reason, index) => (
          <div key={index} className="reason-card">
            <div className="reason-icon">{reason.icon}</div>
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
          </div>
        ))}
      </div>

      <div className="stats-section">
        <h2>Nossos Números</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonials-section">
        <h2>O que Nossos Clientes Dizem</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="star filled" size={20} />
                ))}
              </div>
              <p>"{testimonial.text}"</p>
              <div className="testimonial-author">- {testimonial.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-section">
        <h2>Pronto para Contratar?</h2>
        <p>Entre em contato conosco e conheça nossos planos personalizados</p>
        <button className="btn-cta">Falar com Especialista</button>
      </div>
    </div>
  );
}
