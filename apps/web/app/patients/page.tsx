"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PatientsPage() {
  const [patients, setPatients] = useState([{ name: "Ana Silva", phone: "11999999999" }]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Pacientes</h2>
      <div className="card space-y-2">
        <Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Button
          onClick={() => {
            setPatients((p) => [...p, { name, phone }]);
            setName("");
            setPhone("");
          }}
        >
          Criar paciente
        </Button>
      </div>
      <ul className="card space-y-2">
        {patients.map((p, i) => (
          <li key={`${p.phone}-${i}`} className="flex justify-between border-b pb-2 text-sm">
            <span>{p.name}</span>
            <span>{p.phone}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
