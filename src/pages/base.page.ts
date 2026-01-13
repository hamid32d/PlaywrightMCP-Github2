import { Page, Locator } from '@playwright/test';

/**
 * Classe de base pour tous les Page Objects
 */
export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigue vers l'URL spécifiée
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Clique sur un élément
   */
  async clickElement(locator: Locator): Promise<void> {
    await locator.click();
  }

  /**
   * Remplit un champ de texte
   */
  async fillText(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  /**
   * Récupère le texte d'un élément
   */
  async getText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  /**
   * Attend que l'élément soit visible
   */
  async waitForElement(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Récupère le titre de la page
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Récupère l'URL actuelle
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Prend une capture d'écran
   */
  async takeScreenshot(filename: string): Promise<void> {
    await this.page.screenshot({ path: `./screenshots/${filename}.png` });
  }

  /**
   * Ferme la page
   */
  async closePage(): Promise<void> {
    await this.page.close();
  }
}
