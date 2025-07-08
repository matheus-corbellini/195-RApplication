import React from "react";
import "../../styles/dashboard/AgendarServico.css";
import { useState, useEffect } from "react";
import { db } from "../../firebaseconfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";
import type { Animal } from "../../type/animal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";

export default function AgendarServico() {
  const { currentUser } = useAuth();
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  const [animalId, setAnimalId] = useState("");
  const [dataHora, setDataHora] = useState<Date | null>(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    async function fetchAnimais() {
      if (!currentUser) return;
      setLoading(true);
      const q = query(
        collection(db, "animals"),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const lista: Animal[] = [];
      querySnapshot.forEach((doc) => {
        lista.push(doc.data() as Animal);
      });
      setAnimais(lista);
      setLoading(false);
    }
    fetchAnimais();
  }, [currentUser]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!animalId || !dataHora) {
      setMensagem("Preencha todos os campos.");
      return;
    }
    if (!currentUser) {
      setMensagem("Usuário não autenticado.");
      return;
    }
    try {
      await addDoc(collection(db, "agendamentos"), {
        animalId,
        userId: currentUser.uid,
        dataHora: dataHora.toISOString(),
        status: "pendente",
      });
      setMensagem("Agendamento realizado com sucesso!");
      setAnimalId("");
      setDataHora(null);
    } catch {
      setMensagem("Erro ao agendar. Tente novamente.");
    }
  }

  return (
    <div className="agendar-servico-container">
      <h2>Agendar Serviço</h2>
      <form onSubmit={handleSubmit} className="agendar-servico-form">
        <div>
          <label htmlFor="animal">Escolha o animal:</label>
          <select
            id="animal"
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
            required
          >
            <option value="">Selecione um animal</option>
            {animais.map((animal) => (
              <option key={animal.uid} value={animal.uid}>
                {animal.petName} ({animal.petType})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Data e horário do agendamento:</label>
          <DatePicker
            selected={dataHora}
            onChange={(date) => setDataHora(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="dd/MM/yyyy HH:mm"
            locale={ptBR}
            minDate={new Date()}
            placeholderText="Selecione data e hora"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          Agendar
        </button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
