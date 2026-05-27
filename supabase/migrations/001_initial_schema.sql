-- Run this in the Supabase SQL editor (Dashboard > SQL Editor > New query)

create table onboarding_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  status text default 'draft', -- draft | complete | active | paused

  -- Section 1: Identity
  first_name text,
  last_name text,
  date_of_birth date,
  nationality text,
  passport_number text,
  passport_expiry date,
  phone text,
  profile_photo_url text,

  -- Section 2: Situation
  employment_status text, -- employed | self_employed | student | other
  employer_name text,
  employed_since text, -- MM/YYYY
  monthly_net_income integer,
  people_moving_in integer default 1,
  has_pets boolean,
  pet_details text,
  is_smoker boolean,

  -- Section 3: Preferences
  districts text[],
  apartment_types text[], -- wg_zimmer | 1_room | 2_room | 3_room | 4_plus | studio | sublet
  min_size_sqm integer,
  max_rent_warm integer,
  furnished_preference text, -- furnished | unfurnished | both
  earliest_move_in date,
  intended_rental_duration text, -- indefinite | 1_year | 2_years | temporary
  hard_requirements text[],
  nice_to_haves text[],
  extra_notes text,

  -- Section 4: Documents
  google_drive_folder_url text,
  documents_checklist jsonb,

  -- Section 5: Platform accounts
  is24_has_account boolean,
  is24_has_plus boolean,
  is24_email text,
  is24_password_encrypted text, -- TODO: encrypt before production (pending legal review)
  kaz_has_account boolean,
  kaz_email text,
  kaz_password_encrypted text,  -- TODO: encrypt before production (pending legal review)
  wgg_has_account boolean,
  wgg_email text,
  wgg_password_encrypted text,  -- TODO: encrypt before production (pending legal review)

  -- Cover letter
  cover_letter_draft text,
  cover_letter_approved boolean default false,
  cover_letter_approved_at timestamptz,

  -- Skip tracking
  skipped_fields text[] default '{}'
);

create table viewings (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid references onboarding_submissions(id),
  created_at timestamptz default now(),
  listing_url text,
  listing_title text,
  listing_address text,
  proposed_datetime timestamptz,
  status text default 'pending', -- pending | confirmed | declined
  responded_at timestamptz,
  calendar_link text
);

-- Auto-update updated_at on every row change
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger onboarding_submissions_updated_at
  before update on onboarding_submissions
  for each row execute function update_updated_at();

-- Row Level Security (required on all tables)
alter table onboarding_submissions enable row level security;
alter table viewings enable row level security;

-- TODO: Add RLS policies in Phase 2 once the auth model is confirmed.
-- Until then all access is blocked at the DB level (safe default).
