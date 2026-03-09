"use client";

import { returnCandidates } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export default function RetornosPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Pacientes sem consulta há &gt; 180 dias</h2>
      <div className="card space-y-2">
        {returnCandidates.map((p) => (
          <div key={p.id} className="flex items-center justify-between border-b pb-2 text-sm">
            <span>
              {p.name} · última consulta {p.lastVisit}
            </span>
            <span>{p.phone}</span>
          </div>
        ))}
      </div>
      <Button>Criar campanha de retorno (notifications)</Button>
    </div>
  );
}
