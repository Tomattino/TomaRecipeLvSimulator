/************************************ 
 * ■ シミュレーション 履歴クラス
 * 
 * 【概要】
 *  直近のセッション、履歴取り込み前、登録済み結果 等で使用する
 *  必須データおよび共通機能がまとまったクラス
 * 
 ************************************/

import { appConfig } from '../../../config/appConfig.js'

export class BaseHistoryEntry {
    /**
   * @param {string} id - 一意のID
   * @param {RecipeLvSimulatorConfig} configSnapshot - レシピ、レベル下限上限、フィールドボーナス、イベントボーナス
   * @param {object} cookStatusRawMap - 日曜日フラグ、大成功フラグ(※mapプロパティのみ)
   * @param {number[]} manualEnergyMap - 手入力エナジー
   * @param {Date} savedAt - 保存日時
   * @param {number} version - 履歴機能バージョン(保存時)
   */
  constructor({ id, configSnapshot, cookStatusRawMap, manualEnergyMap , savedAt, version}) {
    this.id = id;
    this.configSnapshot = configSnapshot; 
    this.cookStatusRawMap = cookStatusRawMap;
    this.manualEnergyMap = manualEnergyMap;
    this.savedAt =  savedAt;
    this.version = version;
  }

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
      fieldBonus: Math.round((this.configSnapshot.fieldBonus - 1) * 100),
      eventBonus: this.configSnapshot.eventBonus,
      expForNextLv: this.configSnapshot.expForNextLv,
      regDateTime:  this.savedAt.toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      actionBtnText: "読み込む",
    };
  }

  /**
  *  オブジェクトを保存用Jsonに変換
  * 
  */
  toSaveDataJSON(){
    return JSON.stringify({...this, version: appConfig.historyStorage.version});
  }

  /**
  *  Jsonデータから本クラスのオブジェクトへ変換
  * 
  *  @param {string} jsonData - 保存されていたデータ等	
  * 
  */
  static toObjectFromSaveDataJson(jsonData){
    let tmpJsonHistoryEntry;
    try {
      tmpJsonHistoryEntry = JSON.parse(jsonData);
    } catch {
      return null; 
    }

    if(!appConfig.historyStorage.supportedVersions.includes(tmpJsonHistoryEntry.version)){
      return null;
    }

    return new BaseHistoryEntry({
      id: tmpJsonHistoryEntry.id, 
      recipeName:tmpJsonHistoryEntry.recipeName, 
      configSnapshot: tmpJsonHistoryEntry.configSnapshot, 
      cookStatusRawMap: tmpJsonHistoryEntry.cookStatusRawMap, 
      manualEnergyMap: tmpJsonHistoryEntry.manualEnergyMap, 
      savedAt: new Date(tmpJsonHistoryEntry.savedAt),
      version: tmpJsonHistoryEntry.version, 
    });
  }

}