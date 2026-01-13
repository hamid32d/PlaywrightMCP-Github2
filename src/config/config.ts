/**
 * Configuration de l'environnement
 */
export const config = {
  baseUrl: process.env.BASE_URL || 'https://example.com',
  apiUrl: process.env.API_URL || 'https://api.example.com',
  timeout: parseInt(process.env.TIMEOUT || '30000'),
  retries: parseInt(process.env.RETRIES || '2'),
  headless: process.env.HEADLESS !== 'false',
  browser: process.env.BROWSER || 'chromium',
  slowMo: parseInt(process.env.SLOW_MO || '0'),
  screenshot: process.env.SCREENSHOT || 'only-on-failure',
  video: process.env.VIDEO || 'retain-on-failure',
};

/**
 * Identifiants de test (à remplacer par vos propres identifiants)
 */
export const testCredentials = {
  validUser: {
    email: 'test@example.com',
    password: 'Password123!',
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'wrongpassword',
  },
};

/**
 * Délais d'attente
 */
export const delays = {
  short: 1000,
  medium: 3000,
  long: 5000,
  extraLong: 10000,
};
