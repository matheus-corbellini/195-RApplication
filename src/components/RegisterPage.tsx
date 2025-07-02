import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/AuthPages.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { updateProfile } from "firebase/auth";
import type { User as AppUser } from "../type/user";

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

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const userCredential = await signup(email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      const userData: AppUser = {
        uid: user.uid,
        name: name,
        email: user.email!,
        createdAt: new Date(),
      };
      await setDoc(doc(db, "users", user.uid), userData);
      navigate("/dashboard"); // Redireciona para dashboard após registro
    } catch (error: unknown) {
      setError("Falha no registro. Tente novamente.");
      console.error("Erro no registro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Criar Conta</h1>
          <p>Junte-se a nós! Crie sua conta gratuitamente.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              required
            />
          </div>

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
              placeholder="Sua senha (mín. 6 caracteres)"
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

          <div className="form-group" style={{ position: "relative" }}>
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme sua senha"
              required
            />
            <button
              type="button"
              tabIndex={-1}
              className="show-password-btn"
              onClick={() => setShowConfirmPassword((v) => !v)}
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
              aria-label={
                showConfirmPassword ? "Ocultar senha" : "Mostrar senha"
              }
            >
              <EyeIcon visible={showConfirmPassword} />
            </button>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Criando conta..." : "Criar Conta"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Já tem uma conta?{" "}
            <Link to="/login" className="auth-link">
              Fazer login
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

export default RegisterPage;
