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
    calcStrength(addIngredients = []){

        //追加食材の総エナジーを算出
        let totalAddIngredientStrength = 0;
        addIngredients.forEach(tmpIngredient => {
            totalAddIngredientStrength += tmpIngredient.ingredient.strength * tmpIngredient.num; //個数 × エナジー
        });

        return  Math.floor((this.displayStrength + totalAddIngredientStrength) * this.fieldBonus * this.eventBonus);
    }

}
