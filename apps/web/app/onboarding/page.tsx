"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@clinic-os/shared";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FormValues = z.infer<typeof onboardingSchema>;

export default function OnboardingPage() {
  const { register, handleSubmit, setValue } = useForm<FormValues>({
    resolver: zodResolver(onboardingSchema)
  });

  async function handleCepBlur(cep: string) {
    if (!cep) return;
    const res = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`);
    const data = await res.json();
    setValue("street", data.logradouro ?? "");
    setValue("neighborhood", data.bairro ?? "");
    setValue("city", data.localidade ?? "");
    setValue("state", data.uf ?? "");
  }

  async function onSubmit(values: FormValues) {
    console.log("save profile + onboarding_completed_at", {
      ...values,
      onboarding_completed_at: new Date().toISOString()
    });
    alert("Onboarding concluído");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl space-y-3 card">
      <h2 className="text-lg font-semibold">Onboarding da clínica</h2>
      <Input placeholder="Nome completo" {...register("full_name")} />
      <Input placeholder="E-mail" {...register("email")} />
      <Input placeholder="Telefone" {...register("phone")} />
      <Input placeholder="CEP" {...register("cep")} onBlur={(e) => handleCepBlur(e.target.value)} />
      <Input placeholder="Rua" {...register("street")} />
      <Input placeholder="Bairro" {...register("neighborhood")} />
      <Input placeholder="Cidade" {...register("city")} />
      <Input placeholder="UF" {...register("state")} />
      <Input placeholder="Número" {...register("number")} />
      <Input placeholder="Complemento" {...register("complement")} />
      <Button type="submit">Salvar onboarding</Button>
    </form>
  );
}
