/************************************
 * ■ 設定の管理モーダル・履歴
 ************************************/

import { test, expect } from '@playwright/test';
import { openApp, readCurrentSession, headerRecipeName, seedCurrentSession, oldFormatSession } from './helpers.js';

test.describe('設定の管理モーダル', () => {

  test.beforeEach(async ({ page }) => {
    await openApp(page);
  });

  test('歯車から開くと、付けた設定が表に出て、列の解除で外れる', async ({ page }) => {
    await page.locator('.cook-item').first().getByRole('button', { name: '🍲 大成功' }).click();
    await page.getByRole('button', { name: '設定の管理' }).click();

    const firstRow = page.locator('.status-table tbody tr').first();
    await expect(firstRow).toContainText('🍲');

    //「解除」は列ごとに並んでいる(1つ目が大成功)
    await page.locator('.col-actions .btn-clear').nth(0).click();
    await expect(firstRow).not.toContainText('🍲');
  });

  test('すべてリセットは確認を出し、OKで全部の設定が外れる', async ({ page }) => {
    const firstCook = page.locator('.cook-item').first();
    await firstCook.getByRole('button', { name: '🍲 大成功' }).click();
    await firstCook.getByRole('button', { name: '☀ 日曜' }).click();

    await page.getByRole('button', { name: '設定の管理' }).click();
    page.once('dialog', (dialog) => dialog.accept());
    await page.getByRole('button', { name: 'すべてリセット' }).click();
    await page.locator('.modal-dialog .btn-close').click();

    await expect(firstCook).not.toHaveClass(/is-critical/);
    await expect(firstCook.getByRole('button', { name: '☀ 日曜' })).not.toHaveClass(/active/);
  });

});

test.describe('設定の管理モーダル(範囲外の設定)', () => {

  //調理回数より後ろ(通し番号999)に大成功が残っている状態で起動する
  test.beforeEach(async ({ page }) => {
    const session = oldFormatSession('とびはねるカレーうどん');
    session.cookStatusRawMap = { 999: { isSunday: false, isCritical: true, extraIngredients: {} } };
    await seedCurrentSession(page, session);
    await openApp(page);
  });

  test('調理回数より後ろに残った設定が「範囲外」として表に出る', async ({ page }) => {
    await page.getByRole('button', { name: '設定の管理' }).click();

    const outRow = page.locator('.status-table tbody tr', { has: page.locator('.tag-out') });
    await expect(outRow).toHaveCount(1);
    await expect(outRow).toContainText('🍲');
  });

  test('範囲外の設定だけを解除しても、閉じた時に保存される', async ({ page }) => {
    //範囲外の設定は計算に使われないので、解除しても自動保存は動かない。閉じた時の保存が無いと、保存データに残ったままになる
    await page.getByRole('button', { name: '設定の管理' }).click();
    await page.locator('.col-actions .btn-clear').nth(0).click();
    await expect(page.locator('.status-table .tag-out')).toHaveCount(0);

    await page.locator('.modal-dialog .btn-close').click();
    await expect.poll(async () => (await readCurrentSession(page))?.cookStatusRawMap?.[999]?.isCritical).toBe(false);
  });
});

test.describe('履歴', () => {

  test('名前を付けて保存すると、保存済みに料理名つきで並ぶ', async ({ page }) => {
    await openApp(page);
    await page.getByRole('button', { name: /履歴/ }).click();
    await page.getByPlaceholder('名前を入力…').fill('テスト保存');
    await page.getByRole('button', { name: '保存', exact: true }).click();

    const savedEntry = page.locator('.ent', { hasText: 'テスト保存' });
    await expect(savedEntry).toBeVisible();
    await expect(savedEntry.locator('.erecipe')).toHaveText('とびはねるカレーうどん');
  });

  test('保存した履歴を読み込むと、別のカテゴリのレシピでも元に戻る', async ({ page }) => {
    await openApp(page);

    //サラダのレシピで保存
    await page.getByRole('button', { name: 'レシピ選択' }).click();
    await page.getByRole('button', { name: /サラダ/ }).click();
    await page.locator('.recipe-grid .recipe-card', { hasText: 'りんごさんヨーグルトサラダ' }).click();
    await page.getByRole('button', { name: /履歴/ }).click();
    await page.getByPlaceholder('名前を入力…').fill('サラダ保存');
    await page.getByRole('button', { name: '保存', exact: true }).click();
    await page.locator('.drw-backdrop').click({ position: { x: 5, y: 5 } });

    //カレーに切り替えてから読み込む
    await page.getByRole('button', { name: 'レシピ選択' }).click();
    await page.getByRole('button', { name: /カレー/ }).click();
    await page.locator('.recipe-grid .recipe-card').first().click();
    await expect(headerRecipeName(page)).not.toHaveText('りんごさんヨーグルトサラダ');

    await page.getByRole('button', { name: /履歴/ }).click();
    await page.locator('.ent', { hasText: 'サラダ保存' }).getByRole('button', { name: '読み込む' }).click();

    await expect(headerRecipeName(page)).toHaveText('りんごさんヨーグルトサラダ');
  });

  test('履歴の外側を押すと、履歴が閉じる', async ({ page }) => {
    await openApp(page);
    await page.getByRole('button', { name: /履歴/ }).click();
    await expect(page.locator('.drw-backdrop')).toBeVisible();

    await page.locator('.drw-backdrop').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('.drw-backdrop')).toHaveCount(0);
  });
});
