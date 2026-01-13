# Playwright POM Framework

Framework complet d'automatisation de tests avec **Playwright**, **TypeScript** et **Pattern Page Object Model (POM)**.

## 📋 Table des matières

- [Caractéristiques](#-caractéristiques)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Structure du projet](#-structure-du-projet)
- [Guide d'utilisation](#-guide-dutilisation)
- [Écrire les tests](#-écrire-les-tests)
- [Exécuter les tests](#-exécuter-les-tests)
- [CI/CD avec GitHub Actions](#-cicd-avec-github-actions)
- [Ressources](#-ressources)

## ✨ Caractéristiques

✅ **TypeScript** - Typage fort et meilleure maintenabilité
✅ **Pattern POM** - Architecture scalable et maintenable
✅ **Fixtures personnalisées** - Réutilisabilité et flexibilité
✅ **Tests parallélisés** - Exécution rapide
✅ **Multi-navigateurs** - Chromium, Firefox, WebKit
✅ **Multi-appareils** - Desktop, mobile, tablette
✅ **Rapports enrichis** - HTML, JSON, JUnit
✅ **GitHub Actions CI/CD** - Automatisation des tests
✅ **Screenshots & Vidéos** - Capture d'écran automatique
✅ **Configuration centralisée** - Facilité de gestion

## 📦 Prérequis

- **Node.js** v16 ou supérieur
- **npm** v7 ou supérieur
- **Git** (pour le contrôle de version)

## 🚀 Installation

1. **Cloner le repository**
```bash
git clone https://github.com/yourusername/playwright-pom-framework.git
cd playwright-pom-framework
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Installer les navigateurs Playwright**
```bash
npm run install-browsers
# ou
npx playwright install
```

4. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

Éditer le fichier `.env` avec vos paramètres:
```env
BASE_URL=https://example.com
API_URL=https://api.example.com
TIMEOUT=30000
HEADLESS=true
BROWSER=chromium
```

## 📁 Structure du projet

```
playwright-pom-framework/
├── src/
│   ├── pages/                    # Page Objects
│   │   ├── base.page.ts         # Classe de base pour tous les Page Objects
│   │   ├── home.page.ts         # Page Object de la page d'accueil
│   │   ├── login.page.ts        # Page Object de connexion
│   │   └── ...
│   ├── config/
│   │   └── config.ts            # Configuration centralisée
│   ├── helpers/                 # Fonctions utilitaires
│   └── utils/                   # Utilitaires partagés
├── tests/
│   ├── specs/                   # Fichiers de tests
│   │   ├── home.spec.ts
│   │   ├── login.spec.ts
│   │   └── ...
│   ├── fixtures/
│   │   └── index.ts            # Fixtures personnalisées
│   └── data/                    # Données de test
├── .github/
│   └── workflows/
│       └── tests.yml           # Configuration GitHub Actions
├── playwright-report/           # Rapports HTML (généré)
├── test-results/               # Résultats des tests (généré)
├── playwright.config.ts        # Configuration Playwright
├── tsconfig.json              # Configuration TypeScript
├── package.json               # Dépendances du projet
└── README.md
```

## 📖 Guide d'utilisation

### Créer un Page Object

Les Page Objects encapsulent l'interaction avec une page web:

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class MyPage extends BasePage {
  // Définir les locators
  readonly header: Locator = this.page.locator('header');
  readonly button: Locator = this.page.getByRole('button', { name: /Click/i });

  constructor(page: Page) {
    super(page);
  }

  // Définir les actions
  async clickButton(): Promise<void> {
    await this.clickElement(this.button);
  }

  // Définir les vérifications
  async isHeaderVisible(): Promise<boolean> {
    try {
      await this.waitForElement(this.header);
      return true;
    } catch {
      return false;
    }
  }
}
```

### Créer une Fixture

Les fixtures permettent de réutiliser les Page Objects:

```typescript
import { test as base } from '@playwright/test';
import { MyPage } from '../pages/my.page';

type MyFixtures = {
  myPage: MyPage;
};

export const test = base.extend<MyFixtures>({
  myPage: async ({ page }, use) => {
    const myPage = new MyPage(page);
    await use(myPage);
  },
});
```

## 🧪 Écrire les tests

Utiliser les fixtures pour écrire les tests facilement:

```typescript
import { test, expect } from '../fixtures';
import { config } from '../../src/config/config';

test.describe('My Test Suite', () => {
  test.beforeEach(async ({ myPage }) => {
    await myPage.goto(config.baseUrl);
  });

  test('Should perform an action', async ({ myPage }) => {
    await myPage.clickButton();
    const visible = await myPage.isHeaderVisible();
    expect(visible).toBeTruthy();
  });

  test('Should verify title', async ({ page, myPage }) => {
    const title = await myPage.getPageTitle();
    expect(title).toContain('Expected');
  });
});
```

## 🏃 Exécuter les tests

### Exécuter tous les tests
```bash
npm test
```

### Exécuter en mode headed (voir le navigateur)
```bash
npm run test:headed
```

### Exécuter en mode debug
```bash
npm run test:debug
```

### Exécuter en mode UI
```bash
npm run test:ui
```

### Exécuter un fichier de test spécifique
```bash
npx playwright test tests/specs/login.spec.ts
```

### Exécuter un test spécifique
```bash
npx playwright test -g "Should login successfully"
```

### Afficher les rapports
```bash
npm run test:report
```

## 🔄 CI/CD avec GitHub Actions

Le projet inclut une configuration **GitHub Actions** automatisée:

### Workflows configurés:

1. **Tests sur Push/PR** - Exécution automatique des tests
2. **Rapports HTML** - Génération de rapports détaillés
3. **Commentaires PR** - Résultats affichés dans les PR
4. **Tests planifiés** - Exécution quotidienne à 2h du matin

### Ajouter le workflow:

Le fichier `.github/workflows/tests.yml` est inclus. Il suffit de:

1. Pousser le code vers GitHub
2. Le workflow s'exécutera automatiquement

### Voir les résultats:

- **Actions** → Cliquer sur le workflow
- **Artifacts** → Télécharger les rapports

## 🛠️ Configuration Playwright

Le fichier `playwright.config.ts` configure:

- **Navigateurs**: Chromium, Firefox, WebKit
- **Appareils**: Desktop et Mobile
- **Rapports**: HTML, JSON, JUnit
- **Timeouts**: 30 secondes par défaut
- **Retries**: 2 tentatives en CI
- **Traces**: Enregistrement automatique des traces

### Personnaliser la configuration:

```typescript
use: {
  baseURL: 'https://example.com',
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  actionTimeout: 5000,
}
```

## 📊 Rapports

Les rapports sont générés automatiquement:

- **HTML Report**: `playwright-report/index.html`
- **JSON Results**: `test-results/results.json`
- **JUnit XML**: `test-results/junit.xml`

Visualiser le rapport HTML:
```bash
npm run test:report
```

## 🌍 Variables d'environnement

Créer un fichier `.env.example`:

```env
# URLs
BASE_URL=https://example.com
API_URL=https://api.example.com

# Configuration
TIMEOUT=30000
RETRIES=2
HEADLESS=true
BROWSER=chromium

# Capture
SCREENSHOT=only-on-failure
VIDEO=retain-on-failure
SLOW_MO=0
```

Charger dans `src/config/config.ts` (déjà fait).

## 🧑‍💻 Bonnes pratiques

### 1. **Utiliser l'héritage BasePage**
Tous les Page Objects doivent hériter de `BasePage` pour accéder aux méthodes communes.

### 2. **Nommer les locators clairement**
```typescript
readonly loginButton: Locator = this.page.getByRole('button', { name: /login/i });
```

### 3. **Ajouter des commentaires JSDoc**
```typescript
/**
 * Effectue la connexion avec email et mot de passe
 */
async login(email: string, password: string): Promise<void> {
  // ...
}
```

### 4. **Utiliser les fixtures pour réutiliser les Page Objects**
Les fixtures rendent les tests plus lisibles et maintenables.

### 5. **Séparer les données des tests**
Utiliser `src/config/config.ts` pour les données statiques.

### 6. **Paramétriser les tests**
```typescript
[
  { email: 'user1@test.com', password: 'pass1' },
  { email: 'user2@test.com', password: 'pass2' },
].forEach(({ email, password }) => {
  test(`Should login with ${email}`, async ({ loginPage }) => {
    // ...
  });
});
```

## 📚 Ressources

- [Documentation Playwright](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Page Object Model Pattern](https://www.sauceLabs.com/blog/page-object-model-in-test-automation)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🤝 Contribution

Les contributions sont bienvenues ! Pour contribuer:

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir [LICENSE](LICENSE) pour plus de détails.

## 👨‍💼 Auteur

**Achraf Abdelhamid**
- GitHub: [@achraf](https://github.com/yourusername)

## 📞 Support

Pour toute question ou problème, ouvrir une issue sur GitHub.

---

**Fait avec ❤️ pour la communauté de test d'automatisation**
