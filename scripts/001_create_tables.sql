-- Code Xero Analytics Platform Database Schema
-- Tables for users, alerts, tokens, wallets, and AI query cache

-- Profiles table for user data
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'enterprise')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Watched tokens
CREATE TABLE IF NOT EXISTS watched_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  chain TEXT NOT NULL CHECK (chain IN ('solana', 'bnb')),
  token_address TEXT NOT NULL,
  token_symbol TEXT,
  token_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, chain, token_address)
);

ALTER TABLE watched_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "watched_tokens_select_own" ON watched_tokens FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "watched_tokens_insert_own" ON watched_tokens FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "watched_tokens_delete_own" ON watched_tokens FOR DELETE USING (auth.uid() = user_id);

-- Watched wallets
CREATE TABLE IF NOT EXISTS watched_wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  chain TEXT NOT NULL CHECK (chain IN ('solana', 'bnb')),
  wallet_address TEXT NOT NULL,
  label TEXT,
  is_whale BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, chain, wallet_address)
);

ALTER TABLE watched_wallets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "watched_wallets_select_own" ON watched_wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "watched_wallets_insert_own" ON watched_wallets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "watched_wallets_delete_own" ON watched_wallets FOR DELETE USING (auth.uid() = user_id);

-- User alerts
CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('whale_movement', 'lp_change', 'price_anomaly', 'rug_warning', 'volume_spike')),
  chain TEXT NOT NULL CHECK (chain IN ('solana', 'bnb')),
  target_address TEXT NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('token', 'wallet')),
  threshold JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "alerts_select_own" ON alerts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "alerts_insert_own" ON alerts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "alerts_update_own" ON alerts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "alerts_delete_own" ON alerts FOR DELETE USING (auth.uid() = user_id);

-- Alert notifications (triggered alerts)
CREATE TABLE IF NOT EXISTS alert_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_id UUID NOT NULL REFERENCES alerts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE alert_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "alert_notifications_select_own" ON alert_notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "alert_notifications_update_own" ON alert_notifications FOR UPDATE USING (auth.uid() = user_id);

-- AI query cache for deterministic responses
CREATE TABLE IF NOT EXISTS ai_query_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query_hash TEXT NOT NULL UNIQUE,
  query_text TEXT NOT NULL,
  context_hash TEXT NOT NULL,
  response JSONB NOT NULL,
  model_version TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '1 hour'
);

-- Public read for cache (no RLS needed - cache is shared)
ALTER TABLE ai_query_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ai_cache_select_all" ON ai_query_cache FOR SELECT USING (true);
CREATE POLICY "ai_cache_insert_all" ON ai_query_cache FOR INSERT WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_watched_tokens_user ON watched_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_watched_wallets_user ON watched_wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_user ON alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_alert_notifications_user ON alert_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_cache_hash ON ai_query_cache(query_hash);
CREATE INDEX IF NOT EXISTS idx_ai_cache_expires ON ai_query_cache(expires_at);

-- Auto-create profile on signup trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
