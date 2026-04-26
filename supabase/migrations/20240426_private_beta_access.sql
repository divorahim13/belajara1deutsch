-- Migration: Private Beta Manual Access
-- Creates `user_level_access` and `manual_sales_notes` tables with RLS policies.

-- 1. user_level_access
CREATE TABLE IF NOT EXISTS user_level_access (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    level TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'expired')) DEFAULT 'inactive',
    activated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    activated_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    notes TEXT,
    ai_quota_limit INT NOT NULL DEFAULT 30,
    ai_quota_used INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, level)
);

-- 2. manual_sales_notes
CREATE TABLE IF NOT EXISTS manual_sales_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    level TEXT NOT NULL,
    amount NUMERIC,
    payment_method TEXT,
    note TEXT,
    recorded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_level_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE manual_sales_notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_level_access
-- 1. Admins/SuperAdmins can do everything
CREATE POLICY "Admins can manage user_level_access" ON user_level_access
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'super_admin')
        )
    );

-- 2. Users can only view their own access
CREATE POLICY "Users can view own access" ON user_level_access
    FOR SELECT
    USING (user_id = auth.uid());

-- RLS Policies for manual_sales_notes
-- 1. Admins/SuperAdmins can do everything
CREATE POLICY "Admins can manage manual_sales_notes" ON manual_sales_notes
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'super_admin')
        )
    );
