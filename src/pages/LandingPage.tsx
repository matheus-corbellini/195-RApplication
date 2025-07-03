"use client";

import Header from "../components/header";
import Hero from "../components/hero";
import Planos from "../components/planos";
import Sobre from "../components/sobre";
import Footer from "../components/footer";
import { Footer as BorderlessFooter } from "borderless";
import "../styles/index.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Header />
      <Hero />
      <Planos />
      <Sobre />
      <Footer />
      <BorderlessFooter theme="light" backgroundColor="#333" />
    </div>
  );
}
