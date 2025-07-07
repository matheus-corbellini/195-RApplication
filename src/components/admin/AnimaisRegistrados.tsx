"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Heart,
  Dog,
  Cat,
} from "lucide-react";
import "../../styles/admin/AnimaisRegistrados.css";

export default function AnimaisRegistrados() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("todos");

  const animals = [
    {
      id: "PET001",
      nome: "Luna",
      tipo: "Cão",
      raca: "Golden Retriever",
      idade: "8 anos",
      peso: "28 kg",
      proprietario: "João Silva",
      status: "ativo",
      dataRegistro: "15/10/2024",
      ultimaVisita: "14/12/2024",
    },
    {
      id: "PET002",
      nome: "Mimi",
      tipo: "Gato",
      raca: "Persa",
      idade: "5 anos",
      peso: "4 kg",
      proprietario: "Maria Santos",
      status: "ativo",
      dataRegistro: "22/09/2024",
      ultimaVisita: "10/12/2024",
    },
    {
      id: "PET003",
      nome: "Rex",
      tipo: "Cão",
      raca: "Pastor Alemão",
      idade: "12 anos",
      peso: "35 kg",
      proprietario: "Carlos Oliveira",
      status: "falecido",
      dataRegistro: "05/08/2024",
      ultimaVisita: "01/12/2024",
    },
    {
      id: "PET004",
      nome: "Bella",
      tipo: "Cão",
      raca: "Labrador",
      idade: "6 anos",
      peso: "25 kg",
      proprietario: "Ana Costa",
      status: "ativo",
      dataRegistro: "18/11/2024",
      ultimaVisita: "15/12/2024",
    },
    {
      id: "PET005",
      nome: "Whiskers",
      tipo: "Gato",
      raca: "Siamês",
      idade: "10 anos",
      peso: "5 kg",
      proprietario: "Pedro Lima",
      status: "falecido",
      dataRegistro: "30/07/2024",
      ultimaVisita: "05/11/2024",
    },
  ];

  const stats = [
    {
      title: "Total de Animais",
      value: "2,847",
      icon: <Heart size={24} />,
      color: "#8b4513",
    },
    {
      title: "Cães Registrados",
      value: "1,689",
      icon: <Dog size={24} />,
      color: "#28a745",
    },
    {
      title: "Gatos Registrados",
      value: "1,158",
      icon: <Cat size={24} />,
      color: "#17a2b8",
    },
  ];

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      animal.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.proprietario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "todos" ||
      animal.tipo.toLowerCase() === typeFilter.toLowerCase();
    return matchesSearch && matchesType;
  });

  const handleViewAnimal = (id: string) => {
    alert(`Visualizando detalhes do animal ${id}`);
  };

  const handleEditAnimal = (id: string) => {
    alert(`Editando detalhes do animal ${id}`);
  };

  const handleDeleteAnimal = (id: string) => {
    if (confirm("Tem certeza que deseja deletar este animal?")) {
      alert(`Animal ${id} deletado!`);
    }
  };

  return (
    <div className="animais-registrados">
      <div className="page-header">
        <h1>Animais Registrados</h1>
        <button className="btn-add-animal">
          <Plus size={20} /> Novo Animal
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

      <div className="filter-controls">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Pesquisar por nome, proprietário ou ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="type-filter"
          >
            <option value="todos">Todos os Tipos</option>
            <option value="cão">Cães</option>
            <option value="gato">Gatos</option>
          </select>
          <button className="btn-filter">
            <Filter size={16} />
            Mais Filtros
          </button>
        </div>
      </div>

      <div className="animals-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Raça</th>
              <th>Idade</th>
              <th>Peso</th>
              <th>Proprietário</th>
              <th>Status</th>
              <th>Última Visita</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnimals.map((animal) => (
              <tr key={animal.id}>
                <td className="animal-id">{animal.id}</td>
                <td className="animal-name">{animal.nome}</td>
                <td>
                  <div className="animal-type">
                    {animal.tipo === "Cão" ? (
                      <Dog size={16} />
                    ) : (
                      <Cat size={16} />
                    )}
                    {animal.tipo}
                  </div>
                </td>
                <td>{animal.raca}</td>
                <td>{animal.idade}</td>
                <td>{animal.peso}</td>
                <td>{animal.proprietario}</td>
                <td>
                  <span className={`status ${animal.status}`}>
                    {animal.status === "ativo" ? "Ativo" : "Falecido"}
                  </span>
                </td>
                <td>{animal.ultimaVisita}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-view"
                      onClick={() => handleViewAnimal(animal.id)}
                      title="Visualizar"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="btn-edit"
                      onClick={() => handleEditAnimal(animal.id)}
                      title="Editar"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteAnimal(animal.id)}
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

      {filteredAnimals.length === 0 && (
        <div className="empty-state">
          <p>Nenhum animal encontrado com os filtros aplicados.</p>
        </div>
      )}
    </div>
  );
}
