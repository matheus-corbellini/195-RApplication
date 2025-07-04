"use client";

import { useState } from "react";
import "../styles/Landingpage/header.css";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img
              src="/placeholder.svg?height=40&width=120"
              alt="PetCare Memorial"
            />
          </div>
          <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
            <button
              onClick={() => scrollToSection("planos")}
              className="nav-link"
            >
              Planos
            </button>
            <button
              onClick={() => scrollToSection("sobre")}
              className="nav-link"
            >
              Sobre
            </button>
          </nav>
          <div className="auth-buttons">
            <Link to="/login" className="btn-login">
              Login
            </Link>
            <Link to="/register" className="btn-register">
              Registro
            </Link>
          </div>
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {" "}
            ☰{" "}
          </button>
        </div>
      </div>
    </header>
  );
}
