"use client";

import type React from "react";

import { useState } from "react";
import "../../styles/dashboard/RegistrarAnimal.css";
import type { Animal } from "../../type/animal";
import { db } from "../../firebaseconfig";
import { collection, addDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";

export default function RegistrarAnimal() {
  const [formData, setFormData] = useState<Animal>({
    uid: "",
    petName: "",
    petType: "",
    breed: "",
    age: "",
    weight: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    address: "",
    specialInstructions: "",
    userId: "",
  });

  const { currentUser } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "animals"), {
        ...formData,
        userId: currentUser?.uid || "",
      });

      await setDoc(docRef, {
        ...formData,
        userId: currentUser?.uid || "",
        uid: docRef.id,
      });

      setSuccessMessage("Registro confirmado!");
      setTimeout(() => setSuccessMessage(""), 3000);
      setFormData({
        uid: "",
        petName: "",
        petType: "",
        breed: "",
        age: "",
        weight: "",
        ownerName: "",
        ownerPhone: "",
        ownerEmail: "",
        address: "",
        specialInstructions: "",
        userId: "",
      });
    } catch (error) {
      alert("Erro ao registrar animal. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <div className="registrar-animal">
      <div className="page-header">
        <h1>Registre seu Animal</h1>
        <p>Preencha as informações do seu pet para nossos registros</p>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-section">
          <h2>Informações do Pet</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="petName">Nome do Pet *</label>
              <input
                type="text"
                id="petName"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="petType">Tipo de Animal *</label>
              <select
                id="petType"
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                required
              >
                <option value="">Selecione</option>
                <option value="cao">Cão</option>
                <option value="gato">Gato</option>
                <option value="passaro">Pássaro</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="breed">Raça</label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Idade</label>
              <input
                type="text"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Ex: 5 anos"
              />
            </div>
            <div className="form-group">
              <label htmlFor="weight">Peso (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                step="0.1"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Informações do Responsável</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="ownerName">Nome Completo *</label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="ownerPhone">Telefone *</label>
              <input
                type="tel"
                id="ownerPhone"
                name="ownerPhone"
                value={formData.ownerPhone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="ownerEmail">E-mail *</label>
              <input
                type="email"
                id="ownerEmail"
                name="ownerEmail"
                value={formData.ownerEmail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="address">Endereço Completo *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Instruções Especiais</h2>
          <div className="form-group">
            <label htmlFor="specialInstructions">Observações</label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              rows={4}
              placeholder="Alguma informação especial sobre seu pet ou preferências para o serviço..."
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Registrar Animal
          </button>
          {successMessage && (
            <span className="success-message" style={{ marginLeft: 16 }}>
              {successMessage}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
