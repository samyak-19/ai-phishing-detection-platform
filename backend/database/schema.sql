-- ============================================
-- AI Phishing Detection Platform
-- Database Schema
-- ============================================

-- USERS
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SCANS
CREATE TABLE scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    scan_type VARCHAR(20) NOT NULL
        CHECK (scan_type IN ('url', 'email')),

    input_data TEXT NOT NULL,

    risk_score INTEGER
        CHECK (risk_score >= 0 AND risk_score <= 100),

    risk_level VARCHAR(20)
        CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),

    status VARCHAR(20) DEFAULT 'completed'
        CHECK (status IN ('pending', 'completed', 'failed')),

    recommendation TEXT,

    virustotal_result JSONB,

    safe_browsing_result JSONB,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- THREAT REPORTS
CREATE TABLE threat_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    scan_id UUID NOT NULL
        REFERENCES scans(id)
        ON DELETE CASCADE,

    title VARCHAR(255) NOT NULL,

    description TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_scans_user_id
ON scans(user_id);

CREATE INDEX idx_scans_created_at
ON scans(created_at);

CREATE INDEX idx_threat_reports_scan_id
ON threat_reports(scan_id);