import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page Object pour la page de connexion
 */
export class LoginPage extends BasePage {
  // Locators
  readonly emailInput: Locator = this.page.getByLabel(/email/i);
  readonly passwordInput: Locator = this.page.getByLabel(/password/i);
  readonly loginButton: Locator = this.page.getByRole('button', { name: /login|sign in/i });
  readonly errorMessage: Locator = this.page.locator('[role="alert"]');
  readonly rememberMeCheckbox: Locator = this.page.getByLabel(/remember/i);

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigue vers la page de connexion
   */
  async navigateToLogin(baseUrl: string = 'https://example.com/login'): Promise<void> {
    await this.goto(baseUrl);
  }

  /**
   * Remplit et soumet le formulaire de connexion
   */
  async login(email: string, password: string, rememberMe: boolean = false): Promise<void> {
    await this.fillText(this.emailInput, email);
    await this.fillText(this.passwordInput, password);

    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }

    await this.clickElement(this.loginButton);
  }

  /**
   * Récupère le message d'erreur de connexion
   */
  async getErrorMessage(): Promise<string> {
    await this.waitForElement(this.errorMessage);
    return await this.getText(this.errorMessage);
  }

  /**
   * Vérifie si le message d'erreur est visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    try {
      await this.waitForElement(this.errorMessage, 3000);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Rempli le formulaire sans le soumettre
   */
  async fillLoginForm(email: string, password: string): Promise<void> {
    await this.fillText(this.emailInput, email);
    await this.fillText(this.passwordInput, password);
  }

  /**
   * Clique sur le bouton de connexion
   */
  async clickLoginButton(): Promise<void> {
    await this.clickElement(this.loginButton);
  }
}
