/************************************
 * ■ 画面テスト(Playwright)の設定
 *
 * 【概要】
 *  ブラウザを自動で動かして、画面の操作と表示を確かめるテストの設定
 *  実行：npm run test:e2e
 ************************************/

import { defineConfig, devices } from '@playwright/test';

// 開発サーバーのURL(vite.config.js の base に合わせる)
const BASE_URL = 'http://localhost:5173/TomaRecipeLvSimulator/';

export default defineConfig({
  testDir: './tests/e2e', //テストを置くフォルダ
  fullyParallel: true,    //テストを同時に動かして速くする
  forbidOnly: !!process.env.CI, //CIでは test.only の消し忘れをエラーにする
  retries: process.env.CI ? 1 : 0, //CIだけ、失敗したら1回やり直す(たまたまの失敗を減らす)

  //結果の出し方(画面に一覧を出す + HTMLの報告書を作る)
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: BASE_URL,
    screenshot: 'only-on-failure', //失敗した時だけ画面を撮る
    trace: 'retain-on-failure',    //失敗した時だけ、操作の記録を残す
  },

  //PCとスマホの2つの画面サイズで、同じテストを回す
  projects: [
    { name: 'PC', use: { ...devices['Desktop Chrome'] } },
    { name: 'スマホ', use: { ...devices['Pixel 7'] } },
  ],

  //テストの前に開発サーバーを立ち上げる(すでに起動していれば、それを使う)
  webServer: {
    command: 'npm run dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
