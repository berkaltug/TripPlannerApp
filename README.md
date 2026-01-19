###Setup instructions:

1. Run `npm install` to install dependencies
2. Run `npx expo start` to start the development server
3. Run `npx expo run:ios` to run the app on iOS simulator
4. Run `npx expo run:android` to run the app on Android emulator

This project uses supabase services but not locally. To use it locally, you need to set up your own supabase project and replace the supabase url and anon key in the .env file.

### To run this app by connecting mine supabase server , i will provide you the .env file.Here .env.example

EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=

### Db table structure

There are 2 tables , trips , trip_notes , for local supabase setup these should be generated.<br>
Also supabase default auth starter db sql implemented, and it created a profiles table.

```
-- 1. Create the TRIPS table
create table public.trips (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  destination text not null,
  start_date date not null,
  end_date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create the TRIP_NOTES table
create table public.trip_notes (
  id uuid not null default gen_random_uuid() primary key,
  trip_id uuid not null references public.trips(id) on delete cascade,
  note_date date not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Row Level Security (RLS) on both tables
alter table public.trips enable row level security;
alter table public.trip_notes enable row level security;
```

Row Level security policies must be added , here are the policy rules

```
-- TRIP NOTES POLICIES
-- Allow users to view their own trips
create policy "Users can view own trips"
on public.trips for select
using (auth.uid() = user_id);

-- Allow users to insert their own trips
create policy "Users can insert own trips"
on public.trips for insert
with check (auth.uid() = user_id);

-- Allow users to update their own trips
create policy "Users can update own trips"
on public.trips for update
using (auth.uid() = user_id);

-- Allow users to delete their own trips
create policy "Users can delete own trips"
on public.trips for delete
using (auth.uid() = user_id);

-- TRIP TABLE POLICIES
-- Allow users to view notes belonging to their trips
create policy "Users can view notes of own trips"
on public.trip_notes for select
using (
  exists (
    select 1 from public.trips
    where trips.id = trip_notes.trip_id
    and trips.user_id = auth.uid()
  )
);

-- Allow users to insert notes into their own trips
create policy "Users can insert notes to own trips"
on public.trip_notes for insert
with check (
  exists (
    select 1 from public.trips
    where trips.id = trip_notes.trip_id
    and trips.user_id = auth.uid()
  )
);

-- Allow users to update notes of their own trips
create policy "Users can update notes of own trips"
on public.trip_notes for update
using (
  exists (
    select 1 from public.trips
    where trips.id = trip_notes.trip_id
    and trips.user_id = auth.uid()
  )
);

-- Allow users to delete notes of their own trips
create policy "Users can delete notes of own trips"
on public.trip_notes for delete
using (
  exists (
    select 1 from public.trips
    where trips.id = trip_notes.trip_id
    and trips.user_id = auth.uid()
  )
);
```
