import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/dashboard/Dashboard.css";

const Dashboard: React.FC = () => {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error: unknown) {
      console.error("Erro no logout:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>RApplication</h2>
        </div>
        <div className="nav-user">
          <span>Olá, {userData?.name}</span>
          <button onClick={handleLogout} className="logout-button">
            Sair
          </button>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>RApplication crematório</h1>
          <p>Descubra o que podemos fazer por você!</p>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-card">
            <h3>📊 Fale conosco!</h3>
            <p>Entre em contato conosco para mais informações.</p>
          </div>

          <div className="dashboard-card">
            <h3>📝 Tipos de cremação</h3>
            <p>Saiba mais sobre os tipos de cremação.</p>
          </div>

          <div className="dashboard-card">
            <h3>⚙️ Nosso processo</h3>
            <p>Saiba mais sobre nosso processo.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
