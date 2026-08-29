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
    *  Jsonデータから本クラスのオブジェクトへ変換
    * 
    *  @param {string} jsonData - 保存されていたデータ等	
    * 
    */
    static toObjectFromSaveDataJson(jsonData){
      const baseSaveData = super.toObjectFromSaveDataJson(jsonData);
      if (!baseSaveData) return null;

      return new CurrentSession({ ...baseSaveData });
    
    }
}