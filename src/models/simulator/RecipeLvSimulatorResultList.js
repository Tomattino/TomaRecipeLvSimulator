/************************************ 
 * ■ 料理シミュレーション結果ブロック
 * 
 * 【概要】
 *  シミュレーション結果全体を管理するクラス
 ************************************/
import { Dish } from '../common/Dish.js' //料理クラス
import { RecipeLvSimulatorConfig } from './RecipeLvSimulatorConfig.js' //レシピシミュレータ設定条件
import { LevelSimulationResult } from './LevelSimulationResult.js' //料理シミュレーションレベルブロック
import { Recipe } from '../common/Recipe.js' //レシピ情報
import { CookStatusMap } from './CookStatusMap.js' //個別シミュレーション条件


export class RecipeLvSimulatorResultList {
  /**
  * @param {RecipeLvSimulatorConfig} config　- シミュレータ設定
  * @param {Recipe} recipe - 作成するレシピ
  * @param {object[]} levelMaster - 料理レベル経験値テーブルマスタ
  * @param {CookStatusMap} cookStatusMap - 個別シミュレーション条件(レベル内各結果)
  * @param {object} manualEnergyMap - 手入力したエナジー
  */
  constructor({ config, recipe, levelMaster, cookStatusMap, manualEnergyMap }) {
    this.dishLevelsResults = this._simulateDishLevelsResults({ config, recipe, levelMaster, cookStatusMap, manualEnergyMap });
  }

  /**
  * @param {RecipeLvSimulatorConfig} config　- シミュレータ設定
  * @param {Recipe} recipe - 作成するレシピ
  * @param {object[]} levelMaster - 料理レベル経験値テーブルマスタ
  * @param {CookStatusMap} cookStatusMap - 個別シミュレーション条件(レベル内各結果)
  */  
  _simulateDishLevelsResults ({ config, recipe, levelMaster, cookStatusMap, manualEnergyMap }) {
    const results = []; //全シミュレーション結果

    let carryOver = config.initialExp; //初期取得済みEXP
    let cookIndexStart = 0; //個別シミュレーション条件紐づけ用キー初期化

    for (let lv = config.startLevel; lv < config.endLevel; lv++) {
      const levelData = levelMaster.find(m => m.level === lv);
      const nextLevelData = levelMaster.find(m => m.level === lv + 1);

      if (!levelData || !nextLevelData) continue;

      // レシピレベルボーナスはレベルごとに異なるのでレベルごとにDishを生成する
      const dish = new Dish(recipe, levelData.bonus, config.eventBonus, config.fieldBonus);


      const result = new LevelSimulationResult({
          dish,
          levelData: { level: lv, requireExp: nextLevelData.requireExp },
          carryOver,
          cookStatusMap,
          manualEnergyMap,
          cookIndexStart
      });

      results.push(result);

      carryOver = result.surplus; //次レベルに持ち越す余剰経験値
      cookIndexStart = result.nextCookIndex; //カウントアップされた次レベル用紐づけ用キー
    
    }
    
    return results;
  }

  /**
  *  シミュレーション総回数を取得
  * 
  */
  get totalCookCount() {
    return this.dishLevelsResults.reduce((sum, lv) => sum + lv.count, 0);
  }
}
