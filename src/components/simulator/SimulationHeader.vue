<script setup>
  import { ref } from 'vue'

  /****  コンポーネント取り込み ****/
  import NumberInputWithSlider from '../common/NumberInputWithSlider.vue'//数値入力スライダー
  import RecipeCard from '../recipe/RecipeCard.vue'//レシピ情報表示用カード
  import RecipeSelectModal from '../recipe/RecipeSelectModal.vue' //レシピ選択モーダル

  /****  Store ****/
  import { useSimulatorStore } from '../../stores/simulatorStore.js'
  const store = useSimulatorStore()
  

  const isModalOpen = ref(false); //食材選択モーダル表示制御
  
  // 余剰EXP再計算
  const onExpForNextLvInput = (e) => {
    store.setExpForNextLv(Number(e.target.value) || 0)
  }

</script>

<template>
  <div class="header-info">
    <h1 class="title">料理レベ上げシミュ<span class="tomato-icon" aria-hidden="true">（あるふぁ版）</span></h1>

    <!-- メインエリア：画像左 / 設定右 -->
    <div class="main-area">
      <!-- 左：レシピカード -->
      <div class="recipe-col">
        <RecipeCard v-if="store.targetRecipe" :recipe="store.targetRecipe" />
        <button class="select-btn"  @click="isModalOpen = true">レシピ選択</button>
      </div>
      <!-- 右：各種設定 -->
      <div class="settings-col">
        <!-- レベル設定 -->
        <div class="section">
          <p class="section-label">レベル設定</p>
          <div class="inputs-row">
            <div class="input-unit">
              <label>開始レベル</label>
              <NumberInputWithSlider v-model="store.config.startLevel" label="" unit="Lv"
                  :min="store.config.configMinLevel" :max="store.config.configMaxLevel" />
            </div>
            <div class="input-unit">
              <label>目標レベル</label>
              <NumberInputWithSlider v-model="store.config.endLevel" label="" unit="Lv"
                  :min="store.config.configMinLevel" :max="store.config.configMaxLevel" />
            </div>
            <div class="input-unit">
              <label>次のレベルまで</label>
              <input type="number" :value="store.config.expForNextLv" @input="onExpForNextLvInput($event)"
                  class="text-input">
              <small class="surplus">余剰EXP: {{ store.config.initialExp }}</small>
            </div>
          </div>
        </div>

        <!-- ボーナス設定 -->
        <div class="section">
            <p class="section-label">ボーナス設定</p>
            <div class="inputs-row">
              <div class="input-unit">
                <label>フィールドボーナス</label>
                <NumberInputWithSlider v-model="store.config.fieldBonus" label="" unit="%" :min="0"
                    :max="85" :step="5" :display-converter="(v) => Math.round((v - 1) * 100)"
                    :input-converter="(v) => (v / 100) + 1" />
              </div>
              <div class="input-unit">
                <label>イベントボーナス</label>
                <input type="number" v-model="store.config.eventBonus" step="0.1" min="1"
                    class="text-input">
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  <RecipeSelectModal v-model="isModalOpen" />
</template>

<style scoped>
.header-info {
    background: linear-gradient(160deg, #1a3a5c 0%, #0f2540 100%);
    color: white;
    padding: 16px;
    border-radius: 16px;
    margin-bottom: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(100, 160, 255, 0.2);
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.title {
    margin: 0;
    font-size: clamp(1rem, 3vw, 1.4rem);
    text-align: center;
    letter-spacing: 0.05em;
}

.tomato-icon::after {
    content: "🍅";
    margin-left: 6px;
}

/* メインエリア：横並び */
.main-area {
    display: flex;
    gap: 16px;
    align-items: stretch;
}

.recipe-col {
    flex-shrink: 0;
    width: 160px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.select-btn {
    width: 100%;
    padding: 7px;
    border-radius: 8px;
    border: 1px solid rgba(100, 160, 255, 0.4);
    background: rgba(100, 160, 255, 0.15);
    color: white;
    font-size: 0.85em;
    cursor: pointer;
    transition: background 0.15s;
}

.select-btn:hover {
    background: rgba(100, 160, 255, 0.3);
}

.settings-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
}

.section {
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(100, 160, 255, 0.2);
    border-radius: 12px;
    padding: 10px 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.section-label {
    margin: 0;
    font-size: 0.75em;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 0.05em;
}

.inputs-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 20px;
    align-items: flex-start;
}

.input-unit {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 120px;
    flex: 1;
}

.input-unit label {
    font-size: 0.8em;
    color: rgba(255, 255, 255, 0.7);
}

.text-input {
    width: 90px;
    padding: 5px 8px;
    border-radius: 6px;
    border: 1px solid rgba(100, 160, 255, 0.3);
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 0.95em;
}

.surplus {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.75em;
}

/* モバイル：縦積みに */
@media (max-width: 520px) {
    .main-area {
        flex-direction: column;
    }

    .recipe-col {
        width: 100%;
    }
}
</style>
