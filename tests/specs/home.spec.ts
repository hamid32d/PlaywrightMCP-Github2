import { test, expect } from '../fixtures';
import { config } from '../../src/config/config';

test.describe('Page d\'Accueil', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToHome(config.baseUrl);
  });

  test('Devrait charger la page d\'accueil', async ({ homePage }) => {
    const isLoaded = await homePage.isMainContentLoaded();
    expect(isLoaded).toBeTruthy();
  });

  test('Devrait afficher le titre principal', async ({ homePage }) => {
    const isTitleVisible = await homePage.verifyPageTitleIsVisible();
    expect(isTitleVisible).toBeTruthy();
  });

  test('Devrait avoir le bon titre de page', async ({ homePage }) => {
    const title = await homePage.getPageTitle();
    expect(title).toBeTruthy();
  });

  test('Devrait contenir le contenu principal', async ({ homePage, page }) => {
    const mainContent = await page.locator('main').isVisible();
    expect(mainContent).toBeTruthy();
  });

  test('Devrait pouvoir effectuer une recherche', async ({ homePage }) => {
    await homePage.performSearch('test query');
    
    // Attendre que la page de résultats se charge
    await homePage.page.waitForURL('**/search*');
    expect(homePage.page.url()).toContain('search');
  });
});
