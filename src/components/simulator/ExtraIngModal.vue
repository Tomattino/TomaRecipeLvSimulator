<script setup>
  /****  コンポーネント取り込み ****/
  import { pokesleepIngredients } from '../../data/ingredients/pokesleepIngredients.js' //食材マスタ
  import ExtraIngCard from './ExtraIngCard.vue'; //追加食材編集パネル
  

  /****  Store ****/
  import { useSimulatorStore } from '../../stores/simulatorStore.js'
  const store = useSimulatorStore()
  
  //■レシピで使用する必要食材の取得
  const getRequiredQty = (ingKey) => {
    const foundIngInRecipe = store.targetRecipe?.requireIngredients.find(
        i => i.ingredient === pokesleepIngredients[ingKey]
    );
    return foundIngInRecipe?.num ?? 0;
  }
</script>

<template>
  <!-- activeEditCookIndex が null でない = モーダル表示 -->
  <div v-if="store.activeEditCookIndex !== null" class="modal-overlay" @click.self="store.closeIngModal()">
    <div class="modal-dialog">

      <!-- ヘッダー -->
      <div class="modal-header">
        <span class="modal-title">追加食材を編集</span>
        <div class="modal-header-actions">
          <button class="btn-close" @click="store.closeIngModal()">×</button>
        </div>
      </div>
      
      <!-- ツール -->
      <div class="modal-toolbar">
        <button class="btn-reset" @click="store.clearExtraIngredients(store.activeEditCookIndex)">リセット</button>
      </div>

      <!-- 食材カード一覧 -->
      <div class="ingredient-grid">
        <ExtraIngCard
          v-for="(ing, ingKey) in pokesleepIngredients"
          :key="ingKey"
          :cook-index="store.activeEditCookIndex"
          :ing="ing"
          :ing-key="ingKey"
          :required-qty="getRequiredQty(ingKey)"
        />
      </div>

    </div>
  </div>
</template>

<style scoped>
  .modal-overlay {
    position: fixed;           /* 画面全体を覆う */
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.6);  /* 半透明の暗い背景 */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;              /* 他の要素より前面に */
  }
  .modal-dialog {
    background: #1e1e2e;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 10px;
    padding: 16px;
    width: 90%;
    max-width: 600px;
    max-height: 80vh;          /* 画面の8割まで */
    overflow-y: auto;          /* 縦にはみ出たらスクロール */
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .ingredient-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(76px, 1fr));
    gap: 4px;
    padding: 4px 0;
  }
  .modal-title {
    font-size: 0.95em;
    font-weight: bold;
    color: rgba(255,255,255,0.9);
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.15);
  }
  .modal-header-actions {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .modal-toolbar {
    margin-bottom: 10px;
    text-align: right;
  }
  .btn-reset {
    border: 1px solid rgba(255,152,0,0.5);
    background: rgba(255,152,0,0.1);
    color: rgba(255,152,0,0.9);
    padding: 5px 10px;
    font-size: 0.75em;
    margin-bottom: 10px;
  }
  .btn-reset:hover { background: rgba(255,152,0,0.25); }
  .btn-close {
    width: 24px; height: 24px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.7);
    font-size: 0.85em;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    padding: 0;
  }
  .btn-close:hover { background: rgba(255,255,255,0.15); }

</style>
