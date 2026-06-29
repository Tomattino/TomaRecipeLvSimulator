/************************************ 
 * ■ レシピクラス
 * 
 * 【概要】
 *  レシピ情報を持つクラス
 ************************************/

import { IngredientsInDishes } from "./IngredientsInDishes.js"; //レシピと食材の紐づけクラス

export class Recipe {
  /**
   * @param {string} name  - レシピ名
   * @param {string} img   - 画像のパス
   * @param {IngredientsInDishes[]} requireIngredients - 必要食材数の配列
   * @param {number} ingredientsNumBonus - 食材の数ボーナス
   */
  constructor(name, img, requireIngredients, ingredientsNumBonus) {
    this.name = name; 
    this.img = img; 
    this.requireIngredients = requireIngredients; 
    this.ingredientsNumBonus = ingredientsNumBonus;
    this.baseStrength = this._calcBaseStrength();
  }
  /**
   *  基本エナジーを計算
   *  cf.) レシピ基本エナジー = Round[ (レシピ食材の総エナジー)×(1+食材の数ボーナス) ]→実装中の懸念より変更 Floor[ (レシピ食材の総エナジー)×(1+食材の数ボーナス) ]
   */
  _calcBaseStrength(){
    // レシピ食材の総エナジーを計算
    let totalIngredientStrength = 0;
    this.requireIngredients.forEach(tmpIngredient => {
        totalIngredientStrength += tmpIngredient.ingredient.strength * tmpIngredient.num;
    });
    return  Math.floor(totalIngredientStrength * this.ingredientsNumBonus);
  }
}
