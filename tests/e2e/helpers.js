/************************************
 * ■ 画面テスト用の共通処理
 ************************************/

import { expect } from '@playwright/test';

// 直近のセッションを保存している localStorage のキー(src/config/storageConfig.js と同じ)
export const CURRENT_SESSION_KEY = 'tomaRecipeSimu:currentSession';

/**
 * ページを開き、計算結果が表示されるまで待つ
 * @param {import('@playwright/test').Page} page
 */
export const openApp = async (page) => {
  await page.goto('./');
  await expect(page.locator('.total-count')).toBeVisible();
};

/**
 * ページを開く前に、localStorage へ直近のセッションを入れておく(起動時の復元を試すため)
 * @param {import('@playwright/test').Page} page
 * @param {object} session - 保存データ(履歴の形)
 */
export const seedCurrentSession = async (page, session) => {
  await page.addInitScript(([key, value]) => {
    //addInitScript はページを開き直すたびに動くので、最初の1回だけ入れる
    if (!sessionStorage.getItem('__seeded')) {
      localStorage.setItem(key, value);
      sessionStorage.setItem('__seeded', '1');
    }
  }, [CURRENT_SESSION_KEY, JSON.stringify(session)]);
};

/**
 * localStorage に保存されている直近のセッションを読む
 * @param {import('@playwright/test').Page} page
 */
export const readCurrentSession = async (page) => {
  const json = await page.evaluate((key) => localStorage.getItem(key), CURRENT_SESSION_KEY);
  return json ? JSON.parse(json) : null;
};

/**
 * 古い形式(version 1：レシピ名だけを持つ)の直近セッションを作る
 * @param {string} recipeName - 保存されていたレシピ名
 */
export const oldFormatSession = (recipeName) => ({
  id: CURRENT_SESSION_KEY,
  configSnapshot: {
    startLevel: 20, endLevel: 30, fieldBonus: 1.35, eventBonus: 1.5, expForNextLv: 1000,
    selectedRecipeName: recipeName,
  },
  cookStatusRawMap: { 0: { isSunday: true, isCritical: true, extraIngredients: { honey: 3 } } },
  manualEnergyMap: {},
  savedAt: new Date('2026-09-01T12:00:00').toISOString(),
  version: 1,
});

// ヘッダーのレシピカードに出ている料理名
export const headerRecipeName = (page) => page.locator('.recipe-col .recipe-name');

// 合計調理回数の数字だけを取り出す
export const totalCookCount = async (page) =>
  Number((await page.locator('.total-count').innerText()).match(/\d+/)[0]);
