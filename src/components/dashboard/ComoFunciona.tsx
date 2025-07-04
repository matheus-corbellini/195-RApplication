"use client";

import {
  Phone,
  Car,
  Building2,
  Flame,
  FileCheck,
  Package,
  Clock,
  Lock,
  Smartphone,
} from "lucide-react";
import "../../styles/dashboard/ComoFunciona.css";

export default function ComoFunciona() {
  const steps = [
    {
      number: "01",
      title: "Contato Inicial",
      description:
        "Entre em contato conosco através do telefone ou formulário online. Nossa equipe estará disponível 24h para atendê-lo.",
      icon: <Phone size={32} />,
    },
    {
      number: "02",
      title: "Coleta do Pet",
      description:
        "Nossa equipe especializada fará a coleta do seu pet em sua residência ou clínica veterinária com todo cuidado e respeito.",
      icon: <Car size={32} />,
    },
    {
      number: "03",
      title: "Preparação",
      description:
        "Seu pet será preparado com carinho em nossas instalações, seguindo todos os protocolos de higiene e respeito.",
      icon: <Building2 size={32} />,
    },
    {
      number: "04",
      title: "Cremação Individual",
      description:
        "Realizamos a cremação individual em nosso crematório moderno, garantindo que as cinzas sejam exclusivamente do seu pet.",
      icon: <Flame size={32} />,
    },
    {
      number: "05",
      title: "Certificação",
      description:
        "Emitimos um certificado de cremação com todos os dados do processo, garantindo transparência e confiabilidade.",
      icon: <FileCheck size={32} />,
    },
    {
      number: "06",
      title: "Entrega das Cinzas",
      description:
        "As cinzas são colocadas em uma urna digna e entregues a você, junto com o certificado e uma lembrança especial.",
      icon: <Package size={32} />,
    },
  ];

  return (
    <div className="como-funciona">
      <div className="page-header">
        <h1>Como Funciona o processo</h1>
        <p>
          Conheça cada etapa do nosso processo de cremação, realizado com máximo
          cuidado e respeito
        </p>
      </div>

      <div className="process-timeline">
        {steps.map((step, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker">
              <span className="step-number">{step.number}</span>
            </div>
            <div className="timeline-content">
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="additional-info">
        <div className="info-cards">
          <div className="info-card">
            <h3>
              <Clock
                size={24}
                style={{ display: "inline", marginRight: "8px" }}
              />
              Tempo do Processo
            </h3>
            <p>
              O processo de cremação pode levar entre 24 a 48 horas, dependendo
              do porte do animal e da demanda.
            </p>
          </div>
          <div className="info-card">
            <h3>
              <Lock
                size={24}
                style={{ display: "inline", marginRight: "8px" }}
              />
              Garantia de Individualidade
            </h3>
            <p>
              Cada cremação é realizada individualmente, garantindo que você
              receba apenas as cinzas do seu pet.
            </p>
          </div>
          <div className="info-card">
            <h3>
              <Smartphone
                size={24}
                style={{ display: "inline", marginRight: "8px" }}
              />
              Acompanhamento
            </h3>
            <p>
              Você receberá atualizações por WhatsApp sobre cada etapa do
              processo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
