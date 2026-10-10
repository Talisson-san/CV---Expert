BEGIN;

-- Área interna, não exposta diretamente à API.
CREATE SCHEMA IF NOT EXISTS private;

REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO service_role;

-- Registra o último uso e o próximo horário disponível.
CREATE TABLE private.free_export_state (
    user_id uuid PRIMARY KEY
        REFERENCES auth.users(id) ON DELETE CASCADE,
    last_export_at timestamptz NOT NULL,
    next_available_at timestamptz NOT NULL,
    CONSTRAINT valid_free_export_period
    CHECK (
        next_available_at =
                    last_export_at + INTERVAL '72 hours'
    )
);

-- Histórico de solicitações e proteção contra repetição
-- da mesma requisição.
CREATE TABLE private.export_requests (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL
        REFERENCES auth.users(id) ON DELETE CASCADE,
    idempotency_key uuid NOT NULL,
    status text NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'completed', 'failed')),
    created_at timestamptz NOT NULL DEFAULT now(),
    completed_at timestamptz,
    CONSTRAINT valid_export_completion CHECK (
        (status = 'completed') = (completed_at IS NOT NULL)
    ),
    UNIQUE (user_id, idempotency_key)
);

-- Bloqueio por padrão, sem políticas para usuários comuns.
ALTER TABLE private.free_export_state
    ENABLE ROW LEVEL SECURITY;

ALTER TABLE private.export_requests
    ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE
    private.free_export_state,
    private.export_requests
FROM PUBLIC, anon, authenticated;

-- Permissões reservadas ao backend confiável.
GRANT SELECT, INSERT, UPDATE ON TABLE
    private.free_export_state,
    private.export_requests
TO service_role;

COMMIT;
