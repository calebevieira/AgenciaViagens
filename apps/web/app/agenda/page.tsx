"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Appointment = { patient: string; doctor: string; time: string; status: string };

export default function AgendaPage() {
  const [items, setItems] = useState<Appointment[]>([{ patient: "Ana Silva", doctor: "Dr. Lima", time: "09:00", status: "scheduled" }]);
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [time, setTime] = useState("");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Agenda (Dia/Semana)</h2>
      <div className="card grid gap-2 md:grid-cols-4">
        <Input placeholder="Paciente" value={patient} onChange={(e) => setPatient(e.target.value)} />
        <Input placeholder="Médico" value={doctor} onChange={(e) => setDoctor(e.target.value)} />
        <Input placeholder="Horário" value={time} onChange={(e) => setTime(e.target.value)} />
        <Button onClick={() => setItems((x) => [...x, { patient, doctor, time, status: "scheduled" }])}>Criar consulta</Button>
      </div>
      <div className="card">
        {items.map((a, idx) => (
          <div key={idx} className="mb-2 flex items-center justify-between border-b pb-1 text-sm">
            <span>
              {a.time} · {a.patient} · {a.doctor}
            </span>
            <div className="space-x-2">
              <Button className="bg-emerald-600" onClick={() => (a.status = "confirmed")}>
                Marcar confirmada
              </Button>
              <Button className="bg-orange-600">Solicitar confirmação</Button>
              <Button className="bg-red-600">Cancelar + sugerir waitlist</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
