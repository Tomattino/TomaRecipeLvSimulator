/************************************ 
 * ■ 食事タイミングクラス
 * 【概要】
 *  1日のなかの食事のタイミングを管理するクラス
************************************/

export class MealSlot{
    /**
   * @param {String} key - 1日の中の料理作成タイミングを表す文字列
   * @param {String} icon - 表示用アイコン用文字列
   */
    constructor(key, icon) {
        this.key = key;
        this.icon = icon;
        this.enabled = true; //結果一覧で表示(料理をそのタイミングで作成するか)
    }

    /**
     *  表示するかを切り替える
     * 
     */
    toggle(){
        this.enabled = !this.enabled;
    }
}