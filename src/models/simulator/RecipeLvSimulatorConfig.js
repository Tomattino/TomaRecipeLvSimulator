/************************************ 
 * ■ レシピシミュレータ設定条件
 * 
 * 【概要】
 * レシピシミュレーターの全体のシミュレーションに使用する値を取りまとめるクラス
 * 下記設定値を取り扱う
************************************/

import { LevelRange } from "../value/LevelRange.js"; //レベル範囲格納用クラス


export class RecipeLvSimulatorConfig {
  /**
   * @param {object[]} recipeLvMaster - 料理レベルマスタ
   */
  constructor(recipeLvMaster) {
    //■マスタデータ
    this.recipeLvMaster = recipeLvMaster; //設定取得可能範囲のレベル範囲(_levelRange)も本メソッドで同期

    //■レベル範囲設定
    this._selectLvRange = new LevelRange(this._levelRange.minNum, this._levelRange.maxNum)//設定可能範囲の最小値と最大値から選択しているレベル範囲の初期値を設定
    const nextLevelData = this._recipeLvMaster.find(m => m.level === this._selectLvRange.minNum + 1) //必要経験値はマスタ上の次のレベルのオブジェクトから取得する必要がある(そのレベルになるのに必要な経験値が格納されているため)
    this._expForNextLv = nextLevelData?.requireExp ?? 0; //次のレベルまでに必要な経験値
    this._initialExp = 0; //余剰(取得済み)EXP

    //■レシピ関係設定
    this.selectedRecipeName = ''; //選択レシピ名称
    
    //■倍率関係
    this.fieldBonus = 1.0; //フィールドボーナス(直接呼出し)
    this.eventBonus = 1.0; //イベントボーナス(直接呼出し)
  }


  //** 料理レベルマスタの設定およびレベル範囲の初期値同期 **//
  // 料理LevelMaster ─────────────────
  /**
  * @param {object[]} newRecipeLvMaster - 料理レベルマスタ
  */
  set recipeLvMaster(newRecipeLvMaster) {    
    const tmpLevelRange = this._buildInitLevelRange(newRecipeLvMaster);
    
    //TODO: エラー処理
    if(!tmpLevelRange.isValid) {
      return;//throw new RecipeLvMasterError('レベル範囲が不正');
    }

    this._recipeLvMaster = newRecipeLvMaster;
    this._levelRange = tmpLevelRange;
  }


  //** シミュレーションレベル範囲の設定 **//  
  // レベル範囲 ─────────────────
  /**
  * @param {object[]} recipeLvMaster - 料理レベルマスタ
  */
  _buildInitLevelRange(recipeLvMaster){
    //マスタ上のレベル最小値と最大値を設定
    const minNum = Math.min(...recipeLvMaster.map(item => item.level));
    const maxNum = Math.max(...recipeLvMaster.map(item => item.level));

    return new LevelRange(minNum, maxNum);
  }

  get configMinLevel() { return this._levelRange.minNum; } // 設定可能範囲最小値
  get configMaxLevel() { return this._levelRange.maxNum; } // 設定可能範囲最大値



  //** シミュレーション 設定レベル **//
  // startLevel(現在のレベル) ─────────────────
  /**
  * @param {number} startLevel - シミュレーション開始レベル
  */
  set startLevel(startLevel){
    if (!this._levelRange.levelIsInRange(startLevel)) return;
    this._selectLvRange.minNum = startLevel;

    const nextLevelData = this._recipeLvMaster.find(m => m.level === this.startLevel + 1)
    if (nextLevelData) this.expForNextLv  = nextLevelData.requireExp;
    
  }

  get startLevel() { return this._selectLvRange.minNum; }

  // endLevel(目標レベル) ───────────────────
  /**
  * @param {number} endLevel - シミュレーション目標レベル
  */
  set endLevel(endLevel){
    if(!this._levelRange.levelIsInRange(endLevel)) return;

    this._selectLvRange.maxNum = endLevel;
  }

  get endLevel() { return this._selectLvRange.maxNum; }



  //** 経験値関係 **/
  // expForNextLv(必要経験値) ───────────────────
  /**
  * @param {number} expForNextLv - 必要経験値
  */
  set expForNextLv(expForNextLv) {
      this._expForNextLv = expForNextLv;
      this.calculateSurplusFromNext();
  }
  get expForNextLv() { return this._expForNextLv; }

  // initialExp(余剰経験値) ───────────────────
  get initialExp() { return this._initialExp; } //余剰経験値(取得済み経験値)

  /**
   * 余剰EXP（initialExp）を再計算する
   * expForNextLv setter から自動で呼ばれる
  */
  calculateSurplusFromNext() {
    const nextLevelData = this._recipeLvMaster.find(m => m.level === this.startLevel + 1);
    if (nextLevelData) {
        this._initialExp = Math.max(0, nextLevelData.requireExp - this.expForNextLv);
    }
  }
  

  //TODO:下記の整備、要否判断
  get hasError() {
    return !this._selectLvRange.isValid;
  }

  // TODO: フィールドボーナスをパーセント表記で返すgetterを実装する(1.05 みたいな倍率をパーセント表記にする便利メソッドとか)
}
