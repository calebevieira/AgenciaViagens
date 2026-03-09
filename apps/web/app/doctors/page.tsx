"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([{ name: "Dr. Lima", specialty: "Clínico" }]);
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Médicos</h2>
      <div className="card space-y-2">
        <Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Especialidade" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
        <Button
          onClick={() => {
            setDoctors((d) => [...d, { name, specialty }]);
            setName("");
            setSpecialty("");
          }}
        >
          Criar médico
        </Button>
      </div>
      <ul className="card space-y-2">
        {doctors.map((d, i) => (
          <li key={`${d.name}-${i}`} className="flex justify-between border-b pb-2 text-sm">
            <span>{d.name}</span>
            <span>{d.specialty}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
