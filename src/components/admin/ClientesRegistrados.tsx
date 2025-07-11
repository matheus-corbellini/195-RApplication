"use client";

import { useState, useEffect } from "react";
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
import { db } from "../../firebaseconfig";
import {
  collection,
  getDocs,
  Timestamp,
  query,
  where,
} from "firebase/firestore";
import type { User } from "../../type/user";

export default function ClientesRegistrados() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsersAndPets = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList: User[] = querySnapshot.docs.map(
        (doc) => doc.data() as User
      );

      const usersWithPets = await Promise.all(
        usersList.map(async (user) => {
          const petsSnapshot = await getDocs(
            query(collection(db, "animals"), where("userId", "==", user.uid))
          );
          return { ...user, petsCount: petsSnapshot.size };
        })
      );

      setUsers(usersWithPets);
    };
    fetchUsersAndPets();
  }, []);

  const totalUsers = users.length;
  const totalActiveUsers = 1089;
  const totalInactiveUsers = 158;
  const stats = [
    {
      title: "Total de Clientes",
      value: totalUsers,
      icon: <Users size={24} />,
      color: "#8b4513",
    },
    {
      title: "Clientes Ativos",
      value: totalActiveUsers,
      icon: <UserCheck size={24} />,
      color: "#28a745",
    },
    {
      title: "Clientes Inativos",
      value: totalInactiveUsers,
      icon: <UserX size={24} />,
      color: "#dc3545",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "todos";
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

  function formatDate(date: unknown) {
    if (!date) return "-";
    if (typeof date === "string") {
      const d = new Date(date);
      return isNaN(d.getTime()) ? "-" : d.toLocaleDateString("pt-BR");
    }
    if (date instanceof Date) return date.toLocaleDateString("pt-BR");
    if (
      typeof date === "object" &&
      date !== null &&
      "toDate" in date &&
      typeof (date as Timestamp).toDate === "function"
    ) {
      const d = (date as Timestamp).toDate();
      return d.toLocaleDateString("pt-BR");
    }
    return "-";
  }

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
              <th>Data de Cadastro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.uid}>
                <td className="client-id">{user.uid}</td>
                <td className="client-name">{user.name}</td>
                <td>{user.email}</td>
                <td>-</td>
                <td>
                  <span className="plano">-</span>
                </td>
                <td>
                  <span className="status">-</span>
                </td>
                <td className="pets-count">{user.petsCount ?? "-"}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-view"
                      onClick={() => handleViewClient(user.uid)}
                      title="Visualizar"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="btn-edit"
                      onClick={() => handleEditClient(user.uid)}
                      title="Editar"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteClient(user.uid)}
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

      {filteredUsers.length === 0 && (
        <div className="empty-state">
          <p>Nenhum cliente encontrado com os filtros aplicados.</p>
        </div>
      )}
    </div>
  );
}
