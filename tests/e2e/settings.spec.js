/************************************
 * ■ 設定(ボーナス・次のレベルまで・曜日設定)
 ************************************/

import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

test.describe('ボーナス・次のレベルまで', () => {

  test.beforeEach(async ({ page }) => {
    await openApp(page);
  });

  test('イベントボーナスのバッジを押すと値が入り、そのバッジだけ選択中になる', async ({ page }) => {
    const eventInput = page.locator('.input-unit', { hasText: 'イベントボーナス' }).locator('input');
    await expect(page.locator('.preset-badge.active')).toHaveText('×1.0');

    await page.locator('.preset-badge', { hasText: '×1.25' }).click();
    await expect(eventInput).toHaveValue('1.25');
    await expect(page.locator('.preset-badge.active')).toHaveText('×1.25');

    await eventInput.fill('1.3');
    await expect(page.locator('.preset-badge.active')).toHaveCount(0);
  });

  test('イベントボーナスに0を入れても、計算が止まらない', async ({ page }) => {
    const eventInput = page.locator('.input-unit', { hasText: 'イベントボーナス' }).locator('input');
    await eventInput.fill('0');

    await expect(page.locator('.total-count')).toContainText('回');
    await expect(page.locator('.cook-item').first()).toBeVisible();
  });

  test('「次のレベルまで」に必要EXPより大きい値を入れると、上限に戻る', async ({ page }) => {
    const expInput = page.locator('.input-unit', { hasText: '次のレベルまで' }).locator('input');
    const max = Number(await expInput.inputValue());

    await expInput.fill(String(max * 10));
    await expect(expInput).toHaveValue(String(max));
  });
});

test.describe('曜日設定', () => {

  test('曜日を表示すると、結果に曜日のマークと、合計食材数に設定曜日分が出る', async ({ page }) => {
    await openApp(page);
    await page.getByRole('button', { name: '曜日設定' }).click();
    await page.locator('.show-toggle input').check();
    await page.getByRole('button', { name: '閉じる' }).click();

    await expect(page.locator('.weekday-mark').first()).toHaveText('月🌅');
    await expect(page.locator('.ing-header')).toContainText('設定曜日分');
    await expect(page.locator('.ing-week-total').first()).toBeVisible();
  });

  test('開始曜日を水曜にすると、最初の回が水曜になり、月火は押せなくなる', async ({ page }) => {
    await openApp(page);
    await page.getByRole('button', { name: '曜日設定' }).click();
    await page.locator('.show-toggle input').check();
    await page.locator('.weekday-select').selectOption('wed');

    await expect(page.locator('.weekday-row.before-start')).toHaveCount(2);
    await page.getByRole('button', { name: '閉じる' }).click();

    await expect(page.locator('.weekday-mark').first()).toHaveText('水🌅');
  });
});
