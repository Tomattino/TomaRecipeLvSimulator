/************************************ 
 * ■ レベル範囲クラス
 * 
 * 【概要】
 *  レベルの範囲を管理するクラス
 ************************************/

export class LevelRange {
  /**
  * @param {number} minNum - レベルの最小値
  * @param {number} maxNum - レベルの最大値
  */
  constructor(minNum, maxNum) {
    this._isValid = false;
    
    if(this._validateLevelRange(minNum, maxNum)) this._isValid = true;
    
    this._minNum = minNum;
    this._maxNum = maxNum;
  }

  
  // minNum(レベル範囲下限値) ─────────────────
  /**
   * レベル下限値を設定
   * @param {number} val - 下限値に設定対象のレベル数値
   * 
  **/
  set minNum(val) {
    this._minNum = Math.min(val, this._maxNum - 1); // maxNumを超えないようにクランプ
    this._isValid = this._validateLevelRange(this._minNum, this._maxNum);
  }
  get minNum() { return this._minNum; }

  // maxNum(レベル範囲上限値) ─────────────────
  /**
   * レベル上限値を設定
   * @param {number} val - 上限値に設定対象のレベル数値
   * 
  **/
  set maxNum(val) {
    this._maxNum = Math.max(val, this._minNum + 1); // minNumを下回らないようにクランプ
    this._isValid = this._validateLevelRange(this._minNum, this._maxNum);
  }
  get maxNum() { return this._maxNum; }

  
  // バリデーション ─────────────────
  /**
  * エラー有無を確認結果を返却
  * 　true  … 問題なし
  *   false … 異常値あり
  * 
  **/
  get isValid() { return this._isValid; }

  /**
  * レベル範囲に設定する下限値、上限値に問題がないか確認
  * 
  * @param {number} minNum - レベルの最小値
  * @param {number} maxNum - レベルの最大値
  */
  _validateLevelRange(minNum, maxNum) {
    if (typeof minNum !== 'number' || typeof maxNum !== 'number') return false; //数値チェック
    if(minNum >= maxNum) return false; //上限値が下限値を下回っていないかを確認

    return true;
  }

  /**
  * 設定レベルが下限～上限の範囲内か確認
  * 
  * @param {number} targetLv - 確認対象のレベル
  */
  levelIsInRange(targetLv) {
    return targetLv >= this._minNum && targetLv <= this._maxNum;
  }
}
