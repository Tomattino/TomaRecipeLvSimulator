<script setup>
  /****  コンポーネント取り込み ****/
  import CookResultItem from './CookResultItem.vue'; //1回分の料理シミュレーション結果

  defineProps({
    res: Object //レベルごとの結果
  });
</script>

<template>
    <!-- レベル内料理結果 -->
    <details class="level-block">
        <!-- レベル内料理小計・条件 -->
        <summary class="level-summary">
            <h3>
                Lv.{{ res.level }}
                <small>({{ res.count }}回作成 / 必要EXP: {{ res.requireExpForNext.toLocaleString() }})</small>
            </h3>
            <p>前レベルからの繰り越し: <span class="carry-over">{{ res.carryOver.toLocaleString() }}</span></p>
        </summary>

        <!-- 各回料理結果リスト -->
        <div class="cook-list">
            <CookResultItem
                v-for="(cook, index) in res.cooks"
                :key="cook.cookIndex"
                :cook="cook"
                :localIndex="index + 1"
            />
        </div> <!-- 各回料理結果リスト -->
    </details> <!-- レベル内料理結果 -->
</template>

<style scoped>
    .level-block {
        border: 1px solid rgba(100,160,255,0.2);
        padding: 15px;
        border-radius: 8px;
        background: rgba(255,255,255,0.05);
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        color: white;
    }
    .carry-over {
        color: #ffd966;
        font-weight: bold;
    }
</style>
