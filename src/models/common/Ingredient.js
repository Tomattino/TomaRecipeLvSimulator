/************************************ 
 * ■ 食材クラス
 * 
 * 【概要】
 *  食材の情報を持つクラス
 ************************************/

export class Ingredient {
    /**
     * @param {string} name  - 食材の名前
     * @param {string} img   - 画像のパス
     * @param {number} strength - エナジー(整数)
     */
    constructor(name, img, strength) {
        this.name = name;
        this.img = img;
        this.strength = strength;
    }
}
