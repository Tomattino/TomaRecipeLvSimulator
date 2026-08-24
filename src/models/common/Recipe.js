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
   * @param {number} baseStrength - 基本エナジー
   */
  constructor(name, img, requireIngredients, baseStrength) {
    this.name = name; 
    this.img = img; 
    this.requireIngredients = requireIngredients; 
    this.baseStrength = baseStrength;
  }
  /**
   *  基本エナジーを計算
   *  cf.) レシピ基本エナジー = Round[ (レシピ食材の総エナジー)×(1+食材の数ボーナス) ]
   *  →実装中の懸念より変更 Floor[ (レシピ食材の総エナジー)×(1+食材の数ボーナス) ]
   *  →wikiのほうが正しいと判断しRoundに直す予定だったが食材の数ボーナスが合わない箇所があるため基本エナジーを直接持つこととした
   *   本メソッドは備忘録件、将来的に実装が必要になった場合を考慮し残すこととする
   */
  // _calcBaseStrength(){
  //   // レシピ食材の総エナジーを計算
  //   let totalIngredientStrength = 0;
  //   this.requireIngredients.forEach(tmpIngredient => {
  //       totalIngredientStrength += tmpIngredient.ingredient.strength * tmpIngredient.num;
  //   });
  //   return  Math.round(totalIngredientStrength * this.ingredientsNumBonus);
  // }
}
