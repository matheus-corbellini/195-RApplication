"use client";

import Header from "../components/landingPage/header";
import Hero from "../components/landingPage/hero";
import Planos from "../components/landingPage/planos";
import Sobre from "../components/landingPage/sobre";
import Footer from "../components/landingPage/footer";
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
