<script setup>
  import { computed } from 'vue';

  const props = defineProps({
      recipe: Object //対象レシピ
  });

  const totalIngredients = computed(() =>
      props.recipe.requireIngredients.reduce((sum, ing) => sum + ing.num, 0)
  );
  
  //TODO共通化
  const imgUrl = (path) => import.meta.env.BASE_URL + path.replace(/^\//, '')
</script>

<template>
  <!-- レシピ情報 -->
  <div class="recipe-card">
    <!-- メイン画像 -->
    <img :src="imgUrl(recipe.img)" :alt="recipe.name" class="recipe-img">
    <p class="recipe-name">{{ recipe.name }}</p>
    
    <!-- 基本情報 -->
    <p class="base-energy">
      基本エナジー
      <span class="energy-value">{{ recipe.baseStrength }}</span>
    </p>

    <!-- 必要食材 -->
    <div class="ingredients">
      <div
          v-for="ing in recipe.requireIngredients"
          :key="ing.ingredient.name"
          class="ingredient-item"
      >
          <img :src="imgUrl(ing.ingredient.img)" :alt="ing.ingredient.name" class="ing-img">
          <span class="ing-count">×{{ ing.num }}</span>
      </div>
    </div> <!-- 必要食材 -->

    <!-- 必要食材統計 -->
    <p class="total-ing">食材合計:  {{ totalIngredients }}</p>
  
  </div> <!-- レシピ情報 -->
</template>

<style scoped>
    .recipe-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 12px;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 12px;
        border: 1px solid rgba(100, 160, 255, 0.2);
        color: white;
        text-align: center;
        height: 100%;
        box-sizing: border-box;
    }

    .recipe-img {
        width: 120px;
        height: 120px;
        object-fit: contain;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        padding: 8px;
        border: 2px solid rgba(100, 160, 255, 0.3);
    }

    .recipe-name {
        margin: 0;
        font-size: 0.95em;
        font-weight: bold;
    }

    .base-energy {
        margin: 0;
        font-size: 0.8em;
        color: rgba(255, 255, 255, 0.7);
        display: flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
    }

    .ingredients {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 6px;
        margin-top: 4px;
        width: 100%;
    }

    .energy-value {
        font-size: 1.2em;
        font-weight: bold;
        color: #ffd966;
        text-shadow: 0 0 8px rgba(255, 217, 102, 0.5);
    }

    .ingredient-item {
        display: flex;
        align-items: center;
        gap: 2px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 20px;
        padding: 3px 8px 3px 3px;
    }

    .ing-img {
        width: 18px;
        height: 18px;
        object-fit: contain;
    }

    .ing-count {
        font-size: 0.8em;
        color: rgba(255, 255, 255, 0.9);
    }
</style>
