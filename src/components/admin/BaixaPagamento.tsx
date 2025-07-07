"use client";

import { useState } from "react";
import { Search, Filter, Check, X, Clock, DollarSign } from "lucide-react";
import "../../styles/admin/BaixaPagamento.css";

export default function BaixaPagamento() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const pendingPayments = [
    {
      id: "PAG001",
      cliente: "João Silva",
      plano: "Premium",
      valor: "R$ 590,00",
      vencimento: "10/12/2024",
      diasAtraso: 5,
      status: "atrasado",
      metodo: "Cartão de Crédito",
    },
    {
      id: "PAG002",
      cliente: "Maria Santos",
      plano: "Básico",
      valor: "R$ 290,00",
      vencimento: "15/12/2024",
      diasAtraso: 0,
      status: "pendente",
      metodo: "PIX",
    },
    {
      id: "PAG003",
      cliente: "Carlos Oliveira",
      plano: "Família",
      valor: "R$ 990,00",
      vencimento: "08/12/2024",
      diasAtraso: 7,
      status: "atrasado",
      metodo: "Boleto",
    },
    {
      id: "PAG004",
      cliente: "Ana Costa",
      plano: "Premium",
      valor: "R$ 590,00",
      vencimento: "18/12/2024",
      diasAtraso: 0,
      status: "pendente",
      metodo: "Cartão de Crédito",
    },
    {
      id: "PAG005",
      cliente: "Pedro Lima",
      plano: "Básico",
      valor: "R$ 290,00",
      vencimento: "05/12/2024",
      diasAtraso: 10,
      status: "atrasado",
      metodo: "PIX",
    },
  ];

  const handleConfirmPayment = (id: string) => {
    alert(`Pagamento ${id} confirmado!`);
  };

  const handleRejectPayment = (id: string) => {
    if (confirm("Tem certeza que deseja rejeitar este pagamento?")) {
      alert(`Pagamento ${id} rejeitado!`);
    }
  };

  const filteredPayments = pendingPayments.filter((payment) => {
    const matchesSearch =
      payment.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "todos" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="baixa-pagamento">
      <div className="page-header">
        <h1>Baixa de Pagamento</h1>
        <div className="summary-cards">
          <div className="summary-card">
            <DollarSign size={20} />
            <div>
              <span className="summary-value">R$ 2.750,00</span>
              <span className="summary-label">Pendente</span>
            </div>
          </div>
          <div className="summary-card atrasado">
            <Clock size={20} />
            <div>
              <span className="summary-value">R$ 1.870,00</span>
              <span className="summary-label">Em atraso</span>
            </div>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Pesquisar por cliente ou ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="todos">Todos os status</option>
            <option value="pendente">Pendente</option>
            <option value="atrasado">Em atraso</option>
          </select>
          <button className="btn-filter">
            <Filter size={16} />
            Mais filtros
          </button>
        </div>
      </div>

      <div className="payments-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Plano</th>
              <th>Valor</th>
              <th>Vencimento</th>
              <th>Status</th>
              <th>Método</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td className="payment-id">{payment.id}</td>
                <td>{payment.cliente}</td>
                <td>{payment.plano}</td>
                <td className="payment-value">{payment.valor}</td>
                <td>
                  {payment.vencimento}
                  {payment.diasAtraso > 0 && (
                    <span className="atraso-info">
                      ({payment.diasAtraso} dias)
                    </span>
                  )}
                </td>
                <td>
                  <span className={`status ${payment.status}`}>
                    {payment.status === "pendente" ? "Pendente" : "Atrasado"}
                  </span>
                </td>
                <td>{payment.metodo}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-confirm"
                      onClick={() => handleConfirmPayment(payment.id)}
                      title="Confirmar pagamento"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      className="btn-reject"
                      onClick={() => handleRejectPayment(payment.id)}
                      title="Rejeitar pagamento"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPayments.length === 0 && (
        <div className="empty-state">
          <p>Nenhum pagamento encontrado com os filtros aplicados</p>
        </div>
      )}
    </div>
  );
}
