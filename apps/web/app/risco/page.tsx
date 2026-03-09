import { riskItems } from "@/lib/mock-data";

export default function RiscoPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Painel de Risco</h2>
      {riskItems.map((item) => (
        <div className="card" key={item.doctor}>
          <h3 className="font-medium">{item.doctor}</h3>
          <p className="text-sm">{item.reason}</p>
          <ul className="list-disc pl-5 text-sm">
            {item.affected.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-blue-700">Sugestão: {item.suggestion}</p>
        </div>
      ))}
    </div>
  );
}
