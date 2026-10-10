
BEGIN;

-- CV Expert - Migracao 002
-- Restringe a execucao publica da funcao
-- responsavel pela ativacao automatica do RLS.

REVOKE EXECUTE
ON FUNCTION public.rls_auto_enable()
FROM PUBLIC, anon, authenticated;

COMMIT;
