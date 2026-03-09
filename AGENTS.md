# AGENTS.md - Clinic OS

## Objetivo
Implementar e evoluir o MVP v1 do Clinic OS focando em gestão operacional (sem conteúdo clínico sensível).

## Convenções
- Monorepo:
  - `apps/web`: frontend e rotas API
  - `packages/db`: migrations, RLS, seeds
  - `packages/shared`: tipos/schemas compartilhados
- Validar entrada com `zod` sempre que possível.
- Evitar lógica médica/diagnóstica; manter foco administrativo.

## Comandos padrão
- Instalação: `npm install`
- Desenvolvimento: `npm run dev`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Smoke test: `npm run test`

## Banco e segurança
- Todo acesso multi-tenant deve ser filtrado por `clinic_id` + membership.
- Respeitar papéis OWNER/MANAGER/RECEPTION/DOCTOR.

## Deploy
- Target: Netlify free + Supabase free.
