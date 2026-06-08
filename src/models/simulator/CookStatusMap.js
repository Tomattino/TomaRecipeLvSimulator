/************************************ 
 * ■ 個別シミュレーション条件保持用クラス
 * 
 * 【概要】
 *  個別シミュレーション結果にたいして設定条件を保持する
 *  条件設定が発生した場合にのみマップ内に条件を保持する
************************************/


export class CookStatusMap {
  /**	
  * 設定条件を格納するためのマップを用意	
  *  	
  **/
  constructor() {
      this._map = {};
  }

  /**	
  * 設定されている条件を取得する
  * 存在しなければデフォルト値を返却する
  * 
  * @param {number} cookIndex - 個別シミュレーション条件紐づけキー	
  * 
  **/
  getStatus(cookIndex) {
    return this._map[cookIndex] ?? {
      isSunday: false,
      isCritical: false,
      extraIngredients: {}
    };
  }


  /**	
  * 日曜日フラグを反転させる
  * 
  * @param {number} cookIndex - 個別シミュレーション条件紐づけキー	
  * 
  **/  
  toggleSunday(cookIndex) {
      const status = this.getStatus(cookIndex);
      this._map[cookIndex] = { ...status, isSunday: !status.isSunday };
  }


  /**	
  * 大成功フラグを反転させる
  * 
  * @param {number} cookIndex - 個別シミュレーション条件紐づけキー	
  * 
  **/  
  toggleCritical(cookIndex) {
      const status = this.getStatus(cookIndex);
      this._map[cookIndex] = { ...status, isCritical: !status.isCritical };
  }

  /**	
  * 追加食材を設定する
  * 
  * @param {number} cookIndex - 個別シミュレーション条件紐づけキー	
  * @param {string} ingKey - 食材キー
  * @param {number} qty - 食材個数
  * 
  **/    
  setExtraQty(cookIndex, ingKey, qty) {
      const status = this.getStatus(cookIndex);
      this._map[cookIndex] = {
          ...status,
          extraIngredients: { ...status.extraIngredients, [ingKey]: Math.max(qty,0) }
      };
  }

  /**	
  * 追加食材を増減させる
  * 
  * @param {number} cookIndex - 個別シミュレーション条件紐づけキー	
  * @param {string} ingKey - 食材キー
  * @param {number} delta - 食材個数増減値
  * 
  **/
  adjustExtraQty(cookIndex, ingKey, delta) {
      const current = this.getStatus(cookIndex).extraIngredients[ingKey] ?? 0;
      
      this.setExtraQty(cookIndex, ingKey, Math.max(0, current + delta));
  }

  /**	
  * 追加食材をすべてクリアする
  * 
  * @param {number} cookIndex - 個別シミュレーション条件紐づけキー	
  * 
  **/
  clearExtraIngredients(cookIndex){
    const status = this.getStatus(cookIndex);
    this._map[cookIndex] = {
      ...status,
      extraIngredients: {} //空にする
    };
  }
}