<script setup>
  import { ref } from 'vue';
  import HistoryEntry from './HistoryEntry.vue' 
  import HistorySection from './HistorySection.vue';
  import SideDrawer from '../../common/SideDrawer.vue'

  import {useHistoryStore} from '../../../stores/historyStore.js';
  const historyStore = useHistoryStore();

  const newHistoryName = ref('');

  const handleSave = () =>{
    if(newHistoryName.value.trim()) {
      historyStore.saveEntry(newHistoryName.value);
      newHistoryName.value = '';
    }
  }
</script>


<template>
  <SideDrawer>
    <div class="drw">
      <!-- タイトルバー -->
      <div class="drw-titlebar">
        <span>セッション / 履歴</span>
      </div>
      <div class="drw-scroll">
        <div class="save-block">
          <label>現在の状態を保存</label>
          <input type="text" v-model="newHistoryName" placeholder="名前を入力…" @keyup.enter="handleSave">
          <button @click="handleSave">保存</button>
        </div>
        <HistorySection sectionTitle="直近のセッション">
          <HistoryEntry 
            v-if="historyStore.currentSession"
            :entry="historyStore.currentSession"
            badgeTitle="現在"
            :deletable="false"
            @load="historyStore.loadEntry(historyStore.currentSession)"
          />
          <HistoryEntry
            v-if="historyStore.previousSession"
            :entry="historyStore.previousSession"
            badgeTitle="履歴読込前"
            :deletable="false"
            @load="historyStore.loadEntry(historyStore.previousSession)"
          />
        </HistorySection>
        <HistorySection sectionTitle="保存済み"  :sticky="true">
          <HistoryEntry
            v-for="tmpSavedEntry in historyStore.savedEntries"
            :key = "tmpSavedEntry.id"

            :entry="tmpSavedEntry"
            :deletable="true"
            @load="historyStore.savePreviousSession();historyStore.loadEntry(tmpSavedEntry);"
            @delete="historyStore.deleteEntry(tmpSavedEntry.id)"
          />
        </HistorySection>
      
      </div>
    </div>
  </SideDrawer>
</template>

<style scoped>

  .drw {
    height: 100%;
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
  .save-block {
    background: #2d2d2d;
    border-bottom: 1px solid #444;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .save-block label {
    font-size: 0.6rem;
    color: #888;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .save-block input {
    font-size: 0.72rem;
    padding: 5px 8px;
    border: 1px solid #555;
    border-radius: 2px;
    background: #1e1e1e;
    color: #ddd;
    outline: none;
    width: 100%;
    box-sizing: border-box;
  }
  .save-block input:focus {
    border-color: #4de89a;
  }
  .save-block input::placeholder {
    color: #555;
  }
  .save-block button {
    font-size: 0.7rem;
    padding: 5px;
    border-radius: 2px;
    cursor: pointer;
    width: 100%;
    background: #3a5a3a;
    color: #4de89a;
    border: 1px solid #4a7a4a;
    font-weight: 600;
  }
  .save-block button:hover {
    background: #4a6e4a;
  }
</style>