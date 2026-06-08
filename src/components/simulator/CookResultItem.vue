<script setup>
  /****  コンポーネント取り込み ****/

  
  /****  Store ****/
  import { useSimulatorStore } from '../../stores/simulatorStore.js';
  const store = useSimulatorStore();

  defineProps({
      cook: Object, //各回の料理結果
      localIndex: Number //レベル内で何回目か
  });

  //TODO共通化
  const imgUrl = (path) => import.meta.env.BASE_URL + path.replace(/^\//, '')
</script>

<template>
    <div class="cook-item" :class="{ 'is-critical': cook.isCritical }">
        <div class="cook-header">
            <!-- 結果表示 -->
            <span class="cook-num">{{ localIndex }} 回目</span>
            <span class="energy" :class="{ 'is-critical-text': cook.isCritical }">
                {{ cook.finalEnergy.toLocaleString() }} エナジー
            </span> 

            <!-- 条件設定 -->
            <div class="cook-actions">
                <button @click.stop="store.openIngModal(cook.cookIndex)" class="action-btn">追加食材編集</button>
                <button @click.stop="store.toggleSunday(cook.cookIndex)"
                    :class="['action-btn', 'sunday-btn', { active: cook.isSunday }]">☀ 日曜</button>
                <button @click.stop="store.toggleCritical(cook.cookIndex)"
                    :class="['action-btn', 'critical-btn', { active: cook.isCritical }]">🍲 大成功</button>
                <span v-if="cook.isCritical" class="multiplier">
                    {{ cook.isSunday ? '×3' : '×2' }}
                </span>
            </div> <!-- 条件設定 -->
        </div>
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

</style>
