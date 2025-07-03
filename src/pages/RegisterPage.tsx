"use client";

import type React from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    if (!formData.acceptTerms) {
      alert("Você deve aceitar os termos de uso!");
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await signup(formData.email, formData.password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: formData.firstName + " " + formData.lastName,
        email: formData.email,
        role: "user",
        createdAt: new Date(),
      });
      navigate("/dashboard");
    } catch (error) {
      alert("Erro ao registrar usuário. Tente novamente.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-header">
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

        <div className="register-content">
          <div className="register-form-section">
            <div className="form-container">
              <h1>Criar Conta</h1>
              <p className="subtitle">
                Cadastre-se para acessar nossos serviços de cremação
              </p>

              <form onSubmit={handleSubmit} className="register-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">Nome</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Sobrenome</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Seu sobrenome"
                      required
                    />
                  </div>
                </div>

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
                  <label htmlFor="phone">Telefone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                <div className="form-row">
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
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Senha</label>
                    <div className="password-input">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirme sua senha"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-checkbox">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      required
                    />
                    <span className="checkmark"></span>
                    Aceito os{" "}
                    <Link to="#" className="terms-link">
                      termos de uso
                    </Link>{" "}
                    e{" "}
                    <Link to="#" className="terms-link">
                      política de privacidade
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Criando conta..." : "Criar Conta"}
                </button>
              </form>

              <div className="form-footer">
                <p>
                  Já tem uma conta?{" "}
                  <Link to="/login" className="login-link">
                    Faça login aqui
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="register-image-section">
            <div className="image-content">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Pet Care Service"
              />
              <div className="image-overlay">
                <h2>Junte-se à nossa família</h2>
                <p>
                  Mais de 5.000 famílias confiam em nossos serviços para cuidar
                  da despedida de seus pets
                </p>
                <div className="features-list">
                  <div className="feature">✓ Serviço 24 horas</div>
                  <div className="feature">✓ Equipe especializada</div>
                  <div className="feature">✓ Suporte compassivo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
