/************************************ 
 * ■ 曜日設定条件
 * 
 * 【概要】
 *  曜日ごとの食事タイミングごとの表示/非表示など設定を持つ
************************************/

import { MealSlot } from "./MealSlot";

export class DayOfWeekSetting {
  /**
  * @param {String} key - 曜日識別用文字列
  * @param {String} displayStr - 曜日表示用文字列
  */
  constructor(key, displayStr){
    this.key = key;
    this.displayStr = displayStr;

    // 食事タイミングごとの設定を管理するオブジェクト群
    this.mealSlots = [
        new MealSlot("morning", "🌅"),
        new MealSlot("noon",  "🌞" ),
        new MealSlot("night", "🌙"), 
    ];
  }

  /**
  *  曜日自体の表示状態
  *  ※有効な食事タイミングが存在するかで表す(全部OFFなら曜日自体OFF, 1つでもONなら曜日はON)
  * 
  */
  get isContainEnabledSlot(){
    return this.mealSlots.some(slot => slot.enabled);
  }

  /**
  *  曜日全体の表示設定を切り替える
  * 
  */  
  toggleAllMealSlots(){
    const isEnabledDayOfWeek = this.isContainEnabledSlot;

    this.mealSlots.forEach(slot => { 
        slot.enabled = !isEnabledDayOfWeek;
    });
  }

  /**
  *  全てのタイミングの有効設定をTRUEにする
  * 
  */  
  reset(){
      this.mealSlots.forEach(slot => { 
          slot.enabled = true;
      });
  }
}