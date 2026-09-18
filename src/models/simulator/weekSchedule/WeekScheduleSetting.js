/************************************ 
 * ■ 週設定条件
 * 
 * 【概要】
 *  週の各曜日ごとの有効設定等を取りまとめるクラス
************************************/

import {DayOfWeekSetting} from "./DayOfWeekSettings";

export class WeekScheduleSetting{
    static WEEKDAY_DEFS = [
        { key: 'mon', displayStr: '月', iconColor: '#e8e030' },
        { key: 'tue', displayStr: '火', iconColor: '#e05a3a'},
        { key: 'wed', displayStr: '水', iconColor: '#5ac8ee'},
        { key: 'thu', displayStr: '木', iconColor: '#7fc25a'},
        { key: 'fri', displayStr: '金', iconColor: '#d6a0e0'},
        { key: 'sat', displayStr: '土', iconColor: '#4a7fc2'},
        { key: 'sun', displayStr: '日', iconColor: '#c2971f'},
    ];

    constructor() {
      this.startWeekOfDayKey = "mon"; //開始曜日のキー
      this.showWeekOfDayLabel = false; //レシピの結果に有効曜日を表示するか
      this.weekSchedule = WeekScheduleSetting.WEEKDAY_DEFS.map(
        defWeekOfDay => new DayOfWeekSetting(defWeekOfDay.key, defWeekOfDay.displayStr, defWeekOfDay.iconColor)
      );
    }

    get enabledMealSlots(){
      const targetSchedule = this.weekSchedule.slice(this.startWeekDayIndex);

      return targetSchedule.flatMap(tmpDayOfWeekSet => {
          return tmpDayOfWeekSet.mealSlots
            .filter(slot => slot.enabled)
            .map(slot => {
                return {dayOfWeek: tmpDayOfWeekSet.key, mealSlot: slot.key};
            });
      });
    }
    
    get startWeekDayIndex() {
      return this.weekSchedule.findIndex(d => d.key === this.startWeekOfDayKey);
    }

    /**
     *  曜日有効設定をすべてリセットする(すべてON)
     * 
     */
    reset(){
        this.weekSchedule.forEach(dayOfWeek => { dayOfWeek.reset(); })
    }
}