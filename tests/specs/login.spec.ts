import { test, expect } from '../fixtures';
import { config, testCredentials } from '../../src/config/config';
import { LoginPage } from '../../src/pages/login.page';

test.describe('Page de Connexion', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin(config.baseUrl + '/login');
  });

  test('Devrait se connecter avec des identifiants valides', async () => {
    await loginPage.login(testCredentials.validUser.email, testCredentials.validUser.password);
    
    // Attendre que la redirection soit complète
    await page.waitForURL('**/dashboard');
    expect(page.url()).toContain('dashboard');
  });

  test('Devrait afficher une erreur avec des identifiants invalides', async () => {
    await loginPage.login(testCredentials.invalidUser.email, testCredentials.invalidUser.password);
    
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();
  });

  test('Devrait se souvenir de l\'utilisateur si "Se souvenir" est coché', async () => {
    await loginPage.login(
      testCredentials.validUser.email,
      testCredentials.validUser.password,
      true
    );

    // Vérifier que le cookie ou le localStorage est défini
    const localStorage = await page.evaluate(() => localStorage.getItem('rememberMe'));
    expect(localStorage).toBeTruthy();
  });

  test('Devrait rester sur la page de connexion en cas d\'erreur', async () => {
    const initialUrl = await loginPage.getCurrentUrl();
    
    await loginPage.login(testCredentials.invalidUser.email, testCredentials.invalidUser.password);
    
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toBe(initialUrl);
  });

  test('Devrait afficher les champs d\'entrée requis', async () => {
    expect(loginPage.emailInput).toBeTruthy();
    expect(loginPage.passwordInput).toBeTruthy();
    expect(loginPage.loginButton).toBeTruthy();
  });
});
