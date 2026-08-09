<script setup>
  import HistorySectionSandbox from './HistorySectionSandbox.vue'
  import HistoryEntrySandbox from './HistoryEntrySandbox.vue'

  const emit = defineEmits(['close']);
</script>


<template>
  <div class="drw">
    <!-- タイトルバー -->
    <div class="drw-titlebar">
      <span>セッション / 履歴</span>
    </div>
    <!-- 保存エリア -->
    <!-- HistorySection × 2 -->
  </div>
</template>

<style scoped>
  .drw {
    width: 242px;
    height: 100%;
    background: #252525;
    border-left: 1px solid #555;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .drw-titlebar {
    background: #333;
    border-bottom: 1px solid #555;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }
  .drw-titlebar span { font-size: 0.72rem; color: #ccc; font-weight: 600; }
  .drw-titlebar button { font-size: 0.65rem; background: #444; border: 1px solid #666; color: #aaa; border-radius: 2px; padding: 2px 7px; cursor: pointer; }

  .drw-scroll {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
</style>