/************************************ 
 * ■ 週設定条件
 * 
 * 【概要】
 *  週の各曜日ごとの有効設定等を取りまとめるクラス
************************************/

import {DayOfWeekSetting} from "./DayOfWeekSettings";

export class WeekScheduleSetting{
    static WEEKDAY_DEFS = [
        { key: 'mon', displayStr: '月' },
        { key: 'tue', displayStr: '火' },
        { key: 'wed', displayStr: '水' },
        { key: 'thu', displayStr: '木' },
        { key: 'fri', displayStr: '金' },
        { key: 'sat', displayStr: '土' },
        { key: 'sun', displayStr: '日' },
    ];

    constructor() {
      this.startWeekOfDayKey = "mon"; //開始曜日のキー
      this.showWeekOfDayLabel = false; //レシピの結果に有効曜日を表示するか
      this.weekSchedule = WeekScheduleSetting.WEEKDAY_DEFS.map(
        defWeekOfDay => new DayOfWeekSetting(defWeekOfDay.key, defWeekOfDay.displayStr)
      );
    }

    get enabledMealSlots(){
      const startIdx = this.weekSchedule.findIndex(weekOfDay => weekOfDay.key === this.startWeekOfDayKey);
      const targetSchedule = this.weekSchedule.slice(startIdx);

      return targetSchedule.flatMap(tmpDayOfWeekSet => {
          return tmpDayOfWeekSet.mealSlots
            .filter(slot => slot.enabled)
            .map(slot => {
                return {dayOfWeek: tmpDayOfWeekSet.key, mealSlot: slot.key};
            });
      });
    }

    /**
     *  曜日有効設定をすべてリセットする(すべてON)
     * 
     */
    reset(){
        this.weekSchedule.forEach(dayOfWeek => { dayOfWeek.reset(); })
    }
}