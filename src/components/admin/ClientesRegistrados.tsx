"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";
import "../../styles/admin/ClientesRegistrados.css";

export default function ClientesRegistrados() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const clients = [
    {
      id: "CLI001",
      nome: "João Silva",
      email: "joao.silva@email.com",
      telefone: "(11) 99999-1111",
      plano: "Premium",
      status: "ativo",
      dataRegistro: "15/10/2024",
      ultimoAcesso: "14/12/2024",
      pets: 2,
    },
    {
      id: "CLI002",
      nome: "Maria Santos",
      email: "maria.santos@email.com",
      telefone: "(11) 99999-2222",
      plano: "Básico",
      status: "ativo",
      dataRegistro: "22/09/2024",
      ultimoAcesso: "13/12/2024",
      pets: 1,
    },
    {
      id: "CLI003",
      nome: "Carlos Oliveira",
      email: "carlos.oliveira@email.com",
      telefone: "(11) 99999-3333",
      plano: "Família",
      status: "inativo",
      dataRegistro: "05/08/2024",
      ultimoAcesso: "01/12/2024",
      pets: 3,
    },
    {
      id: "CLI004",
      nome: "Ana Costa",
      email: "ana.costa@email.com",
      telefone: "(11) 99999-4444",
      plano: "Premium",
      status: "ativo",
      dataRegistro: "18/11/2024",
      ultimoAcesso: "15/12/2024",
      pets: 1,
    },
    {
      id: "CLI005",
      nome: "Pedro Lima",
      email: "pedro.lima@email.com",
      telefone: "(11) 99999-5555",
      plano: "Básico",
      status: "suspenso",
      dataRegistro: "30/07/2024",
      ultimoAcesso: "10/11/2024",
      pets: 1,
    },
  ];

  const stats = [
    {
      title: "Total de Clientes",
      value: "1,247",
      icon: <Users size={24} />,
      color: "#8b4513",
    },
    {
      title: "Clientes Ativos",
      value: "1,089",
      icon: <UserCheck size={24} />,
      color: "#28a745",
    },
    {
      title: "Clientes Inativos",
      value: "158",
      icon: <UserX size={24} />,
      color: "#dc3545",
    },
  ];

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "todos" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewClient = (id: string) => {
    alert(`Visualizar detalhes do cliente ${id}`);
  };

  const handleEditClient = (id: string) => {
    alert(`Editar cliente ${id}`);
  };

  const handleDeleteClient = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
      alert(`Cliente ${id} excluído!`);
    }
  };

  return (
    <div className="clientes-registrados">
      <div className="page-header">
        <h1>Clientes Registrados</h1>
        <button className="btn-add-client">
          <Plus size={16} />
          Novo Cliente
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
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
            placeholder="Buscar por nome, email ou ID..."
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
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
            <option value="suspenso">Suspenso</option>
          </select>
          <button className="btn-filter">
            <Filter size={16} />
            Mais Filtros
          </button>
        </div>
      </div>

      <div className="clients-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Plano</th>
              <th>Status</th>
              <th>Pets</th>
              <th>Último Acesso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td className="client-id">{client.id}</td>
                <td className="client-name">{client.nome}</td>
                <td>{client.email}</td>
                <td>{client.telefone}</td>
                <td>
                  <span className={`plano ${client.plano.toLowerCase()}`}>
                    {client.plano}
                  </span>
                </td>
                <td>
                  <span className={`status ${client.status}`}>
                    {client.status === "ativo"
                      ? "Ativo"
                      : client.status === "inativo"
                      ? "Inativo"
                      : "Suspenso"}
                  </span>
                </td>
                <td className="pets-count">{client.pets}</td>
                <td>{client.ultimoAcesso}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-view"
                      onClick={() => handleViewClient(client.id)}
                      title="Visualizar"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="btn-edit"
                      onClick={() => handleEditClient(client.id)}
                      title="Editar"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteClient(client.id)}
                      title="Excluir"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredClients.length === 0 && (
        <div className="empty-state">
          <p>Nenhum cliente encontrado com os filtros aplicados.</p>
        </div>
      )}
    </div>
  );
}
