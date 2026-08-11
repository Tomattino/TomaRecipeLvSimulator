/************************************ 
 * ■ シミュレーション 直近セッション用履歴クラス
 * 
 * 【概要】
 *  直近のセッション、履歴取り込み前履歴用クラス
 * 
 ************************************/

import { BaseHistoryEntry } from './BaseHistoryEntry.js'

export class CurrentSession extends BaseHistoryEntry{
  /**
  *  履歴カード表示用の情報を作成する
  * 
  */
  toHistoryDisplayString(){
    return {
      historyName: "",
      recipeName: this.configSnapshot.selectedRecipeName,
      levelFrom: this.configSnapshot.startLevel,
      levelTo: this.configSnapshot.endLevel,
      fieldBonus: this.configSnapshot.fieldBonus,
      regDateTime: this.savedAt,
      actionBtnText: "読み込む",
    };
  }
}