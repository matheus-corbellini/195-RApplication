import React from "react";
import "../../styles/dashboard/AgendarServico.css";
import { useState, useEffect } from "react";
import { db } from "../../firebaseconfig";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";
import type { Animal } from "../../type/animal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";
import type { AgendamentoComNomes } from "../../type/agendamento";

export default function AgendarServico() {
  const { currentUser } = useAuth();
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  const [animalId, setAnimalId] = useState("");
  const [dataHora, setDataHora] = useState<Date | null>(null);
  const [mensagem, setMensagem] = useState("");

  const [meusAgendamentos, setMeusAgendamentos] = useState<
    AgendamentoComNomes[]
  >([]);
  const [loadingMeusAgendamentos, setLoadingMeusAgendamentos] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    setLoadingMeusAgendamentos(true);
    const q = query(
      collection(db, "agendamentos"),
      where("userId", "==", currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const lista: AgendamentoComNomes[] = [];
      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data() as {
          animalId: string;
          userId: string;
          dataHora: string;
          status: string;
        };
        let animalNome = "";
        if (data.animalId) {
          const animalDoc = await getDoc(doc(db, "animals", data.animalId));
          const animalData = animalDoc.data() as Animal | undefined;
          animalNome =
            animalDoc.exists() && animalData ? animalData.petName : "";
        }
        lista.push({
          id: docSnap.id,
          animalId: data.animalId,
          userId: data.userId,
          dataHora: data.dataHora,
          status: data.status,
          animalNome,
        });
      }
      setMeusAgendamentos(lista);
      setLoadingMeusAgendamentos(false);
    });
    return () => unsubscribe();
  }, [currentUser]);

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

  const [showModal, setShowModal] = useState(false);

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
      setMensagem("");
      setAnimalId("");
      setShowModal(true);
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

      <h3 style={{ marginTop: "2rem" }}>Meus Agendamentos</h3>
      {loadingMeusAgendamentos ? (
        <p>Carregando agendamentos...</p>
      ) : meusAgendamentos.length === 0 ? (
        <p>Você ainda não fez nenhum agendamento.</p>
      ) : (
        <div style={{ width: "100%" }}>
          {meusAgendamentos.map((ag) => (
            <div
              key={ag.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
                borderBottom: "1px solid #eee",
                fontSize: "1rem",
              }}
            >
              <span>
                <strong>{ag.animalNome || ag.animalId}</strong>
              </span>
              <span>
                {ag.dataHora
                  ? new Date(ag.dataHora).toLocaleString("pt-BR")
                  : "-"}
              </span>
              <span style={{ textTransform: "capitalize" }}>{ag.status}</span>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Agendamento realizado!</h3>
            <p>
              Seu agendamento foi enviado e está aguardando aprovação do
              administrador.
            </p>
            <button onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
