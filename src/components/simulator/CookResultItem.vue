<script setup>
  /****  コンポーネント取り込み ****/
  import { pokesleepIngredients } from '../../data/ingredients/pokesleepIngredients.js' //食材マスタ
  import ExtraIngCard from './ExtraIngCard.vue'; //追加食材編集パネル
  
  /****  Store ****/
  import { useSimulatorStore } from '../../stores/simulatorStore.js';
  const store = useSimulatorStore();

  defineProps({
      cook: Object, //各回の料理結果
      localIndex: Number //レベル内で何回目か
  });
</script>

<template>
    <div class="cook-item" :class="{ 'is-critical': cook.isCritical }">
        <summary class="cook-header">
            <!-- 結果表示 -->
            <span class="cook-num">{{ localIndex }}回目</span>
            <span class="energy" :class="{ 'is-critical-text': cook.isCritical }">
                {{ cook.finalEnergy.toLocaleString() }} エナジー
            </span> 

            <!-- 条件設定 -->
            <div class="cook-actions">
                <button @click.stop="store.toggleSunday(cook.cookIndex)"
                    :class="['action-btn', 'sunday-btn', { active: cook.isSunday }]">☀ 日曜</button>
                <button @click.stop="store.toggleCritical(cook.cookIndex)"
                    :class="['action-btn', 'critical-btn', { active: cook.isCritical }]">🍲 大成功</button>
                <span v-if="cook.isCritical" class="multiplier">
                    {{ cook.isSunday ? '×3' : '×2' }}
                </span>
            </div> <!-- 条件設定 -->
        </summary>
        
        <!-- 追加食材設定 -->
        <div class="cook-body">
            <details class="extra-ing-panel">
                <summary>追加食材を編集する</summary>
                <!-- <div class="ingredient-grid"> -->
                    <!-- <div v-for="(ing, ingKey) in pokesleepIngredients" :key="ingKey" class="ing-card">
                        <div class="ing-name">{{ ing.name }}</div>
                        <div class="ing-controls">
                            <button class="btn-orange" @click="store.adjustExtraQty(cook.cookIndex, ingKey, -1)">-</button>
                            <input type="number"
                                :value="store.getExtraQty(cook.cookIndex, ingKey)"
                                @change="store.setExtraQty(cook.cookIndex, ingKey, Number($event.target.value))"
                                class="ing-input">
                            <button class="btn-orange" @click="store.adjustExtraQty(cook.cookIndex, ingKey, 1)">+</button>
                        </div>
                    </div> -->
                    <div class="ingredient-grid">
                      <ExtraIngCard
                        v-for="(ing, ingKey) in pokesleepIngredients"
                        :key="ingKey"
                        :cook-index="cook.cookIndex"
                        :ing="ing"
                        :ing-key="ingKey"
                      />
                  </div>
                <!-- </div> -->
            </details>
        </div> <!-- 追加食材設定 -->
    </div>
</template>

<style scoped>
    .cook-item {
        border-left: 4px solid #3498db;
        padding: 8px 12px;
        background: rgba(255,255,255,0.04);
        border-radius: 0 8px 8px 0;
    }
    .cook-item.is-critical {
        border-left-color: #f1c40f;
        background: rgba(241,196,15,0.05);
    }

    .cook-item > summary { cursor: pointer; }
    .cook-body { padding-top: 8px; }

    .cook-header {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .cook-num { font-size: 0.8em; color: rgba(255,255,255,0.5); white-space: nowrap; }
    .energy { font-variant-numeric: tabular-nums; font-size: 0.95em; }
    .is-critical-text { color: #f1c40f; font-weight: bold; }
    .multiplier { font-size: 0.9em; color: #f1c40f; font-weight: bold; }

    .cook-actions { display: flex; align-items: center; gap: 6px; }
    .action-btn {
        padding: 3px 10px;
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 6px;
        background: rgba(255,255,255,0.08);
        color: white;
        font-size: 0.82em;
        cursor: pointer;
        white-space: nowrap;
    }
    .sunday-btn.active  { background: #e67e22; border-color: #e67e22; }
    .critical-btn.active { background: rgba(241,196,15,0.3); border-color: #f1c40f; }

    .extra-ing-panel { margin-top: 8px; border-top: 1px dashed rgba(255,255,255,0.15); padding-top: 8px; }
    .ingredient-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(76px, 1fr)); gap: 4px; padding: 4px 0; }
</style>
