const PREFIX = "AS-";

export interface StoredTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  scope: string;
}

export class TokenVaultService {
  private static key(name: string): string {
    return `${PREFIX}${name}`;
  }

  static save(tokens: StoredTokens): void {
    sessionStorage.setItem(this.key("accessToken"), tokens.accessToken);
    sessionStorage.setItem(this.key("refreshToken"), tokens.refreshToken);
    sessionStorage.setItem(this.key("expiresAt"), String(tokens.expiresAt));
    sessionStorage.setItem(this.key("scope"), tokens.scope);
  }

  static load(): StoredTokens | null {
    const accessToken = sessionStorage.getItem(this.key("accessToken"));
    const refreshToken = sessionStorage.getItem(this.key("refreshToken"));
    const expiresAtRaw = sessionStorage.getItem(this.key("expiresAt"));
    const scope = sessionStorage.getItem(this.key("scope"));

    if (!accessToken || !refreshToken || !expiresAtRaw || !scope) {
      return null;
    }

    return {
      accessToken,
      refreshToken,
      expiresAt: Number(expiresAtRaw),
      scope,
    };
  }

  static clear(): void {
    sessionStorage.removeItem(this.key("accessToken"));
    sessionStorage.removeItem(this.key("refreshToken"));
    sessionStorage.removeItem(this.key("expiresAt"));
    sessionStorage.removeItem(this.key("scope"));
    sessionStorage.removeItem(this.key("codeVerifier"));
  }

  static saveCodeVerifier(verifier: string): void {
    sessionStorage.setItem(this.key("codeVerifier"), verifier);
  }

  static loadCodeVerifier(): string | null {
    return sessionStorage.getItem(this.key("codeVerifier"));
  }

  static clearCodeVerifier(): void {
    sessionStorage.removeItem(this.key("codeVerifier"));
  }
}
