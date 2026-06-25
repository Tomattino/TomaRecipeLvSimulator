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

    <footer class="app-footer">
      料理レベルデータ出典(Lv66～)：<a href="https://pks.raenonx.cc/" target="_blank" rel="noopener">RaenonXポケスリ攻略ツール</a>
      ※ 2026年6月時点のデータ
    </footer>
  </div>
</template>

<style scoped>
  .app-container {
    padding: 0;
  }
  .app-footer {
    font-size: 0.75rem;
    color: rgba(0, 0, 0, 0.4);
    text-align: left;
    padding: 16px;
  }
  
  .app-footer a {
    color: rgba(0, 0, 0, 0.55);
  }

</style>
