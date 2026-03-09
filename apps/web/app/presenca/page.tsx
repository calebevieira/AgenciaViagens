"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PresencaPage() {
  const [status, setStatus] = useState("pending");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Presença de hoje (DOCTOR)</h2>
      <div className="card space-y-3">
        <p>Status atual: {status}</p>
        <Button onClick={() => setStatus("confirmed")}>Confirmar Presença</Button>
        <p className="text-sm text-slate-600">Cutoff MVP: 30 min antes do primeiro atendimento; após isso gera notification doctor_unconfirmed e absence.</p>
      </div>
    </div>
  );
}
