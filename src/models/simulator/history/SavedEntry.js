/************************************ 
 * ■ シミュレーション 登録済み結果履歴用クラス
 * 
 * 【概要】
 *  登録済み結果履歴用クラス
 * 
 ************************************/

import { BaseHistoryEntry } from './BaseHistoryEntry.js'

export class SavedEntry extends BaseHistoryEntry{

  /**
  * @param {string} historyName - 登録結果名
  * @param {object} rest  - その他の項目は BaseHistoryEntry のコンストラクタ参照
  */
  constructor({ historyName, ...rest}) {
    super(rest); 
    this.historyName = historyName; 
  }

  /**
  *  履歴カード表示用の情報を作成する
  * 
  */
  toHistoryDisplayString(){
    return {
      historyName: this.historyName,
      recipeName: this.configSnapshot.selectedRecipeName,
      levelFrom: this.configSnapshot.startLevel,
      levelTo: this.configSnapshot.endLevel,
      fieldBonus: this.configSnapshot.fieldBonus,
      regDateTime: this.savedAt,
      actionBtnText: "読み込む",
    };
  }
}