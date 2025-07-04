"use client";

import type React from "react";

import "../../styles/dashboard/ContratarPlano.css";
import { useState } from "react";
import {
  RefreshCw,
  CreditCard,
  Phone,
  Check,
  ArrowLeft,
  User,
  MapPin,
  Smartphone,
} from "lucide-react";

export default function ContratarPlano() {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showForm, setShowForm] = useState(false);

  const plans = [
    {
      id: "basico",
      name: "Básico",
      price: "29",
      features: [
        "Cremação individual",
        "Urna básica incluída",
        "Certificado de cremação",
        "Coleta em domicílio",
        "Suporte por telefone",
      ],
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: "59",
      features: [
        "Cremação individual",
        "Urna premium personalizada",
        "Certificado de cremação",
        "Coleta em domicílio",
        "Memorial online",
        "Suporte 24h",
        "Lembrança especial",
      ],
      popular: true,
    },
    {
      id: "familia",
      name: "Família",
      price: "99",
      features: [
        "Até 3 pets por mês",
        "Cremação individual",
        "Urnas premium personalizadas",
        "Certificados de cremação",
        "Coleta em domicílio",
        "Memorial online",
        "Suporte prioritário 24h",
        "Desconto em serviços extras",
      ],
      popular: false,
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Plano ${selectedPlan} selecionado com sucesso!`);
    setShowForm(false);
    setSelectedPlan("");
  };

  return (
    <div className="contratar-plano">
      <div className="page-header">
        <h1>Contrate um Plano</h1>
        <p>
          Escolha o plano que melhor atende às suas necessidades e garanta
          tranquilidade para momentos difíceis
        </p>
      </div>

      {!showForm ? (
        <div className="plans-section">
          <div className="plans-grid">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`plan-card ${plan.popular ? "popular" : ""}`}
              >
                {plan.popular && (
                  <div className="popular-badge">Mais Popular</div>
                )}

                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    <span className="currency">R$</span>
                    <span className="amount">{plan.price}</span>
                    <span className="period">/mês</span>
                  </div>
                </div>

                <ul className="plan-features">
                  {plan.features.map((feature, index) => (
                    <li key={index}>
                      <Check className="check" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className="btn-select-plan"
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  Escolher {plan.name}
                </button>
              </div>
            ))}
          </div>

          <div className="additional-info">
            <div className="info-grid">
              <div className="info-item">
                <h4>
                  <RefreshCw
                    size={24}
                    style={{ display: "inline", marginRight: "8px" }}
                  />
                  Cancelamento Flexível
                </h4>
                <p>Cancele a qualquer momento sem taxas adicionais</p>
              </div>
              <div className="info-item">
                <h4>
                  <CreditCard
                    size={24}
                    style={{ display: "inline", marginRight: "8px" }}
                  />
                  Pagamento Seguro
                </h4>
                <p>Aceitamos cartão, PIX e boleto bancário</p>
              </div>
              <div className="info-item">
                <h4>
                  <Phone
                    size={24}
                    style={{ display: "inline", marginRight: "8px" }}
                  />
                  Suporte Especializado
                </h4>
                <p>Equipe treinada para momentos sensíveis</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="contract-form-section">
          <div className="form-header">
            <button className="back-button" onClick={() => setShowForm(false)}>
              <ArrowLeft size={16} /> Voltar aos planos
            </button>
            <h2>
              Finalizar Contratação - Plano{" "}
              {plans.find((p) => p.id === selectedPlan)?.name}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="contract-form">
            <div className="form-section">
              <h3>
                <User
                  size={20}
                  style={{ display: "inline", marginRight: "8px" }}
                />
                Dados Pessoais
              </h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nome Completo *</label>
                  <input type="text" required />
                </div>
                <div className="form-group">
                  <label>CPF *</label>
                  <input type="text" required />
                </div>
                <div className="form-group">
                  <label>E-mail *</label>
                  <input type="email" required />
                </div>
                <div className="form-group">
                  <label>Telefone *</label>
                  <input type="tel" required />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>
                <MapPin
                  size={20}
                  style={{ display: "inline", marginRight: "8px" }}
                />
                Endereço
              </h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>CEP *</label>
                  <input type="text" required />
                </div>
                <div className="form-group">
                  <label>Cidade *</label>
                  <input type="text" required />
                </div>
                <div className="form-group full-width">
                  <label>Endereço Completo *</label>
                  <input type="text" required />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>
                <CreditCard
                  size={20}
                  style={{ display: "inline", marginRight: "8px" }}
                />
                Forma de Pagamento
              </h3>
              <div className="payment-options">
                <label className="payment-option">
                  <input type="radio" name="payment" value="credit" required />
                  <CreditCard size={20} />
                  <span>Cartão de Crédito</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" value="pix" required />
                  <Smartphone size={20} />
                  <span>PIX</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" value="boleto" required />
                  <CreditCard size={20} />
                  <span>Boleto Bancário</span>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-confirm">
                Confirmar Contratação
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
