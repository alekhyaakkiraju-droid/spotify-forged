import { useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";

export function AuthCallbackPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { handleCallback, error, isLoading } = useAuth();
  const processedRef = useRef(false);

  useEffect(() => {
    const code = params.get("code");
    const oauthError = params.get("error");

    if (oauthError) return;
    if (!code || processedRef.current) return;

    processedRef.current = true;
    void handleCallback(code).then((success) => {
      if (success) navigate("/", { replace: true });
    });
  }, [handleCallback, navigate, params]);

  const oauthError = params.get("error");
  const oauthErrorDescription = params.get("error_description");

  return (
    <main className="flex min-h-screen items-center justify-center bg-spotify-black px-6">
      <div className="max-w-md text-center">
        {oauthError ? (
          <>
            <p className="text-red-400">Spotify sign-in was denied or failed.</p>
            <p className="mt-2 text-sm text-white/60">
              {oauthErrorDescription ?? oauthError}
            </p>
          </>
        ) : isLoading ? (
          <p className="text-white">Completing sign in...</p>
        ) : error ? (
          <>
            <p className="text-red-400">{error}</p>
            <Link
              to="/"
              className="mt-6 inline-block rounded-full bg-spotify-green px-6 py-2 font-medium text-black"
            >
              Back to home
            </Link>
          </>
        ) : (
          <p className="text-white">Completing sign in...</p>
        )}
      </div>
    </main>
  );
}

export default AuthCallbackPage;
