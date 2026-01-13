/**
 * Utilitaires pour les délais et attentes
 */
export class WaitHelper {
  /**
   * Attend un délai spécifique en millisecondes
   */
  static async waitMs(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Attend avec une condition
   */
  static async waitUntil(
    condition: () => boolean | Promise<boolean>,
    timeout: number = 5000,
    checkInterval: number = 100
  ): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const result = await condition();
      if (result) {
        return;
      }
      await this.waitMs(checkInterval);
    }

    throw new Error(`Condition not met within ${timeout}ms`);
  }

  /**
   * Retry avec délai exponentiel
   */
  static async retryWithExponentialBackoff<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    initialDelayMs: number = 1000
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        const delay = initialDelayMs * Math.pow(2, i);
        await this.waitMs(delay);
      }
    }

    throw lastError || new Error('All retries failed');
  }
}
