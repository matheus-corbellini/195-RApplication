export type Agendamento = {
  id: string;
  animalId: string;
  userId: string;
  dataHora: string;
  status: string;
};

export type AgendamentoComNomes = Agendamento & {
  animalNome?: string;
  usuarioNome?: string;
};
