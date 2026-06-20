/************************************ 
 * ■ 料理レコードクラス
 * 
 * 【概要】
 *  1回分の調理結果。
 *  isSunday・isCriticalなどの条件はコンストラクタ時点のスナップショットとして保持する。
 *  条件変更はCookStatusMapへの更新を経由し、resultsの再計算によって新しいインスタンスが生成される。
 *  そのため、このクラス自体に更新系のメソッドは持たない。
 ************************************/

import { Dish } from '../common/Dish.js' //料理クラス


export class CookRecord {
  /**
   * @param {Dish} dish - 料理インスタンス（レベルボーナス・フィールド・イベント込み）
   * @param {IngredientsInDishes[]} extraIngredients - 追加食材
   * @param {boolean} isSunday - 日曜日フラグ
   * @param {boolean} isCritical - 大成功フラグ
   * @param {number} cookIndex - 個別シミュレーション条件紐づけキー
   * @param {number} manualResult - 手入力の料理結果
   */
  constructor({ dish, extraIngredients = [], isSunday, isCritical, cookIndex , manualInputEnergy = undefined}) {
    this.dish = dish;
    this.extraIngredients = extraIngredients;
    this.isSunday = isSunday; 
    this.isCritical = isCritical;
    this.cookIndex = cookIndex;
    this.manualInputEnergy =  manualInputEnergy;
  }
  
  /**
  *  倍率を含めた最終エナジーを取得する
  * 
  */
  get finalEnergy() {
    return this.manualInputEnergy ?? this.dish.finalEnergy(this.extraIngredients, this.isSunday, this.isCritical);
  }

  

}
