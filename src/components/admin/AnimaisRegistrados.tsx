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
import type { Animal } from "../../type/animal";
import { db } from "../../firebaseconfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import RegistrarAnimal from "../dashboard/RegistrarAnimal";

export default function AnimaisRegistrados() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("todos");
  const [showRegister, setShowRegister] = useState(false);

  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      const querySnapshot = await getDocs(collection(db, "animals"));
      const animalsList: Animal[] = querySnapshot.docs.map(
        (doc) => doc.data() as Animal
      );
      setAnimals(animalsList);
    };
    fetchAnimals();
  }, []);

  const totalAnimais = animals.length;
  const totalCaes = animals.filter(
    (a) =>
      a.petType.toLowerCase() === "cão" || a.petType.toLowerCase() === "cao"
  ).length;
  const totalGatos = animals.filter(
    (a) => a.petType.toLowerCase() === "gato"
  ).length;

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      animal.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.uid.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === "todos" ||
      animal.petType.toLowerCase() === typeFilter.toLowerCase();
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
      {showRegister && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-modal"
              onClick={() => setShowRegister(false)}
            >
              X
            </button>
            <RegistrarAnimal
              onSuccess={() => {
                setShowRegister(false);
              }}
            />
          </div>
        </div>
      )}
      <div className="page-header">
        <h1>Animais Registrados</h1>
        <button
          className="btn-add-animal"
          onClick={() => setShowRegister(true)}
        >
          <Plus size={20} /> Novo Animal
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ color: "#8b4513" }}>
            <Heart size={24} />
          </div>
          <div className="stat-content">
            <h3>{totalAnimais}</h3>
            <p>Total de Animais</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ color: "#28a745" }}>
            <Dog size={24} />
          </div>
          <div className="stat-content">
            <h3>{totalCaes}</h3>
            <p>Cães Registrados</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ color: "#17a2b8" }}>
            <Cat size={24} />
          </div>
          <div className="stat-content">
            <h3>{totalGatos}</h3>
            <p>Gatos Registrados</p>
          </div>
        </div>
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
              <th>Telefone</th>
              <th>Email</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnimals.map((animal) => (
              <tr key={animal.uid}>
                <td className="animal-id">{animal.uid}</td>
                <td className="animal-name">{animal.petName}</td>
                <td>
                  <div className="animal-type">
                    {animal.petType === "Cão" ? (
                      <Dog size={16} />
                    ) : (
                      <Cat size={16} />
                    )}
                    {animal.petType}
                  </div>
                </td>
                <td>{animal.breed}</td>
                <td>{animal.age}</td>
                <td>{animal.weight}</td>
                <td>{animal.ownerName}</td>
                <td>{animal.ownerPhone}</td>
                <td>{animal.ownerEmail}</td>
                <td>{animal.address}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-view"
                      onClick={() => handleViewAnimal(animal.uid)}
                      title="Visualizar"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="btn-edit"
                      onClick={() => handleEditAnimal(animal.uid)}
                      title="Editar"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteAnimal(animal.uid)}
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
