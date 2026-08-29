<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    badgeTitle: { type: String, required: false, default: "" },
    entry: {type: Object,required: true}, // CurrentSession or SavedEntry 
    deletable: {type: Boolean, required: false, default: false},
  });

  const display = computed(() => props.entry?.toHistoryDisplayString());
  const emit = defineEmits(['load', 'delete']);
</script>

<template>
  <div class="ent">
    <div class="ent-top">
      <span class="badge cur" v-if="badgeTitle">{{badgeTitle}}</span>
      <div class="ename" v-if="display.historyName">{{display.historyName}}</div>
    </div>
    <div class="erecipe">{{display.recipeName}}</div>
    <div class="emeta">Lv{{display.levelFrom}}→{{display.levelTo}} ／ 次のレベルまで{{display.expForNextLv }}</div>
    <div class="emeta"> FB{{display.fieldBonus}}% ／ イベント×{{display.eventBonus}} ／ {{display.regDateTime}}</div>
    <div class="acts" v-if="display.actionBtnText">
        <button class="load"  @click="emit('load')">{{display.actionBtnText}}</button>
        <button class="del" v-if="deletable" @click="emit('delete')">🗑</button>
    </div>
  </div>
</template>

<style scoped>
  .ent { border: 1px solid #333; border-radius: 6px; padding: 9px 12px; display: flex; flex-direction: column; gap: 3px; }
  .ent:hover { background: #2c2c2c; }

  .ent-top { display: flex; align-items: center; gap: 6px; }

  .badge { font-size: 0.55rem; padding: 2px 6px; border-radius: 2px; display: inline-block; width: fit-content; font-weight: 700; border: 1px solid; }
  .badge.cur { background: #1e3028; color: #7ab898; border-color: #2a4a38; }
  .badge.prv { background: #2a2a30; color: #7878a0; border-color: #3a3a50; }

  .ename { font-size: 0.76rem; color: #ddd; font-weight: 500; }
  .erecipe { font-size: 0.62rem; color: #999; }
  .emeta { font-size: 0.6rem; color: #777; line-height: 1.5; margin-top: 1px; }

  .acts { display: flex; gap: 4px; margin-top: 4px; }
  .acts button { font-size: 0.65rem; padding: 3px 10px; border-radius: 2px; cursor: pointer; font-weight: 600; }

  .load { background: transparent; color: #7ab898; border: 1px solid #4a7a62; }
  .load:hover { background: rgba(74,200,138,0.08); }
  .del { background: transparent; color: #888; border: 1px solid #555; padding: 2px 6px; font-size: 0.82rem; font-weight: normal; }
  .del:hover { background: rgba(255,255,255,0.05); color: #aaa; }
</style>
