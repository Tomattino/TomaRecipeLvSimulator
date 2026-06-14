<script setup>
  const props = defineProps({
      recipe: Object, //対象レシピ
      isSelected: Boolean
  });
  const emit = defineEmits(['select']);
  const handleSelect  = () => {
    emit('select', props.recipe);
  };
  
  //TODO共通化
  const imgUrl = (path) => import.meta.env.BASE_URL + path.replace(/^\//, '')
</script>

<template>
  <!-- レシピ情報 -->
  <div class="recipe-card" :class="{ selected: isSelected }" @click="handleSelect">
    <!-- メイン画像 -->
    <img :src="imgUrl(recipe.img)" :alt="recipe.name" class="recipe-img">
    <p class="recipe-name">{{ recipe.name }}</p>
    
    <!-- 基本情報 -->
    <p class="base-energy">
      基本エナジー
      <span class="energy-value">{{ recipe.baseStrength }}</span>
    </p>

  </div> <!-- レシピ情報 -->
</template>

<style scoped>
  .recipe-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 8px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    border: 2px solid rgba(100, 160, 255, 0.2);
    color: white;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
  }
  
  .recipe-card:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(100, 160, 255, 0.5);
  }
  
  .recipe-card.selected {
      border-color: #ffd966;
      background: rgba(255, 217, 102, 0.1);
  }
  
  .recipe-img {
      width: 72px;
      height: 72px;
      object-fit: contain;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      padding: 6px;
  }
  
  .recipe-name {
      margin: 0;
      font-size: 0.8em;
      font-weight: bold;
      line-height: 1.3;
  }
  
  .base-energy {
      margin-top: auto; 
      margin-bottom: 0;
      font-size: 0.7em;
      color: rgba(255, 255, 255, 0.7);
      display: flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
  }
  
  .energy-value {
      font-size: 1.1em;
      font-weight: bold;
      color: #ffd966;
      text-shadow: 0 0 8px rgba(255, 217, 102, 0.5);
  }

</style>
