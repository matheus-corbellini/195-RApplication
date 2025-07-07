"use client";

import { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Download,
  Filter,
} from "lucide-react";
import "../../styles/admin/Faturamento.css";

export default function Faturamento() {
  const [selectedPeriod, setSelectedPeriod] = useState("mes");

  const stats = [
    {
      title: "Receita Total",
      value: "R$ 45.280",
      change: "+12.5%",
      icon: <DollarSign size={24} />,
      positive: true,
    },
    {
      title: "Cremações Realizadas",
      value: "127",
      change: "+8.3%",
      icon: <TrendingUp size={24} />,
      positive: true,
    },
    {
      title: "Ticket Médio",
      value: "R$ 356",
      change: "+4.2%",
      icon: <Calendar size={24} />,
      positive: true,
    },
    {
      title: "Pendências",
      value: "R$ 2.840",
      change: "-15.7%",
      icon: <DollarSign size={24} />,
      positive: false,
    },
  ];

  const recentTransactions = [
    {
      id: "001",
      cliente: "João Silva",
      plano: "Premium",
      valor: "R$ 590",
      data: "15/12/2024",
      status: "Pago",
    },
    {
      id: "002",
      cliente: "Maria Santos",
      plano: "Básico",
      valor: "R$ 290",
      data: "14/12/2024",
      status: "Pendente",
    },
    {
      id: "003",
      cliente: "Carlos Oliveira",
      plano: "Família",
      valor: "R$ 990",
      data: "13/12/2024",
      status: "Pago",
    },
    {
      id: "004",
      cliente: "Ana Costa",
      plano: "Premium",
      valor: "R$ 590",
      data: "12/12/2024",
      status: "Pago",
    },
    {
      id: "005",
      cliente: "Pedro Lima",
      plano: "Básico",
      valor: "R$ 290",
      data: "11/12/2024",
      status: "Atrasado",
    },
  ];

  return (
    <div className="faturamento">
      <div className="page-header">
        <h1>Faturamento</h1>
        <div className="header-actions">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-select"
          >
            <option value="semana">Esta Semana</option>
            <option value="mes">Este Mês</option>
            <option value="trimestre">Este Trimestre</option>
            <option value="ano">Este Ano</option>
          </select>
          <button className="btn-export">
            <Download size={16} />
            Exportar
          </button>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <div className="stat-icon">{stat.icon}</div>
              <span
                className={`stat-change ${
                  stat.positive ? "positive" : "negative"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="content-grid">
        <div className="chart-section">
          <div className="section-header">
            <h2>Receita Mensal</h2>
            <button className="btn-filter">
              <Filter size={16} />
              Filtrar
            </button>
          </div>
          <div className="chart-placeholder">
            <div className="chart-bars">
              <div className="bar" style={{ height: "60%" }}></div>
              <div className="bar" style={{ height: "80%" }}></div>
              <div className="bar" style={{ height: "45%" }}></div>
              <div className="bar" style={{ height: "90%" }}></div>
              <div className="bar" style={{ height: "70%" }}></div>
              <div className="bar" style={{ height: "85%" }}></div>
            </div>
            <div className="chart-labels">
              <span>Jul</span>
              <span>Ago</span>
              <span>Set</span>
              <span>Out</span>
              <span>Nov</span>
              <span>Dez</span>
            </div>
          </div>
        </div>

        <div className="transactions-section">
          <div className="section-header">
            <h2>Transações Recentes</h2>
            <button className="btn-view-all">Ver Todas</button>
          </div>
          <div className="transactions-table">
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Plano</th>
                  <th>Valor</th>
                  <th>Data</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.cliente}</td>
                    <td>{transaction.plano}</td>
                    <td>{transaction.valor}</td>
                    <td>{transaction.data}</td>
                    <td>
                      <span
                        className={`status ${transaction.status.toLowerCase()}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
