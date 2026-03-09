import Link from "next/link";
import { todayAppointments } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Hoje</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card">
          <h3 className="font-medium">Consultas do dia</h3>
          <p className="text-3xl font-bold">{todayAppointments.length}</p>
        </div>
        <div className="card">
          <h3 className="font-medium">Médicos pendentes</h3>
          <p className="text-3xl font-bold">1</p>
        </div>
        <div className="card">
          <h3 className="font-medium">Alertas</h3>
          <p className="text-3xl font-bold">2</p>
        </div>
      </div>
      <div className="card">
        <h3 className="mb-2 font-medium">Ações rápidas</h3>
        <div className="flex gap-3 text-sm text-blue-700">
          <Link href="/presenca">Confirmar presença</Link>
          <Link href="/risco">Ver painel de risco</Link>
          <Link href="/retornos">Campanha de retornos</Link>
        </div>
      </div>
    </div>
  );
}
