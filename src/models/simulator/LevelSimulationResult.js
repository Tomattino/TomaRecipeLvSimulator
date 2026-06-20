/************************************ 
 * ■ 料理シミュレーションレベルブロック
 * 
 * 【概要】
 *  レベルごとのシミュレーション結果を管理するクラス。
 *  コンストラクタ内でそのレベル内で必要な回数料理レコードを生成しつつ計算を行う
 ************************************/

import { CookRecord } from './CookRecord.js' //料理1回分の結果
import { Dish } from '../common/Dish.js' //料理クラス
import { pokesleepIngredients } from '../../data/ingredients/pokesleepIngredients.js' //食材マスタデータ
import { IngredientsInDishes } from '../common/IngredientsInDishes.js' //レシピと食材の紐づけクラス

export class LevelSimulationResult {
  /**
   * @param {Dish} dish - 料理インスタンス（レベルボーナス・フィールド・イベント込み）
   * @param {object} levelData - レベル情報(必要EXP含む)
   * @param {number} carryOver - 前のレベルからの繰り越しEXP
   * @param {object} cookStatusMap - 日曜/大成功/追加食材の設定
   * @param {object} manualEnergyMap - 手入力したエナジー
   * @param {number} cookIndexStart - レベル内の最初の条件紐づけキー
   */
  constructor({ dish, levelData, carryOver, cookStatusMap,manualEnergyMap, cookIndexStart }) {
    this.dish = dish;
    this.level = levelData.level
    this.requireExpForNext = levelData.requireExp
    this.cookStatusMap = cookStatusMap;
    this.manualEnergyMap  = manualEnergyMap;

    this.carryOver = carryOver;
    this.totalEnergyInThisLevel = this.carryOver;
    this.cookIndex = cookIndexStart;
    this.cooks = this._calcCooks ();
  }

  /**
  *  レベル内で必要な回数分の料理結果の計算
  * 
  */
  _calcCooks (){
    
    let tmpCooks = []; //レベル内料理結果

    while (this.totalEnergyInThisLevel  < this.requireExpForNext) {
      const status = this.cookStatusMap.getStatus(this.cookIndex); //紐づいている条件を取得
      const manualInputEnergy = this.manualEnergyMap?.[this.cookIndex];// 手入力の値(任意)
      
      //追加食材を取得する
      const extraIngArray = Object.entries(status.extraIngredients ?? {})
                          .filter(([, qty]) => qty > 0)
                          .map(([ingKey, qty]) => new IngredientsInDishes(pokesleepIngredients[ingKey], qty));
      
      //一回分の料理結果の作成
      const cook = new CookRecord({
          dish: this.dish,
          extraIngredients: extraIngArray,
          isSunday: status.isSunday,
          isCritical: status.isCritical,
          cookIndex: this.cookIndex,
          manualInputEnergy: manualInputEnergy

      });
      
      tmpCooks.push(cook);
      this.totalEnergyInThisLevel += cook.finalEnergy; //レベル内合計エナジーを取得
      this.cookIndex++;
    }
    
    return tmpCooks;
  }

  /**
  *  レベル内で必要な料理作成回数を取得
  *  ※計算は条件が変わるたびにこのクラス自体が再生成されるため最終結果のみが取得できる
  */  
  get count() { return this.cooks.length; }

  /**
  *  レベル内の必要経験値余剰分を算出
  *  ※計算は条件が変わるたびにこのクラス自体が再生成されるため最終結果のみが取得できる
  */  
  get surplus() { return this.totalEnergyInThisLevel - this.requireExpForNext; }
  
  /**
  *  レベル内でカウントアップした最終indexを取得
  *  ※計算は条件が変わるたびにこのクラス自体が再生成されるため最終結果のみが取得できる
  */  
  get nextCookIndex() { return this.cookIndex; }
}
