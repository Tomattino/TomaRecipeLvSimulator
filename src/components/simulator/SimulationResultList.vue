<script setup>
  import { computed } from 'vue'

  /****  コンポーネント取り込み ****/  
  import LevelResultBlock from './LevelResultBlock.vue' //レベルごとの結果

  /****  Store ****/
  import { useSimulatorStore } from '../../stores/simulatorStore.js';
  const store = useSimulatorStore();
  
  const MEALS_PER_DAY = 3;//1日あたりの食事回数
  
  //レベルMAXまでに何日必要か
  const requireDays= computed(() => {
    return Math.floor((store.results?.totalCookCount ?? 0) / MEALS_PER_DAY); 
  });
  
  //レベルMAXまでに必要な日数からあふれた余剰回数
  const requireRemaingCnt = computed(() => {
    return Math.floor((store.results?.totalCookCount ?? 0) % MEALS_PER_DAY);
  });



</script>

<template>
    <div class="result-list">
        <!-- 全体合計 結果 -->
        <div class="total-banner">
            <div class="total-label">合計調理回数</div>
              <div class="total-count">
                {{ store.results?.totalCookCount ?? 0 }}<span class="total-unit">回</span>
              <div class="total-sub">
                ({{ requireDays }}日<template v-if="requireRemaingCnt > 0">+{{ requireRemaingCnt }}回</template>)
              </div>
            </div>
        </div>

        <!-- レベルごとの結果リスト -->
        <LevelResultBlock
            v-for="res in store.results?.dishLevelsResults "
            :key="res.level"
            :res="res"
        />
    </div>
</template>

<style scoped>
    .result-list {
        background: linear-gradient(160deg, #1a3a5c 0%, #0f2540 100%);
        border: 1px solid rgba(100,160,255,0.2);
        border-radius: 16px;
        padding: 16px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        display: flex;
        flex-direction: column;
        gap: 10px;
        color: white;
    }
    .total-banner {
        text-align: center;
        padding: 16px 0 20px;
        border-bottom: 1px solid rgba(100,160,255,0.2);
        margin-bottom: 8px;
    }
    .total-label {
        font-size: 0.8em;
        color: rgba(255,255,255,0.5);
        letter-spacing: 0.08em;
        margin-bottom: 4px;
    }
    .total-count {
        font-size: 3rem;
        font-weight: bold;
        color: white;
        line-height: 1;
    }
    .total-unit {
        font-size: 1.2rem;
        color: rgba(255,255,255,0.7);
        margin-left: 4px;
    }
    .total-sub {
      font-size: 0.8rem;
      color: rgba(255,255,255,0.5);
      margin-top: 6px;
      letter-spacing: 0.05em;
    }

</style>
