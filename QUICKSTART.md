# Démarrage rapide du Framework

## 1️⃣ Installation initiale

```bash
# Cloner le projet
git clone <votre-repo>
cd playwright-pom-framework

# Installer les dépendances
npm install

# Installer les navigateurs
npm run install-browsers
```

## 2️⃣ Configuration

Copier le fichier d'exemple:
```bash
cp .env.example .env
```

Éditer `.env` avec vos URLs:
```env
BASE_URL=https://votre-site.com
API_URL=https://api.votre-site.com
```

## 3️⃣ Écrire votre premier test

Créer `tests/specs/example.spec.ts`:

```typescript
import { test, expect } from '../fixtures';
import { config } from '../../src/config/config';

test.describe('Example Test Suite', () => {
  test('Example test', async ({ page }) => {
    await page.goto(config.baseUrl);
    expect(page.url()).toContain(config.baseUrl);
  });
});
```

## 4️⃣ Exécuter les tests

```bash
# Mode normal
npm test

# Mode headed (voir le navigateur)
npm run test:headed

# Mode debug
npm run test:debug

# Mode UI
npm run test:ui
```

## 5️⃣ Voir les rapports

```bash
npm run test:report
```

## 📚 Étapes suivantes

1. **Créer des Page Objects** - Encapsuler l'interaction avec vos pages
2. **Créer des Fixtures** - Réutiliser vos Page Objects
3. **Écrire des tests** - Utiliser vos Page Objects dans les tests
4. **Configurer GitHub Actions** - Automatiser les tests

## 🎯 Commandes utiles

```bash
# Compiler TypeScript
npm run build

# Linter
npm run lint

# Formater le code
npm run format

# Exécuter un test spécifique
npx playwright test -g "nom du test"

# Exécuter un fichier de test
npx playwright test tests/specs/login.spec.ts
```

## ✅ Checklist de mise en place

- [ ] Créer des Page Objects pour chaque page
- [ ] Créer des Fixtures pour les Page Objects
- [ ] Écrire les tests E2E
- [ ] Configurer `.env` avec vos URLs
- [ ] Exécuter les tests localement
- [ ] Pousser le code vers GitHub
- [ ] Vérifier que GitHub Actions s'exécute
- [ ] Configurer les branches protégées (optionnel)

## 🆘 Dépannage

### Les tests ne trouvent pas les éléments
- Vérifier les sélecteurs dans les Page Objects
- Utiliser `npx playwright test --debug` pour inspecter

### GitHub Actions échoue
- Vérifier les variables d'environnement
- Consulter les logs de l'action

### Les navigateurs ne s'installent pas
```bash
npx playwright install --with-deps
```

---

**Besoin d'aide?** Consulter le [README.md](../README.md) pour plus de détails.
