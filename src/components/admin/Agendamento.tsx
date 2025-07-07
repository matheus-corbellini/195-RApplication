"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Plus,
  CheckCircle,
  XCircle,
} from "lucide-react";
import "../../styles/admin/Agendamento.css";

export default function Agendamento() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const appointments = [
    {
      id: "AGD001",
      cliente: "João Silva",
      pet: "Luna",
      tipo: "Cão",
      data: "16/12/2024",
      horario: "14:00",
      endereco: "Rua das Flores, 123 - São Paulo",
      telefone: "(11) 99999-1111",
      status: "agendado",
      observacoes: "Pet de grande porte, cuidado especial",
    },
    {
      id: "AGD002",
      cliente: "Maria Santos",
      pet: "Mimi",
      tipo: "Gato",
      data: "17/12/2024",
      horario: "10:30",
      endereco: "Av. Paulista, 456 - São Paulo",
      telefone: "(11) 99999-2222",
      status: "confirmado",
      observacoes: "Coleta em clínica veterinária",
    },
    {
      id: "AGD003",
      cliente: "Carlos Oliveira",
      pet: "Rex",
      tipo: "Cão",
      data: "15/12/2024",
      horario: "16:00",
      endereco: "Rua do Campo, 789 - São Paulo",
      telefone: "(11) 99999-3333",
      status: "concluido",
      observacoes: "Cremação realizada com sucesso",
    },
    {
      id: "AGD004",
      cliente: "Ana Costa",
      pet: "Bella",
      tipo: "Cão",
      data: "18/12/2024",
      horario: "09:00",
      endereco: "Rua da Paz, 321 - São Paulo",
      telefone: "(11) 99999-4444",
      status: "pendente",
      observacoes: "Aguardando confirmação do cliente",
    },
    {
      id: "AGD005",
      cliente: "Pedro Lima",
      pet: "Whiskers",
      tipo: "Gato",
      data: "14/12/2024",
      horario: "11:00",
      endereco: "Av. Brasil, 654 - São Paulo",
      telefone: "(11) 99999-5555",
      status: "cancelado",
      observacoes: "Cancelado pelo cliente",
    },
  ];

  const stats = [
    {
      title: "Agendamentos Hoje",
      value: "8",
      color: "#8b4513",
    },
    {
      title: "Pendentes",
      value: "12",
      color: "#ffc107",
    },
    {
      title: "Confirmados",
      value: "15",
      color: "#28a745",
    },
    {
      title: "Concluídos",
      value: "127",
      color: "#17a2b8",
    },
  ];

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.pet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "todos" || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleConfirmAppointment = (id: string) => {
    alert(`Agendamento ${id} confirmado!`);
  };

  const handleCancelAppointment = (id: string) => {
    if (confirm("Tem certeza que deseja cancelar este agendamento?")) {
      alert(`Agendamento ${id} cancelado!`);
    }
  };

  return (
    <div className="agendamento-cremacoes">
      <div className="page-header">
        <h1>Agendamentos de Cremações</h1>
        <button className="btn-add-appointment">
          <Plus size={16} />
          Novo Agendamento
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-content">
              <h3 style={{ color: stat.color }}>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="filters-section">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar por cliente, pet ou ID..."
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
            <option value="todos">Todos os Status</option>
            <option value="pendente">Pendente</option>
            <option value="agendado">Agendado</option>
            <option value="confirmado">Confirmado</option>
            <option value="concluido">Concluído</option>
            <option value="cancelado">Cancelado</option>
          </select>
          <button className="btn-filter">
            <Filter size={16} />
            Mais Filtros
          </button>
        </div>
      </div>

      <div className="appointments-grid">
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className="appointment-card">
            <div className="card-header">
              <div className="appointment-id">{appointment.id}</div>
              <span className={`status ${appointment.status}`}>
                {appointment.status === "pendente"
                  ? "Pendente"
                  : appointment.status === "agendado"
                  ? "Agendado"
                  : appointment.status === "confirmado"
                  ? "Confirmado"
                  : appointment.status === "concluido"
                  ? "Concluído"
                  : "Cancelado"}
              </span>
            </div>

            <div className="card-content">
              <div className="client-info">
                <h3>{appointment.cliente}</h3>
                <p className="pet-info">
                  <strong>{appointment.pet}</strong> - {appointment.tipo}
                </p>
              </div>

              <div className="appointment-details">
                <div className="detail-item">
                  <Calendar size={16} />
                  <span>{appointment.data}</span>
                </div>
                <div className="detail-item">
                  <Clock size={16} />
                  <span>{appointment.horario}</span>
                </div>
                <div className="detail-item">
                  <MapPin size={16} />
                  <span>{appointment.endereco}</span>
                </div>
                <div className="detail-item">
                  <Phone size={16} />
                  <span>{appointment.telefone}</span>
                </div>
              </div>

              {appointment.observacoes && (
                <div className="observations">
                  <strong>Observações:</strong> {appointment.observacoes}
                </div>
              )}
            </div>

            <div className="card-actions">
              {appointment.status === "pendente" && (
                <button
                  className="btn-confirm"
                  onClick={() => handleConfirmAppointment(appointment.id)}
                >
                  <CheckCircle size={16} />
                  Confirmar
                </button>
              )}
              {(appointment.status === "pendente" ||
                appointment.status === "agendado") && (
                <button
                  className="btn-cancel"
                  onClick={() => handleCancelAppointment(appointment.id)}
                >
                  <XCircle size={16} />
                  Cancelar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div className="empty-state">
          <p>Nenhum agendamento encontrado com os filtros aplicados.</p>
        </div>
      )}
    </div>
  );
}
