<script setup>
  import { computed } from 'vue'

  /****  コンポーネント取り込み ****/
  import RecipeSelectCard from './RecipeSelectCard.vue'; //レシピ選択用レシピ情報

  /****  Store ****/
  import { useSimulatorStore } from '../../stores/simulatorStore.js'
  const store = useSimulatorStore();

  const props = defineProps({
      modelValue: Boolean
  });
  
  const emit = defineEmits(['update:modelValue']);

  const sortedRecipes = computed(() =>
    Object.values(store.currentRecipes).sort((a, b) => b.baseStrength - a.baseStrength)
  );
  
  const handleSelect = (recipe) => {
    store.config.selectedRecipeName = recipe.name;
    emit('update:modelValue', false);
  }
</script>

<template>
  <div v-if="modelValue" class="modal-overlay" @click.self="emit('update:modelValue', false)">
    <div class="modal-dialog">
        <!-- ヘッダー -->
      <div class="modal-header">
        <span class="modal-title">レシピを選ぶ</span>
        <div class="modal-header-actions">          
          <button class="btn-close" @click="emit('update:modelValue', false)">×</button>
        </div>
      </div>
      <!-- 料理カテゴリ切替タブ -->
      <div class="modal-toolbar">
        <div class="category-tabs">
          <button :class="['tab', { active: store.selectedCategory === 'curry' }]"
              @click="store.selectedCategory = 'curry'">カレー🍛</button>
          <button :class="['tab', { active: store.selectedCategory === 'salad' }]"
              @click="store.selectedCategory = 'salad'">サラダ🥗</button>
          <button :class="['tab', { active: store.selectedCategory === 'dessert' }]"
              @click="store.selectedCategory = 'dessert'">デザート🍰</button>
        </div>
      </div>

      <!-- 選択対象レシピ表示 -->
      <div class="recipe-grid">
        <RecipeSelectCard 
          v-for="recipe in sortedRecipes" 
          :key="recipe.name"
          :recipe="recipe"
          :is-selected="store.config.selectedRecipeName === recipe.name"
          @select="handleSelect"
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
  .modal-title {
    font-size: 0.95em;
    font-weight: bold;
    color: rgba(255,255,255,0.9);
  }
  
  .category-tabs {
    display: flex;
    gap: 6px;
    margin-bottom: 12px;
  }
  
  .tab {
    flex: 1;
    padding: 5px;
    border: 1px solid rgba(100, 160, 255, 0.3);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    font-size: 0.85em;
  }
  
  .tab.active {
    background: rgba(100, 160, 255, 0.2);
    border-color: rgba(100, 160, 255, 0.6);
    color: white;
    font-weight: bold;
  }
  
  .recipe-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 8px;
    padding: 4px 0;
  }

</style>
