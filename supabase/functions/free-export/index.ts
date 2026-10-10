
import { withSupabase } from "@supabase/server";

export default {
  fetch: withSupabase({ auth: "user" }, (req, ctx) => {
    if (req.method !== "GET") {
      return Promise.resolve(
        Response.json(
          { error: "Metodo nao permitido." },
          { status: 405 },
        ),
      );
    }

    const userId = ctx.userClaims?.id;

    if (!userId) {
      return Promise.resolve(
        Response.json(
          { error: "Usuario nao autenticado." },
          { status: 401 },
        ),
      );
    }

    return Promise.resolve(
      Response.json({
        authenticated: true,
        user_id: userId,
        free_export_interval_hours: 72,
        export_enabled: false,
        message:
          "Autenticacao validada. Sistema de creditos em desenvolvimento.",
      }),
    );
  }),
};
