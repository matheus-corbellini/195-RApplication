import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/AuthPages.css";

const EyeIcon = ({ visible }: { visible: boolean }) =>
  visible ? (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <path
        stroke="#333"
        strokeWidth="2"
        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
      />
      <circle cx="12" cy="12" r="3" stroke="#333" strokeWidth="2" />
    </svg>
  ) : (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <path
        stroke="#333"
        strokeWidth="2"
        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
      />
      <circle cx="12" cy="12" r="3" stroke="#333" strokeWidth="2" />
      <line x1="4" y1="20" x2="20" y2="4" stroke="#333" strokeWidth="2" />
    </svg>
  );

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/dashboard"); // Redireciona para dashboard após login
    } catch (error: unknown) {
      setError("Falha no login. Verifique suas credenciais.");
      console.error("Erro no login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Entrar</h1>
          <p>Bem-vindo de volta! Faça login para continuar.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu email"
              required
            />
          </div>

          <div className="form-group" style={{ position: "relative" }}>
            <label htmlFor="password">Senha</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              required
            />
            <button
              type="button"
              tabIndex={-1}
              className="show-password-btn"
              onClick={() => setShowPassword((v) => !v)}
              style={{
                position: "absolute",
                right: 12,
                top: 38,
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                outline: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              <EyeIcon visible={showPassword} />
            </button>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Não tem uma conta?{" "}
            <Link to="/register" className="auth-link">
              Criar conta
            </Link>
          </p>
          <Link to="/" className="auth-link">
            Voltar para página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
