import { test, expect } from '@playwright/test';

test.describe('Onboarding Goal and Time Selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/onboarding');
  });

  test('should allow selecting multiple goals and training time', async ({ page }) => {
    // Sélectionner plusieurs objectifs
    await page.getByRole('button', { name: /perdre du gras/i }).click();
    await page.getByRole('button', { name: /gagner du muscle/i }).click();
    
    // Vérifier l'état "on"
    await expect(page.getByRole('button', { name: /perdre du gras/i })).toHaveAttribute('data-state', 'on');
    await expect(page.getByRole('button', { name: /gagner du muscle/i })).toHaveAttribute('data-state', 'on');

    // Sélectionner un temps d'entraînement
    await page.getByRole('button', { name: /25-30 minutes/i }).click();
    await expect(page.getByRole('button', { name: /25-30 minutes/i })).toHaveAttribute('data-state', 'on');

    // Vérifier que le bouton Continuer est activé
    const continueButton = page.getByRole('link', { name: /continuer/i });
    await expect(continueButton).not.toHaveAttribute('disabled');
  });

  test('should allow keyboard navigation and selection', async ({ page }) => {
    // Navigation au clavier vers les options d'objectif
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // Arriver aux objectifs

    // Sélectionner avec Entrée
    await page.keyboard.press('Enter');
    
    // Vérifier la sélection
    const firstGoalOption = page.getByRole('button', { name: /perdre du gras/i });
    await expect(firstGoalOption).toHaveAttribute('data-state', 'on');

    // Naviguer vers les options de temps
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // Arriver aux options de temps

    // Sélectionner avec Espace
    await page.keyboard.press('Space');
    
    // Vérifier la sélection
    const firstTimeOption = page.getByRole('button', { name: /15-20 minutes/i });
    await expect(firstTimeOption).toHaveAttribute('data-state', 'on');
  });

  test('should show visual feedback on selection', async ({ page }) => {
    const goalOption = page.getByRole('button', { name: /perdre du gras/i });
    
    // Cliquer et vérifier l'état sélectionné
    await goalOption.click();
    await expect(goalOption).toHaveAttribute('data-state', 'on');
    await expect(goalOption).toHaveClass(/data-\[state=on\]:bg-accent-50/);
  });

  test('should require at least one goal before enabling continue', async ({ page }) => {
    const continueButton = page.getByRole('link', { name: /continuer/i });
    
    // Initialement désactivé
    await expect(continueButton).toHaveAttribute('disabled');
    
    // Sélectionner un objectif
    await page.getByRole('button', { name: /perdre du gras/i }).click();
    
    // Sélectionner un temps (déjà sélectionné par défaut)
    await page.getByRole('button', { name: /25-30 minutes/i }).click();
    
    // Maintenant activé
    await expect(continueButton).not.toHaveAttribute('disabled');
  });

  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    
    // Test touch interaction
    const goalOption = page.getByRole('button', { name: /perdre du gras/i });
    await goalOption.tap();
    await expect(goalOption).toHaveAttribute('data-state', 'on');
    
    const timeOption = page.getByRole('button', { name: /25-30 minutes/i });
    await timeOption.tap();
    await expect(timeOption).toHaveAttribute('data-state', 'on');
  });

  test('should allow sleep configuration', async ({ page }) => {
    // Sélectionner un objectif pour débloquer le formulaire
    await page.getByRole('button', { name: /perdre du gras/i }).click();
    await page.getByRole('button', { name: /25-30 minutes/i }).click();

    // Configurer l'heure de coucher
    await page.getByLabel('Heure de coucher souhaitée').fill('22:45');

    // Cocher des éléments d'environnement
    await page.getByText('Chambre dans l\'obscurité totale').click();
    await page.getByText('Température ~19°C').click();

    // Vérifier que les checkboxes sont cochées
    const darknessCheckbox = page.locator('input[type="checkbox"]').first();
    await expect(darknessCheckbox).toBeChecked();
  });

  test('should maintain accessibility standards', async ({ page }) => {
    // Vérifier les rôles ARIA
    const goalOptions = page.getByRole('button').filter({ hasText: /perdre du gras|gagner du muscle|augmenter l'énergie|mieux dormir/i });
    await expect(goalOptions).toHaveCount(4);
    
    const timeOptions = page.getByRole('button').filter({ hasText: /minutes|dépend/i });
    await expect(timeOptions).toHaveCount(4);
    
    // Vérifier les labels
    for (const option of await goalOptions.all()) {
      await expect(option).toHaveAttribute('aria-label');
    }
  });

  test('should validate form and show errors', async ({ page }) => {
    // Essayer de soumettre sans sélection
    const continueButton = page.getByRole('link', { name: /continuer/i });
    await expect(continueButton).toHaveAttribute('disabled');

    // Remplir des valeurs invalides
    await page.getByLabel('Âge').fill('15'); // Trop jeune
    
    // Sélectionner un objectif pour débloquer
    await page.getByRole('button', { name: /perdre du gras/i }).click();
    await page.getByRole('button', { name: /25-30 minutes/i }).click();

    // Le bouton devrait toujours être désactivé à cause de l'âge invalide
    await expect(continueButton).toHaveAttribute('disabled');

    // Corriger l'âge
    await page.getByLabel('Âge').fill('45');
    
    // Maintenant le bouton devrait être activé
    await expect(continueButton).not.toHaveAttribute('disabled');
  });
});