import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page Object pour la page d'accueil
 */
export class HomePage extends BasePage {
  // Locators
  readonly searchInput: Locator = this.page.getByRole('searchbox');
  readonly searchButton: Locator = this.page.getByRole('button', { name: /search/i });
  readonly pageTitle: Locator = this.page.getByRole('heading', { level: 1 });
  readonly mainContent: Locator = this.page.locator('main');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigue vers la page d'accueil
   */
  async navigateToHome(baseUrl: string = 'https://example.com'): Promise<void> {
    await this.goto(baseUrl);
  }

  /**
   * Effectue une recherche
   */
  async performSearch(query: string): Promise<void> {
    await this.fillText(this.searchInput, query);
    await this.clickElement(this.searchButton);
  }

  /**
   * Vérifie que le titre de la page est visible
   */
  async verifyPageTitleIsVisible(): Promise<boolean> {
    try {
      await this.waitForElement(this.pageTitle);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Récupère le texte du titre principal
   */
  async getMainTitle(): Promise<string> {
    return await this.getText(this.pageTitle);
  }

  /**
   * Vérifie que le contenu principal est chargé
   */
  async isMainContentLoaded(): Promise<boolean> {
    try {
      await this.waitForElement(this.mainContent);
      return true;
    } catch {
      return false;
    }
  }
}
