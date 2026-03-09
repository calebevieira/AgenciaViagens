insert into public.clinics (id, name)
values ('11111111-1111-1111-1111-111111111111', 'Clínica Demo')
on conflict do nothing;

-- Requer que o usuário owner já exista no auth.users
insert into public.memberships (clinic_id, user_id, role)
values ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000001', 'OWNER')
on conflict do nothing;

insert into public.profiles (user_id, full_name, email, phone, onboarding_completed_at)
values ('00000000-0000-0000-0000-000000000001', 'Owner Demo', 'owner@clinic.local', '+5511999990000', now())
on conflict (user_id) do nothing;
