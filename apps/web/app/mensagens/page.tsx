"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MensagensPage() {
  const [messages, setMessages] = useState(["Olá, confirme sua consulta amanhã?"]);
  const [text, setText] = useState("");

  return (
    <div className="grid gap-4 md:grid-cols-[250px_1fr]">
      <aside className="card">Conversa #1 (whatsapp_stub)</aside>
      <section className="card space-y-2">
        <h2 className="text-xl font-semibold">Central de Mensagens</h2>
        {messages.map((m, i) => (
          <p key={i} className="rounded bg-slate-100 p-2 text-sm">
            {m}
          </p>
        ))}
        <div className="flex gap-2">
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Mensagem" />
          <Button
            onClick={() => {
              setMessages((ms) => [...ms, text]);
              setText("");
            }}
          >
            Enviar
          </Button>
        </div>
      </section>
    </div>
  );
}
