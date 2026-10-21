/************************************
 * ■ 起動と、前回の状態の復元
 ************************************/

import { test, expect } from '@playwright/test';
import { openApp, seedCurrentSession, readCurrentSession, oldFormatSession, headerRecipeName, totalCookCount } from './helpers.js';

test.describe('起動と復元', () => {

  test('はじめて開くと、カレーの先頭のレシピで計算結果が出る', async ({ page }) => {
    await openApp(page);

    await expect(page).toHaveTitle(/ポケスリ料理Lvシミュレーター/);
    await expect(headerRecipeName(page)).toHaveText('とびはねるカレーうどん');
    expect(await totalCookCount(page)).toBeGreaterThan(0);
  });

  test('古い形式(レシピ名だけ)の履歴で起動すると、前回のレシピと設定に戻る', async ({ page }) => {
    await seedCurrentSession(page, oldFormatSession('りんごさんヨーグルトサラダ'));
    await openApp(page);

    await expect(headerRecipeName(page)).toHaveText('りんごさんヨーグルトサラダ');
    //開始レベル・目標レベル(数値入力の1つ目と2つ目)
    await expect(page.locator('.number-input').nth(0)).toHaveValue('20');
    await expect(page.locator('.number-input').nth(1)).toHaveValue('30');
    //大成功を付けていた1回目が、大成功の表示になっている
    await expect(page.locator('.cook-item').first()).toHaveClass(/is-critical/);
  });

  test('保存される履歴は新しい形式(バージョン2・レシピのキー付き)になる', async ({ page }) => {
    await seedCurrentSession(page, oldFormatSession('りんごさんヨーグルトサラダ'));
    await openApp(page);

    //何か操作して自動保存を動かす(1回目の日曜を外す)
    await page.locator('.cook-item').first().getByRole('button', { name: '☀ 日曜' }).click();

    await expect.poll(async () => (await readCurrentSession(page))?.version).toBe(2);
    const saved = await readCurrentSession(page);
    expect(saved.configSnapshot.selectedRecipeKey).toBe('appleAcidYogurtDressedSalad');
    expect(saved.configSnapshot.selectedRecipeName).toBe('りんごさんヨーグルトサラダ');
  });

  test('ページを開き直すと、直前に選んでいたレシピに戻る', async ({ page }) => {
    await openApp(page);
    await page.getByRole('button', { name: 'レシピ選択' }).click();
    await page.getByRole('button', { name: /デザート/ }).click();
    const firstDessert = page.locator('.recipe-grid .recipe-card').first();
    const dessertName = await firstDessert.locator('.recipe-name').innerText();
    await firstDessert.click();
    await expect(headerRecipeName(page)).toHaveText(dessertName);

    //自動保存(0.5秒待ってから保存)が終わるのを待ってから開き直す
    await expect.poll(async () => (await readCurrentSession(page))?.configSnapshot.selectedRecipeName).toBe(dessertName);
    await page.reload();

    await expect(headerRecipeName(page)).toHaveText(dessertName);
  });
});
