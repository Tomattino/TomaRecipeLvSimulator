<script setup>
  import { ref, computed } from 'vue'
  
  const isOpen = ref(true);  

  const props = defineProps({
    targetRecepie: Object, //作成予定食材
    totalDishCoutnt : Number, //料理作成総回数
    totalExtraIngredients: Object,  //追加食材群{ingredient, extra} の集計済みオブジェクト
  })

  const totalRequireIngredients = computed(() =>{
    const tmpTotalRequireIngredients = {};
    
    props.targetRecepie.requireIngredients.forEach(tmpIng => {
        const tmpIngName = tmpIng.ingredient.name;
        tmpTotalRequireIngredients[tmpIngName] ??= { ingredient: tmpIng.ingredient, num: tmpIng.num * props.totalDishCoutnt };
    });

    return tmpTotalRequireIngredients;
  });

  const totalIngredients  = computed(() =>{
    const totals = {};

    Object.values(totalRequireIngredients.value).forEach(({ingredient, num}) => {
        totals[ingredient.name] = { ingredient, required: num, extra: 0 };
    });

    Object.values(props.totalExtraIngredients).forEach(({ingredient, num}) => {
        totals[ingredient.name] ??= { ingredient, required: 0, extra: 0 };
        totals[ingredient.name].extra += num; 
    });

    return  Object.values(totals);
  });

  //TODO共通化
  const imgUrl = (path) => import.meta.env.BASE_URL + path.replace(/^\//, '')

</script>


<template>
  <div class="ing-panel">
    <div class="ing-header"  @click="isOpen = !isOpen">
      <span>合計食材数</span>
      <span class="chevron" :class="{ open: isOpen }">▼</span>
    </div>  
    <Transition name="slide">
      <table class="ing-table" v-show="isOpen">
        <tbody>
          <tr v-for="item in totalIngredients" :key="item.ingredient.name">
            <td><img :src="imgUrl(item.ingredient.img)" class="ing-img" /></td>
            <td class="ing-name">{{ item.ingredient.name }}</td>
            <td class="ing-total">{{ item.required + item.extra }}<span class="ing-unit">個</span></td>
            <td class="ing-detail">必須 {{ item.required }} / 追加 {{ item.extra }}</td>
          </tr>
        </tbody>
      </table>
    </Transition>  
  </div>
</template>


<style scoped>
  .ing-panel {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(100,160,255,0.2);
    border-radius: 12px;
    overflow: hidden;
    margin-top: 15px;
  }
  .ing-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 14px;
    font-size: 0.8em;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.08em;
    cursor: pointer;
    border-bottom: 1px solid rgba(100,160,255,0.15);
  }
  .ing-header:hover {
    background: rgba(255,255,255,0.04);
  }
  .ing-table {
    width: 100%;
    border-collapse: collapse;
  }
  .ing-table tr {
    border-bottom: 1px solid rgba(100,160,255,0.08);
  }
  .ing-table tr:last-child { border-bottom: none; }
  .ing-table td {
    padding: 6px 8px;
    vertical-align: middle;
  }
  .ing-img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    display: block;
  }
  .ing-name {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.7);
    width: 100%;
  }
  .ing-total {
    text-align: right;
    font-size: 0.9rem;
    font-weight: bold;
    white-space: nowrap;
  }
  .ing-unit {
    font-size: 0.7rem;
    color: rgba(255,255,255,0.7);
  }
  .ing-detail {
    font-size: 0.65rem;
    color: rgba(255,255,255,0.4);
    white-space: nowrap;
  }
  .chevron { transition: transform 0.2s; }
  .chevron.open { transform: rotate(180deg); }

  .slide-enter-active, .slide-leave-active { transition: opacity 0.2s; }
  .slide-enter-from, .slide-leave-to { opacity: 0; }


</style>