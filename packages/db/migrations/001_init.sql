create extension if not exists "pgcrypto";

create type public.membership_role as enum ('OWNER','MANAGER','RECEPTION','DOCTOR');
create type public.presence_status as enum ('pending','confirmed','absent');
create type public.message_direction as enum ('inbound','outbound');
create type public.conversation_channel as enum ('internal','whatsapp_stub');

create table public.clinics (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role membership_role not null,
  created_at timestamptz not null default now(),
  unique (clinic_id, user_id)
);

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text,
  phone text not null,
  cep text,
  street text,
  neighborhood text,
  city text,
  state text,
  number text,
  complement text,
  onboarding_completed_at timestamptz
);

create table public.doctors (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  profile_user_id uuid references public.profiles(user_id),
  name text not null,
  specialty text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.patients (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  name text not null,
  phone text not null,
  birth_date date,
  created_at timestamptz not null default now()
);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  doctor_id uuid not null references public.doctors(id),
  patient_id uuid not null references public.patients(id),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'scheduled',
  confirmed_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

create table public.doctor_presence (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  doctor_id uuid not null references public.doctors(id),
  date date not null,
  status presence_status not null default 'pending',
  confirmed_at timestamptz,
  unique (doctor_id, date)
);

create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  specialty text not null,
  patient_id uuid not null references public.patients(id),
  preferred_range jsonb,
  created_at timestamptz not null default now(),
  active boolean not null default true
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  kind text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  patient_id uuid references public.patients(id),
  channel conversation_channel not null,
  created_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  direction message_direction not null,
  body text not null,
  created_at timestamptz not null default now()
);

create or replace function public.user_clinic_ids()
returns setof uuid
language sql
security definer
set search_path = public
as $$
  select clinic_id from public.memberships where user_id = auth.uid();
$$;

create or replace function public.user_has_role(_clinic uuid, _roles membership_role[])
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.memberships m
    where m.user_id = auth.uid() and m.clinic_id = _clinic and m.role = any(_roles)
  );
$$;

alter table public.clinics enable row level security;
alter table public.memberships enable row level security;
alter table public.profiles enable row level security;
alter table public.doctors enable row level security;
alter table public.patients enable row level security;
alter table public.appointments enable row level security;
alter table public.doctor_presence enable row level security;
alter table public.waitlist enable row level security;
alter table public.notifications enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

create policy tenant_read_clinics on public.clinics for select using (id in (select public.user_clinic_ids()));
create policy owner_manage_clinics on public.clinics for all using (public.user_has_role(id, array['OWNER','MANAGER']::membership_role[])) with check (public.user_has_role(id, array['OWNER','MANAGER']::membership_role[]));

create policy membership_tenant_select on public.memberships for select using (clinic_id in (select public.user_clinic_ids()));
create policy membership_owner_manage on public.memberships for all using (public.user_has_role(clinic_id, array['OWNER','MANAGER']::membership_role[])) with check (public.user_has_role(clinic_id, array['OWNER','MANAGER']::membership_role[]));

create policy profile_self_or_tenant on public.profiles for select using (user_id = auth.uid() or exists (select 1 from public.memberships m where m.user_id = profiles.user_id and m.clinic_id in (select public.user_clinic_ids())));
create policy profile_self_update on public.profiles for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy doctor_select_tenant on public.doctors for select using (clinic_id in (select public.user_clinic_ids()));
create policy doctor_owner_manager on public.doctors for all using (public.user_has_role(clinic_id, array['OWNER','MANAGER']::membership_role[])) with check (public.user_has_role(clinic_id, array['OWNER','MANAGER']::membership_role[]));

create policy patient_select_tenant on public.patients for select using (clinic_id in (select public.user_clinic_ids()));
create policy patient_reception_manage on public.patients for all using (public.user_has_role(clinic_id, array['OWNER','MANAGER','RECEPTION']::membership_role[])) with check (public.user_has_role(clinic_id, array['OWNER','MANAGER','RECEPTION']::membership_role[]));

create policy appointment_select_tenant on public.appointments for select using (
  clinic_id in (select public.user_clinic_ids())
  and (
    public.user_has_role(clinic_id, array['OWNER','MANAGER','RECEPTION']::membership_role[])
    or exists (
      select 1 from public.doctors d
      where d.id = appointments.doctor_id and d.profile_user_id = auth.uid()
    )
  )
);
create policy appointment_reception_manage on public.appointments for all using (public.user_has_role(clinic_id, array['OWNER','MANAGER','RECEPTION']::membership_role[])) with check (public.user_has_role(clinic_id, array['OWNER','MANAGER','RECEPTION']::membership_role[]));

create policy presence_select_tenant on public.doctor_presence for select using (
  clinic_id in (select public.user_clinic_ids()) and (
    public.user_has_role(clinic_id, array['OWNER','MANAGER','RECEPTION']::membership_role[])
    or exists (select 1 from public.doctors d where d.id = doctor_presence.doctor_id and d.profile_user_id = auth.uid())
  )
);
create policy presence_doctor_confirm on public.doctor_presence for update using (
  exists (select 1 from public.doctors d where d.id = doctor_presence.doctor_id and d.profile_user_id = auth.uid())
) with check (
  exists (select 1 from public.doctors d where d.id = doctor_presence.doctor_id and d.profile_user_id = auth.uid())
);
create policy presence_owner_manage on public.doctor_presence for all using (public.user_has_role(clinic_id, array['OWNER','MANAGER']::membership_role[])) with check (public.user_has_role(clinic_id, array['OWNER','MANAGER']::membership_role[]));

create policy waitlist_reception on public.waitlist for all using (public.user_has_role(clinic_id, array['OWNER','MANAGER','RECEPTION']::membership_role[])) with check (public.user_has_role(clinic_id, array['OWNER','MANAGER','RECEPTION']::membership_role[]));
create policy waitlist_select_doctor on public.waitlist for select using (clinic_id in (select public.user_clinic_ids()));

create policy notifications_reception on public.notifications for all using (public.user_has_role(clinic_id, array['OWNER','MANAGER','RECEPTION']::membership_role[])) with check (public.user_has_role(clinic_id, array['OWNER','MANAGER','RECEPTION']::membership_role[]));
create policy notifications_doctor_select on public.notifications for select using (clinic_id in (select public.user_clinic_ids()));

create policy conversations_reception on public.conversations for all using (public.user_has_role(clinic_id, array['OWNER','MANAGER','RECEPTION']::membership_role[])) with check (public.user_has_role(clinic_id, array['OWNER','MANAGER','RECEPTION']::membership_role[]));
create policy conversations_doctor_select on public.conversations for select using (clinic_id in (select public.user_clinic_ids()));

create policy messages_reception on public.messages for all using (public.user_has_role(clinic_id, array['OWNER','MANAGER','RECEPTION']::membership_role[])) with check (public.user_has_role(clinic_id, array['OWNER','MANAGER','RECEPTION']::membership_role[]));
create policy messages_doctor_select on public.messages for select using (clinic_id in (select public.user_clinic_ids()));
