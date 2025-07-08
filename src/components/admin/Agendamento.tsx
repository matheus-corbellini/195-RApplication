"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Calendar,
  Plus,
  CheckCircle,
  XCircle,
} from "lucide-react";
import "../../styles/admin/Agendamento.css";
import { db } from "../../firebaseconfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import type { Agendamento, AgendamentoComNomes } from "../../type/agendamento";

export default function Agendamento() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [appointments, setAppointments] = useState<AgendamentoComNomes[]>([]);

  useEffect(() => {
    async function fetchAgendamentos() {
      const querySnapshot = await getDocs(collection(db, "agendamentos"));
      const lista: Agendamento[] = [];
      querySnapshot.forEach((docSnap) => {
        lista.push({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Agendamento, "id">),
        });
      });

      const enriched = await Promise.all(
        lista.map(async (agendamento) => {
          let animalNome = "";
          let usuarioNome = "";

          if (agendamento.animalId) {
            const animalDoc = await getDoc(
              doc(db, "animals", agendamento.animalId)
            );
            animalNome = animalDoc.exists()
              ? animalDoc.data().petName || ""
              : "";
          }

          if (agendamento.userId) {
            const userDoc = await getDoc(doc(db, "users", agendamento.userId));
            usuarioNome = userDoc.exists()
              ? userDoc.data().name || userDoc.data().nome || ""
              : "";
          }
          return { ...agendamento, animalNome, usuarioNome };
        })
      );

      setAppointments(enriched);
    }
    fetchAgendamentos();
  }, []);

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
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.animalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.userId.toLowerCase().includes(searchTerm.toLowerCase());

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
            placeholder="Buscar por ID..."
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
                {appointment.status}
              </span>
            </div>

            <div className="card-content">
              <div className="client-info">
                <h3>{appointment.usuarioNome || appointment.userId}</h3>
                <p className="pet-info">
                  <strong>
                    {appointment.animalNome || appointment.animalId}
                  </strong>
                </p>
              </div>

              <div className="appointment-details">
                <div className="detail-item">
                  <Calendar size={16} />
                  <span>
                    {new Date(appointment.dataHora).toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>
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
