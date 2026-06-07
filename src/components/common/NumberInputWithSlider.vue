<script setup>
  /* v-model で渡された値が modelValue、変更時は update:modelValue を emit すると親に伝わります */
  const props = defineProps({
    modelValue: { type: Number, required: true }, //数値
    label: { type: String, default: '数値' }, //見出しラベル
    min: { type: Number, default: 0 }, //最小値
    max: { type: Number, default: 100 }, //最大値
    step: { type: Number, default: 1 }, //カウントアップ数
    unit: { type: String, default: '' },  // "Lv" や "%" など表示用（文字列） 
    errClass: { type: String, default: '' },
    displayConverter: { type: Function, default: (val) => val }, //数値を表示用に変換する場合のFunction
    inputConverter: { type: Function, default: (val) => val } //入力値を変換する場合のFunction
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  //変更した値を変換して返却(テキストボックス、レンジの値変更で発火)
  const handleInput = (e) => {
    const val = Number(e.target.value);
    emit('update:modelValue', props.inputConverter(val));
  };

</script>

<template>
  <div class="common-slider-unit">
    <div class="label-row">
      <label>{{ label }}</label>
      <div class="input-with-unit">
        <input 
          type="number" 
          class="number-input"
          :value="displayConverter(modelValue)" 
          @input="handleInput"
          :min="min" 
          :max="max"
          :step="step"
        >
        <span v-if="unit" class="unit">{{ unit }}</span>
      </div>
    </div>
    
    <input 
      type="range" 
      :value="displayConverter(modelValue)" 
      @input="handleInput"
      :min="min" 
      :max="max"
      :step="step" 
      class="slider"
    >
  </div>
</template>

<style scoped>
    .common-slider-unit {
      margin-bottom: 15px;
      background: rgba(255, 255, 255, 0.05);
      padding: 10px;
      border-radius: 8px;
    }
    .slider {
      width: 100%;
      cursor: pointer;
    }
    .label-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }
    
    .input-with-unit {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .number-input {
        width: 60px;
        padding: 4px;
        border-radius: 4px;
        border: 1px solid #ccc;
        text-align: right;
    }

    .unit {
        font-size: 0.75em;
        color: rgba(255,255,255,0.6);
    }

</style>