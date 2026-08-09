/************************************ 
 * ■ シミュレーション 履歴クラス
 * 
 * 【概要】
 *  直近のセッション、履歴取り込み前、登録済み結果 等で使用する
 *  必須データおよび共通機能がまとまったクラス
 * 
 ************************************/

export class BaseHistoryEntry {
    /**
   * @param {string} id - 一意のID
   * @param {string} recipeName - 選択されているレシピ名
   * @param {RecipeLvSimulatorConfig} configSnapshot - レシピ、レベル下限上限、フィールドボーナス、イベントボーナス
   * @param {boolean} cookStatusMap - 日曜日フラグ、大成功フラグ
   * @param {number[]} manualEnergyMap - 手入力エナジー
   * @param {date} savedAt - 保存日時
   */
  constructor({ id, recipeName, configSnapshot, cookStatusMap, manualEnergyMap , savedAt}) {
    this.id = id;
    this.recipeName = recipeName;
    this.configSnapshot = configSnapshot; 
    this.cookStatusMap = cookStatusMap;
    this.manualEnergyMap = manualEnergyMap;
    this.savedAt =  savedAt;
  }

  /**
  *  履歴カード表示用の情報を作成する
  * 
  */
  toHistoryDisplayString(){

  }

  /**
  *  オブジェクトを保存用Jsonに変換
  * 
  */
  toSaveDataJSON(){

  }

  /**
  *  Jsonデータから本クラスのオブジェクトへ変換
  * 
  *  @param {string} jsonData - 保存されていたデータ等	
  * 
  */
  static toObjectFromSaveDataJson(jsonData){
    //TODO

  }

}