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



  /**
  * 保存されたSnapshotから曜日設定を復元する
  * @param {object} startWeekOfDayKey - configSnapshot形式のオブジェクト
  * @param {number} showWeekOfDayLabel - シミュレーション開始レベル
  * @param {number} weekSchedule - シミュレーション目標レベル
  * 
  */
  restoreSnapshot({ startWeekOfDayKey, showWeekOfDayLabel, weekSchedule, }) {
    this.startWeekOfDayKey = startWeekOfDayKey; 
    this.showWeekOfDayLabel = showWeekOfDayLabel; 
    
    weekSchedule.forEach(savedDay => {
      const targetDay = this.weekSchedule.find(day => day.key === savedDay.key);
      if (!targetDay) return;

      savedDay.mealSlots.forEach(savedSlot => {
        const targetSlot = targetDay.mealSlots.find(slot => slot.key === savedSlot.key);
        //ユーザが操作可能なもののみ書き戻し
        if (targetSlot) targetSlot.enabled = savedSlot.enabled;
      });
    });
  }

  /**
  *  保存用のスナップショットを作る(ユーザーが変更できる値だけを、本体と切り離して取り出す)
  */
  toSnapshotObjectForSaveData() {
    return {
      startWeekOfDayKey: this.startWeekOfDayKey,
      showWeekOfDayLabel: this.showWeekOfDayLabel,
      
      weekSchedule: this.weekSchedule.map(day => ({
          key: day.key,
          mealSlots: day.mealSlots.map(slot => ({ key: slot.key, enabled: slot.enabled })),
      })),
    };
  }

}