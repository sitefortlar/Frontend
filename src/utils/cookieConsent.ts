const STORAGE_KEY = 'lgpd_consent';

export type ConsentStatus = 'accepted' | 'refused' | null;

/**
 * Retorna o status atual do consentimento LGPD (null = ainda não escolheu).
 */
export function getConsent(): ConsentStatus {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'accepted' || raw === 'refused') return raw;
    return null;
  } catch {
    return null;
  }
}

/**
 * Salva a escolha do usuário e retorna true se salvou com sucesso.
 */
export function setConsent(status: 'accepted' | 'refused'): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(STORAGE_KEY, status);
    return true;
  } catch {
    return false;
  }
}

/**
 * Remove o consentimento salvo. Útil para testes ou para permitir que o usuário altere a escolha.
 * Após chamar, o banner será exibido novamente na próxima carga.
 */
export function resetConsent(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
