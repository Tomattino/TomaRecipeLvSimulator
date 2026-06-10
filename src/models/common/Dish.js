/************************************ 
 * ■ 料理クラス
 * 
 * 【概要】
 *  ボーナスを適用した料理情報を持つクラス
 ************************************/

import { Recipe } from "./Recipe.js"; //レシピ情報
import { IngredientsInDishes } from './IngredientsInDishes.js'  //レシピと食材の紐づけクラス


export class Dish {
  /**
   * @param {Recipe} recipeInfo  - レシピ情報
   * @param {number} recipeLevelBonus - レシピレベルボーナス
   * @param {number} eventBonus - イベントボーナス
   * @param {number} fieldBonus - フィールドボーナス
   */
  constructor(recipeInfo, recipeLevelBonus,eventBonus, fieldBonus) {
    this.baseStrength = recipeInfo.baseStrength; //基本エナジー
    this.recipeLevelBonus  = recipeLevelBonus;
    this.eventBonus = eventBonus;
    this.fieldBonus = fieldBonus;
    this.displayStrength = this._calcDisplayStrength();
  }
  /**
   *  表示エナジーを取得
   *  cf.) レシピ画面の表示エナジー = (レシピ基本エナジー)+(レシピレベルボーナス分)
   */
  _calcDisplayStrength(){
    const recipeBonusStrength = Math.round(this.baseStrength * this.recipeLevelBonus); //レシピレベルボーナス分
    return  this.baseStrength + recipeBonusStrength;
  }
  /**
   *  最終エナジーを取得
   *  cf.) 最終エナジー = (レシピ画面の表示エナジー + 追加食材の総エナジー)×(フィールドボーナス)×(イベントボーナス)
   *
   *  @param {IngredientsInDishes[]} addIngredients - 追加食材の配列
   * 
   */
  _calcStrength(addIngredients = []){
    //追加食材の総エナジーを算出
    let totalAddIngredientStrength = 0;
    addIngredients.forEach(tmpIngredient => {
        totalAddIngredientStrength += tmpIngredient.ingredient.strength * tmpIngredient.num; //個数 × エナジー
    });
    return  (this.displayStrength + totalAddIngredientStrength) * this.fieldBonus * this.eventBonus;
  }

  /**
  *  倍率を含めた最終エナジーを取得する
  *  @param {IngredientsInDishes[]} addIngredients - 追加食材の配列
  *  @param {boolean} isSunday - 日曜日フラグ
  *  @param {boolean} isCritical - 大成功フラグ
  */
  finalEnergy(extraIngredients = [], isSunday, isCritical) {
    return Math.floor(this._calcStrength(extraIngredients) * this._multiplier(isSunday, isCritical));
  }

  /**
  *  倍率を取得する
  *  [通常の場合]
  *   - ×1
  *  [大成功の場合]
  *   - 日曜日：×3
  *   - それ以外：×2
  *  
  */
  _multiplier(isSunday, isCritical) {
    if (isCritical) return isSunday ? 3 : 2;
    return 1
  }
}
