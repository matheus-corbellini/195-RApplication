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
import {
  collection,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import type { Agendamento, AgendamentoComNomes } from "../../type/agendamento";

export default function Agendamento() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [appointments, setAppointments] = useState<AgendamentoComNomes[]>([]);

  // Adicionar estados para o modal de cancelamento
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [agendamentoParaCancelar, setAgendamentoParaCancelar] = useState<
    string | null
  >(null);

  useEffect(() => {
    const q = collection(db, "agendamentos");
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
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
    });

    return () => unsubscribe();
  }, []);

  const totalAgendamentos = appointments.length;
  const totalPendentes = appointments.filter(
    (a) => a.status === "pendente"
  ).length;
  const totalConfirmados = appointments.filter(
    (a) => a.status === "confirmado"
  ).length;
  const totalConcluidos = appointments.filter(
    (a) => a.status === "concluido"
  ).length;

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.animalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.userId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "todos" || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleConfirmAppointment = async (id: string) => {
    const agendamentoRef = doc(db, "agendamentos", id);
    await updateDoc(agendamentoRef, { status: "confirmado" });
    // Removido setAppointments para evitar inconsistência
  };

  // Substituir a função de cancelar agendamento
  const handleCancelAppointment = (id: string) => {
    setAgendamentoParaCancelar(id);
    setShowCancelModal(true);
  };

  const confirmarCancelamento = async () => {
    if (!agendamentoParaCancelar) return;
    const agendamentoRef = doc(db, "agendamentos", agendamentoParaCancelar);
    await updateDoc(agendamentoRef, { status: "cancelado" });
    setShowCancelModal(false);
    setAgendamentoParaCancelar(null);
    // Removido setAppointments para evitar inconsistência
  };

  function formatDate(date: unknown) {
    if (!date) return "-";
    if (typeof date === "string") {
      const d = new Date(date);
      return isNaN(d.getTime()) ? "-" : d.toLocaleString("pt-BR");
    }
    if (date instanceof Date) return date.toLocaleString("pt-BR");
    if (
      typeof date === "object" &&
      date !== null &&
      "toDate" in date &&
      typeof (date as Timestamp).toDate === "function"
    ) {
      const d = (date as Timestamp).toDate();
      return d.toLocaleString("pt-BR");
    }
    return "-";
  }

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
        <div className="stat-card">
          <div className="stat-content">
            <h3 style={{ color: "#8b4513" }}>{totalAgendamentos}</h3>
            <p>Total de Agendamentos</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <h3 style={{ color: "#fbc02d" }}>{totalPendentes} </h3>
            <p>Pendentes</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <h3 style={{ color: "#28a745" }}>{totalConfirmados} </h3>
            <p>Confirmados</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <h3 style={{ color: "#17a2b8" }}>{totalConcluidos} </h3>
            <p>Concluídos</p>
          </div>
        </div>
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
                  <span>{formatDate(appointment.dataHora)}</span>
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

      {showCancelModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Cancelar Agendamento</h3>
            <p>Tem certeza que deseja cancelar este agendamento?</p>
            <button
              onClick={confirmarCancelamento}
              style={{ marginRight: "1rem" }}
            >
              Confirmar
            </button>
            <button onClick={() => setShowCancelModal(false)}>Voltar</button>
          </div>
        </div>
      )}
    </div>
  );
}
