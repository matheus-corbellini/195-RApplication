import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import { Footer } from "borderless";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="hero-section">
          <h1 className="hero-title">
            Bem-vindo ao <span className="highlight">RApplication</span>
          </h1>
          <p className="hero-subtitle">
            Oferecemos o que é necessário para o total apoio no processo do
            falecimento do seu Animal.
          </p>
          <div className="hero-features">
            <div className="feature">
              <span className="feature-icon">🚀</span>
              <span>Rápido e eficiente</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🔒</span>
              <span>Seguro e confiável</span>
            </div>
            <div className="feature">
              <span className="feature-icon">💡</span>
              <span>Fácil de usar</span>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <div className="cta-buttons">
            <button className="cta-button primary" onClick={handleLoginClick}>
              Entrar
            </button>
            <button
              className="cta-button secondary"
              onClick={handleRegisterClick}
            >
              Criar Conta
            </button>
          </div>
          <p className="cta-text">
            Já tem uma conta?{" "}
            <span className="link" onClick={handleLoginClick}>
              Faça login
            </span>
          </p>
        </div>
      </div>

      <div className="landing-footer">
        <Footer theme="light" backgroundColor="transparent" />
      </div>
    </div>
  );
};

export default LandingPage;
