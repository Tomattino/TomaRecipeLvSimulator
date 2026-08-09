<script setup>
import ActiveSandbox from './HistoryEntrySandbox.vue'  // ← ここだけ差し替え
import HistorySectionSandbox from './HistorySectionSandbox.vue';

import HistoryDrawerSandbox from './HistoryDrawerSandbox.vue';

import SideDrawerSandbox from './SideDrawerSandbox.vue'
</script>


<template>
  
  <div style="background: #1e1e1e; height: 100vh; position: relative;">
    <SideDrawerSandbox>
    <HistoryDrawerSandbox/>
      <HistorySectionSandbox sectionTitle="test">
        <ActiveSandbox
          badgeTitle="現在"
          historyName="test"
          recipeName="しんりょくアボカドグラタン"
          :levelFrom="60"
          :levelTo="65"
          :fieldBonus="82"
          :regDateTime="new Date('2026-06-30T10:55:00')"
          actionBtnText ="テスト"
        />
        <ActiveSandbox
          historyName="test"
          recipeName="しんりょくアボカドグラタン"
          :levelFrom="60"
          :levelTo="65"
          :fieldBonus="82"
          :regDateTime="new Date('2026-06-30T10:55:00')"
        />
      </HistorySectionSandbox>
      </SideDrawerSandbox>
    </div>

</template>