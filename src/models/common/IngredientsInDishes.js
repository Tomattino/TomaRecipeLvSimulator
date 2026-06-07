/************************************ 
 * ■ 食材数量クラス
 * 
 * 【概要】
 *  食材と必要食材数の情報を管理するクラス
 ************************************/

import { Ingredient } from "./Ingredient.js"; //食材クラス

export class IngredientsInDishes {
    /**
     * @param {Ingredient} ingredient  - 食材の情報
     * @param {number} num   - 料理に入る食材の数量
     */
    constructor(ingredient, num) {
        this.ingredient = ingredient;
        this.num = num;
    }
}
