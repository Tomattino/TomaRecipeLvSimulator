/************************************
 * ■ レシピ選択
 ************************************/

import { test, expect } from '@playwright/test';
import { openApp, headerRecipeName } from './helpers.js';

test.describe('レシピ選択', () => {

  test.beforeEach(async ({ page }) => {
    await openApp(page);
    await page.getByRole('button', { name: 'レシピ選択' }).click();
  });

  test('カテゴリのタブを切り替えると、そのカテゴリのレシピが並ぶ', async ({ page }) => {
    const cards = page.locator('.recipe-grid .recipe-card');

    await page.getByRole('button', { name: /サラダ/ }).click();
    await expect(cards.filter({ hasText: 'りんごさんヨーグルトサラダ' })).toHaveCount(1);
    await expect(cards.filter({ hasText: 'とびはねるカレーうどん' })).toHaveCount(0);

    await page.getByRole('button', { name: /カレー/ }).click();
    await expect(cards.filter({ hasText: 'とびはねるカレーうどん' })).toHaveCount(1);
  });

  test('レシピは基本エナジーの高い順に並ぶ', async ({ page }) => {
    const energies = (await page.locator('.recipe-grid .energy-value').allInnerTexts()).map(Number);

    expect(energies.length).toBeGreaterThan(1);
    expect(energies).toEqual([...energies].sort((a, b) => b - a));
  });

  test('選択中のレシピのカードだけに印が付く', async ({ page }) => {
    await expect(page.locator('.recipe-grid .recipe-card.selected')).toHaveCount(1);
    await expect(page.locator('.recipe-grid .recipe-card.selected')).toContainText('とびはねるカレーうどん');
  });

  test('別のカテゴリのレシピを選ぶと、モーダルが閉じてレシピが切り替わる', async ({ page }) => {
    await page.getByRole('button', { name: /サラダ/ }).click();
    await page.locator('.recipe-grid .recipe-card', { hasText: 'りんごさんヨーグルトサラダ' }).click();

    await expect(page.locator('.recipe-grid')).toBeHidden();
    await expect(headerRecipeName(page)).toHaveText('りんごさんヨーグルトサラダ');
  });
});
