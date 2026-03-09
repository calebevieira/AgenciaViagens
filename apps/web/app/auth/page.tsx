"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  async function requestOtp() {
    const { error } = await supabase.auth.signInWithOtp({ phone });
    setMessage(error ? error.message : "Código enviado por telefone.");
    if (!error) setSent(true);
  }

  async function verifyOtp() {
    const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: "sms" });
    setMessage(error ? error.message : "Autenticado. Siga para onboarding.");
  }

  return (
    <div className="mx-auto mt-20 max-w-md space-y-4 card">
      <h2 className="text-lg font-semibold">Entrar por telefone (OTP)</h2>
      <Input placeholder="+55 11 99999-9999" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <div className="flex gap-2">
        <Button onClick={requestOtp}>Enviar código</Button>
        <Button onClick={requestOtp} className="bg-slate-700 hover:bg-slate-800">
          Reenviar código
        </Button>
      </div>
      {sent && (
        <>
          <Input placeholder="Código OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <Button onClick={verifyOtp}>Validar código</Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">Enviar link no e-mail</Button>
        </>
      )}
      <p className="text-sm text-slate-600">{message}</p>
    </div>
  );
}
