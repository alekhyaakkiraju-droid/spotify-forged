import { z } from "zod";

const envSchema = z.object({
  VITE_SPOTIFY_CLIENT_ID: z.string().min(1, "VITE_SPOTIFY_CLIENT_ID is required"),
  VITE_SPOTIFY_REDIRECT_URI: z
    .string()
    .url("VITE_SPOTIFY_REDIRECT_URI must be a valid URL"),
  VITE_SPOTIFY_SCOPES: z.string().min(1, "VITE_SPOTIFY_SCOPES is required"),
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const result = envSchema.safeParse(import.meta.env);
  if (!result.success) {
    const messages = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid environment configuration: ${messages}`);
  }
  return result.data;
}

export const env = parseEnv();

export const spotifyAuthConfig = {
  clientId: env.VITE_SPOTIFY_CLIENT_ID,
  redirectUri: env.VITE_SPOTIFY_REDIRECT_URI,
  scopes: env.VITE_SPOTIFY_SCOPES.split(" ").filter(Boolean),
  authorizeUrl: "https://accounts.spotify.com/authorize",
  tokenUrl: "https://accounts.spotify.com/api/token",
} as const;
