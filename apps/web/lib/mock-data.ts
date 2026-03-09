export const todayAppointments = [
  { id: "1", patient: "Ana Silva", doctor: "Dr. Lima", startsAt: "09:00", status: "scheduled" },
  { id: "2", patient: "João Souza", doctor: "Dra. Costa", startsAt: "10:00", status: "confirmed" }
];

export const riskItems = [
  {
    doctor: "Dr. Lima",
    reason: "Presença não confirmada até cutoff",
    affected: ["Ana Silva - 09:00", "Bruno Paes - 09:30"],
    suggestion: "Realocar para Dra. Costa às 11h"
  }
];

export const returnCandidates = [
  { id: "p1", name: "Carla Mendes", lastVisit: "2024-04-01", phone: "+55 11 99999-0001" },
  { id: "p2", name: "Rafael Dias", lastVisit: "2024-03-11", phone: "+55 11 99999-0002" }
];
