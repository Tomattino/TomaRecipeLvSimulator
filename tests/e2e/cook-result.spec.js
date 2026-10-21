/************************************
 * ■ 各回の結果(大成功・日曜・追加食材・手入力・残りEXP)
 ************************************/

import { test, expect } from '@playwright/test';
import { openApp, totalCookCount } from './helpers.js';

test.describe('各回の結果', () => {

  test.beforeEach(async ({ page }) => {
    await openApp(page);
  });

  test('大成功を付けると倍率×2が出て、日曜も付けると×3になる', async ({ page }) => {
    const firstCook = page.locator('.cook-item').first();

    await firstCook.getByRole('button', { name: '🍲 大成功' }).click();
    await expect(firstCook).toHaveClass(/is-critical/);
    await expect(firstCook.locator('.multiplier')).toHaveText('×2');

    await firstCook.getByRole('button', { name: '☀ 日曜' }).click();
    await expect(firstCook.locator('.multiplier')).toHaveText('×3');
  });

  test('大成功を付けると、合計調理回数が減るか変わらない(増えない)', async ({ page }) => {
    const before = await totalCookCount(page);
    await page.locator('.cook-item').first().getByRole('button', { name: '🍲 大成功' }).click();

    await expect.poll(() => totalCookCount(page)).toBeLessThanOrEqual(before);
  });

  test('各回に「次のLvまで」が出て、レベルの最後の回だけ「Lv UP」になる', async ({ page }) => {
    const firstLevel = page.locator('.level-block').first();
    const remaining = firstLevel.locator('.remaining-exp');
    const count = await remaining.count();

    for (let i = 0; i < count - 1; i++) {
      await expect(remaining.nth(i)).toContainText('次のLvまで');
    }
    await expect(remaining.nth(count - 1)).toContainText('Lv UP');
  });

  test('手入力したエナジーには印が付き、ゴミ箱で元に戻せる', async ({ page }) => {
    const firstCook = page.locator('.cook-item').first();

    await firstCook.getByText('✏️').click();
    await firstCook.locator('input[type="number"]').fill('12345');
    await firstCook.getByText('✅').click();

    await expect(firstCook.locator('.energy')).toContainText('12,345 エナジー');
    await expect(firstCook.locator('.manual-badge')).toBeVisible();

    await firstCook.getByText('🗑').click();
    await expect(firstCook.locator('.manual-badge')).toHaveCount(0);
  });

  test('追加食材を入れると、その回の欄に画像と個数、合計が出る', async ({ page }) => {
    const firstCook = page.locator('.cook-item').first();
    await expect(firstCook.locator('.extra-total')).toHaveText('なし');

    await firstCook.getByRole('button', { name: '追加食材編集' }).click();
    const honeyCard = page.locator('.ing-card', { hasText: 'あまいミツ' });
    await honeyCard.getByRole('button', { name: '+' }).click();
    await honeyCard.getByRole('button', { name: '+' }).click();
    await page.locator('.modal-dialog .btn-close').click();

    await expect(firstCook.locator('.extra-total')).toHaveText('計 2個');
    await expect(firstCook.locator('.extra-item')).toHaveCount(1);
    await expect(firstCook.locator('.extra-item')).toContainText('×2');
  });
});

test.describe('追加食材モーダル', () => {

  test('総食材数と追加食材数が出て、追加すると増える', async ({ page }) => {
    await openApp(page);
    await page.locator('.cook-item').first().getByRole('button', { name: '追加食材編集' }).click();

    const total = page.locator('.ing-total-num');
    const extra = page.locator('.ing-total-extra');
    await expect(extra).toContainText('追加食材数：0');
    const recipeTotal = Number(await total.innerText());
    expect(recipeTotal).toBeGreaterThan(0);

    await page.locator('.ing-card', { hasText: 'とくせんエッグ' }).getByRole('button', { name: '+' }).click();
    await expect(extra).toContainText('追加食材数：1');
    await expect(total).toHaveText(String(recipeTotal + 1));

    await page.getByRole('button', { name: 'リセット' }).click();
    await expect(extra).toContainText('追加食材数：0');
  });
});
