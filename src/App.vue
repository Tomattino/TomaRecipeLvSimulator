<script setup>  
  /****  コンポーネント取り込み ****/
  //料理シミュレーション条件入力コンポーネント
  import SimulationHeader from './components/simulator/SimulationHeader.vue'
  // シミュレーション結果管理用コンポーネント
  import SimulationResultList from './components/simulator/SimulationResultList.vue'
  
  // 追加食材モーダルコンポーネント
  import ExtraIngModal from './components/simulator/ExtraIngModal.vue'

</script>

<template>
  <div class="app-container">

    <SimulationHeader />
    <SimulationResultList />
    <ExtraIngModal/>
  </div>
</template>

<style scoped>
  .app-container {
    padding: 0;
  }
</style>
