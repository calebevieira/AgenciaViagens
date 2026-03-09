# Clinic OS (MVP v1)

SaaS de gestão para clínicas com foco em no-show, presença médica, mensagens (stub WhatsApp) e preenchimento de agenda.

## Stack
- Next.js 14 + TypeScript (App Router)
- Tailwind CSS + componentes utilitários estilo shadcn/ui
- Supabase (Auth + Postgres + RLS)
- Zod + React Hook Form

## Estrutura
- `apps/web`: app web
- `packages/db`: SQL migrations, RLS e seeds
- `packages/shared`: tipos e schemas zod compartilhados

## Setup local
1. `npm install`
2. Copie `.env.example` para `apps/web/.env.local` e preencha variáveis do Supabase.
3. Aplique SQL em `packages/db/migrations/001_init.sql` no Supabase SQL Editor.
4. Aplique `packages/db/seeds/001_seed.sql` (ajuste UUID do owner para um usuário existente em `auth.users`).
5. Rode: `npm run dev`

## Scripts
- `npm run install:all`
- `npm run dev`
- `npm run lint`
- `npm run typecheck`
- `npm run test`

## Fluxos MVP implementados
- Auth por telefone OTP (`/auth`) + ações de recuperação (reenviar código e link por e-mail).
- Onboarding com ViaCEP (`/onboarding`) e persistência esperada de `onboarding_completed_at`.
- CRUD navegável de pacientes/médicos/agenda.
- Presença de médico e cutoff documentado (`/presenca`).
- Painel de risco de consultas afetadas (`/risco`).
- Central de mensagens com endpoint stub inbound (`/api/messages/inbound`).
- Retornos >180 dias com ação de campanha (`/retornos`).
- Dashboard operacional (`/dashboard`).


## Exportar projeto em ZIP
- Gere o arquivo ZIP completo com: `npm run export:zip`
- Saída: `dist/clinic-os-mvp.zip`

## Deploy Netlify (free)
1. Criar site no Netlify apontando para este repositório.
2. Build command: `npm run build -w @clinic-os/web`
3. Publish directory: `apps/web/.next`
4. Definir variáveis de ambiente de produção iguais ao `.env.example`.
5. Recomenda-se usar plugin oficial Next.js do Netlify.

## Definition of Done (checklist)
- [x] Monorepo com `apps/web`, `packages/db`, `packages/shared`.
- [x] Migração SQL com tabelas exigidas e RLS ativo em todas.
- [x] Seed mínimo com uma clínica e um owner.
- [x] Telas MVP navegáveis.
- [x] Fluxos presença/no-show/mensagens/retornos cobertos no MVP.
- [x] Scripts de qualidade (`lint`, `typecheck`, `test`).
- [x] README e AGENTS com setup + deploy Netlify.
