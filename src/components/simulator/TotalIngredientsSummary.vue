<script setup>
  import { ref, computed } from 'vue'
  
  const isOpen = ref(true);  

  const props = defineProps({
    targetRecepie: Object, //作成レシピ情報
    cooksResult: Array,    //各回の結果オブジェクト
    showWeek: Boolean,      //設定曜日分を表示するか
    weekCooksCount: Number,  //設定曜日分の料理作成回数
  })

  //■渡された回で使う食材を、食材ごとに集計する(キーは食材名)
  const sumIngredients = (cooks) => {
    const totals = {};

    props.targetRecepie.requireIngredients.forEach(({ingredient, num}) => {
        totals[ingredient.name] = { ingredient, required: num * cooks.length, extra: 0 };
    });

    cooks.flatMap(cook => cook.extraIngredients).forEach(({ingredient, num}) => {
        totals[ingredient.name] ??= { ingredient, required: 0, extra: 0 };
        totals[ingredient.name].extra += num; 
    });

    return  totals;
  };
  
  //■設定曜日分の回(先頭から切り出す。回が足りない時は、あるだけになる)
  const weekCooks = computed(() => { 
    const weekCooksCount  = Math.min(props.weekCooksCount, props.cooksResult.length)
    return props.cooksResult.slice(0, weekCooksCount );
  });

  //■表に出す行(全体の集計に、設定曜日分の数字を足したもの)
  const totalIngredients = computed(() => {
    const allTotals  = sumIngredients(props.cooksResult);
    const weekTotals = sumIngredients(weekCooks.value);//設定曜日分は全体の一部なので、設定曜日分にしか無い食材は無い(全体の行を回せば足りる)


    return Object.values(allTotals).map(item => ({
      ...item,
      weekRequired: weekTotals[item.ingredient.name]?.required ?? 0,
      weekExtra:    weekTotals[item.ingredient.name]?.extra ?? 0,
    }));
  });
  //TODO共通化
  const imgUrl = (path) => import.meta.env.BASE_URL + path.replace(/^\//, '')

</script>


<template>
  <div class="ing-panel">
    <div class="ing-header"  @click="isOpen = !isOpen">
      <span>合計食材数<template v-if="showWeek">（設定曜日分：{{ weekCooks.length }}回）</template></span>
      <span class="chevron" :class="{ open: isOpen }">▼</span>
    </div>  
    <Transition name="slide">
      <table class="ing-table" v-show="isOpen">
        <tbody>
          <tr v-for="item in totalIngredients" :key="item.ingredient.name">
            <td><img :src="imgUrl(item.ingredient.img)" class="ing-img" /></td>
            <td class="ing-name">{{ item.ingredient.name }}</td>
            <td class="ing-total">
              {{ item.required + item.extra }}<span class="ing-unit">個</span>
              <div v-if="showWeek" class="ing-week-total">(曜日分:{{ item.weekRequired + item.weekExtra }}個)</div>
            </td>
            <td class="ing-detail">
              必須 {{ item.required }} / 追加 {{ item.extra }}
              <div v-if="showWeek" class="ing-week">(必須 {{ item.weekRequired }} / 追加 {{ item.weekExtra }})</div>
            </td>
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
  .ing-week-total {
    font-size: 0.70rem;
    font-weight: normal;  
    color: rgba(255,255,255,0.75);
  }

</style>
