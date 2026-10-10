
BEGIN;

-- CV Expert - Migracao 003
-- Consulta a disponibilidade da exportacao gratuita.
-- Nao altera creditos nem horarios.

CREATE FUNCTION public.cvexpert_get_free_export_status(
    p_user_id uuid
)
RETURNS TABLE (
    can_export boolean,
    next_available_at timestamptz,
    server_now timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT
        (
            s.user_id IS NULL
            OR s.next_available_at <= now()
        ) AS can_export,
        s.next_available_at,
        now() AS server_now
    FROM (SELECT 1) AS base
    LEFT JOIN private.free_export_state s
        ON s.user_id = p_user_id;
$$;

-- Somente o backend confiavel pode consultar.
REVOKE ALL ON FUNCTION
    public.cvexpert_get_free_export_status(uuid)
FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION
    public.cvexpert_get_free_export_status(uuid)
TO service_role;

COMMIT;
