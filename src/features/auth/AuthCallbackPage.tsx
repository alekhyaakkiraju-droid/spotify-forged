import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";

export function AuthCallbackPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { handleCallback, error } = useAuth();

  useEffect(() => {
    const code = params.get("code");
    if (code) {
      void handleCallback(code).then(() => navigate("/", { replace: true }));
    }
  }, [handleCallback, navigate, params]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-spotify-black">
      <div className="text-center">
        <p className="text-white">Completing sign in...</p>
        {error ? <p className="mt-2 text-red-400">{error}</p> : null}
      </div>
    </main>
  );
}

export default AuthCallbackPage;
