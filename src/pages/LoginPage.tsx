"use client";

import type React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      alert("E-mail ou senha inválidos.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <Link to="/" className="back-link">
            ← Voltar ao início
          </Link>
          <div className="logo">
            <img
              src="/placeholder.svg?height=40&width=120"
              alt="PetCare Memorial"
            />
          </div>
        </div>

        <div className="login-content">
          <div className="login-form-section">
            <div className="form-container">
              <h1>Bem-vindo de volta</h1>
              <p className="subtitle">
                Entre na sua conta para acessar nossos serviços
              </p>

              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Senha</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Sua senha"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                  </div>
                </div>

                <div className="form-options">
                  <label className="checkbox-container">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    Lembrar de mim
                  </label>
                  <a href="#" className="forgot-password">
                    Esqueceu a senha?
                  </a>
                </div>

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </button>
              </form>

              <div className="form-footer">
                <p>
                  Não tem uma conta?{" "}
                  <Link to="/register" className="register-link">
                    Cadastre-se aqui
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="login-image-section">
            <div className="image-content">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Pet Memorial Service"
              />
              <div className="image-overlay">
                <h2>Cuidando com amor da despedida</h2>
                <p>
                  Serviços de cremação com dignidade e respeito para seu
                  companheiro
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
