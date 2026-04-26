/*
  # Create Initial Schema for Visionario Hub

  1. New Tables
    - `profiles` - User profiles linked to auth.users
    - `plans` - Subscription plans available
    - `modules` - API modules available for consultation
    - `subscriptions` - User subscriptions to plans
    - `user_modules` - User access to specific modules
    - `api_calls` - Log of API calls made by users

  2. Security
    - Enable RLS on all tables
    - Create policies for authenticated user access
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  avatar_url text,
  provider text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  currency text DEFAULT 'BRL',
  billing_period text DEFAULT 'month',
  features jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active plans"
  ON plans FOR SELECT
  USING (is_active = true);

CREATE TABLE IF NOT EXISTS modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  api_type text NOT NULL,
  status text DEFAULT 'online',
  icon_name text,
  endpoint text,
  requires_plan boolean DEFAULT false,
  features jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view modules"
  ON modules FOR SELECT
  USING (true);

CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id uuid NOT NULL REFERENCES plans(id),
  status text DEFAULT 'active',
  mercado_pago_id text,
  start_date timestamptz DEFAULT now(),
  end_date timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS user_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id uuid NOT NULL REFERENCES modules(id),
  access_level text DEFAULT 'basic',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, module_id)
);

ALTER TABLE user_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own module access"
  ON user_modules FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS api_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id uuid NOT NULL REFERENCES modules(id),
  endpoint text,
  request_data jsonb,
  response_data jsonb,
  status_code integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE api_calls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own api calls"
  ON api_calls FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_modules_user_id ON user_modules(user_id);
CREATE INDEX IF NOT EXISTS idx_api_calls_user_id ON api_calls(user_id);
