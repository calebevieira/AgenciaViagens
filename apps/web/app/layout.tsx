import "./globals.css";
import Link from "next/link";

const links = [
  ["/dashboard", "Dashboard"],
  ["/patients", "Pacientes"],
  ["/doctors", "Médicos"],
  ["/agenda", "Agenda"],
  ["/presenca", "Presença"],
  ["/risco", "Painel de Risco"],
  ["/mensagens", "Mensagens"],
  ["/retornos", "Retornos"]
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-[220px_1fr]">
          <aside className="border-r bg-white p-4">
            <h1 className="mb-4 text-xl font-bold">Clinic OS</h1>
            <nav className="space-y-2">
              {links.map(([href, label]) => (
                <Link key={href} className="block rounded px-2 py-1 text-sm hover:bg-slate-100" href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
