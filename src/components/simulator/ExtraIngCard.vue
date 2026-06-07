<script setup>

  /****  Store ****/
  import { useSimulatorStore } from '../../stores/simulatorStore.js'
  const store = useSimulatorStore()

  defineProps({
    cookIndex: Number, //調理回のインデックス
    ing: Object,       //食材オブジェクト
    ingKey: String     //食材キー
  })
</script>

<template>
  <!-- 追加食材パネル -->
  <div class="ing-card">
    <img :src="ing.img" :alt="ing.name" class="ing-img">
    <div class="ing-name">{{ ing.name }}</div>
    <div class="ing-strength">エナジー：{{ ing.strength }}</div>
    <div class="ing-controls">
      <input type="number"
        min="0"
        :value="store.getExtraQty(cookIndex, ingKey)"
        @change="store.setExtraQty(cookIndex, ingKey, Number($event.target.value))"
        class="ing-input">
      <div class="ing-buttons">
        <button class="btn-orange" @click="store.adjustExtraQty(cookIndex, ingKey, -1)">-</button>
        <button class="btn-orange" @click="store.adjustExtraQty(cookIndex, ingKey, 1)">+</button>
      </div>
    </div>
  </div>
</template>

<style scoped>  
  .ing-img { width: 24px; height: 24px; object-fit: contain; }  /* 32px→24px */
  .ing-strength { font-size: 10px; color: rgba(255,255,255,0.5); margin-top: auto;}
  .ing-card { border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; padding: 4px 2px; text-align: center; background: rgba(255,255,255,0.06); display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .ing-name { font-size: 12px; font-weight: bold; line-height: 1.2; color: rgba(255,255,255,0.85); }
  .ing-controls { 
    display: flex; flex-direction: column; 
    align-items: stretch;  /* 子要素を横幅いっぱいに */
    gap: 2px; margin-top: auto; 
    width: 100%; padding: 0 2px; box-sizing: border-box;
  }
  .ing-buttons { display: flex; justify-content: space-between; }
  .btn-orange { 
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    background-color: #ff9800; color: white; border: none; 
    border-radius: 3px; height: 18px; cursor: pointer; 
    font-weight: bold; padding: 0; font-size: 0.85em; 
  }
  .ing-input { 
    width: 100%; box-sizing: border-box;
    text-align: center;  border: 1px solid rgba(255,255,255,0.3); 
    border-radius: 3px; background: rgba(255,255,255,0.1); 
    color: white; font-size: 0.8em; padding: 2px;  
  }
  .ing-input::-webkit-inner-spin-button,
  .ing-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
