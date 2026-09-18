<script setup>
  import { useSimulatorStore } from '../../stores/simulatorStore.js'
  import { WeekScheduleSetting } from '../../models/simulator/weekSchedule/WeekScheduleSetting.js'
  const store = useSimulatorStore()

</script>

<template>
  <div v-if="store.isWeekScheduleModalOpen" class="modal-overlay" @click.self="store.closeWeekScheduleModal()">
    <div class="modal-dialog">

      <!-- ヘッダー -->
      <div class="modal-header">
        <span class="modal-title">曜日設定</span>
        <div class="modal-header-actions">
          <button class="btn-close" @click="store.closeWeekScheduleModal()">×</button>
        </div>
      </div>

      <!-- ツール -->
      <div class="modal-toolbar">
        <select v-model="store.weekScheduleSetting.startWeekOfDayKey" class="weekday-select">
          <option v-for="def in WeekScheduleSetting.WEEKDAY_DEFS" :key="def.key" :value="def.key">
            {{ def.displayStr }}曜日から開始
          </option>
        </select>
        <button class="btn-reset" @click="store.resetWeekScheduleSetting()">リセット</button>
      </div>

      <!-- 曜日表示チェックボックス -->
      <label class="show-toggle">
        <input type="checkbox" v-model="store.weekScheduleSetting.showWeekOfDayLabel" />
        結果に曜日を表示する
      </label>
      
      <!-- 曜日×朝昼晩 -->
      <div class="weekday-list">
        <div v-for="(day, dayIndex) in store.weekScheduleSetting.weekSchedule" :key="day.key" class="weekday-row" :class="{ 'before-start': dayIndex <  store.weekScheduleSetting.startWeekDayIndex  }">
          <button
            class="day-badge"
            :class="{ off: !day.isContainEnabledSlot }"
            :style="{ background: day.iconColor }"
            :disabled="dayIndex <  store.weekScheduleSetting.startWeekDayIndex"
            @click="day.toggleAllMealSlots()"
          >{{ day.displayStr }}</button>

          <button
            v-for="slot in day.mealSlots"
            :key="slot.key"
            class="meal-slot"
            :class="{ off: !slot.enabled }"
            :disabled="dayIndex < store.weekScheduleSetting.startWeekDayIndex "
            @click="slot.toggle()"
          >{{ slot.icon }}</button>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-apply" @click="store.closeWeekScheduleModal()">閉じる</button>
      </div>

    </div>
  </div>
</template>

<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }
  .modal-dialog {
    background: #1e1e2e;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 10px;
    padding: 16px;
    width: 90%;
    max-width: 320px;
    max-height: 80vh;
    overflow-y: auto;
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.15);
  }
  .modal-title {
    font-size: 0.95em;
    font-weight: bold;
    color: rgba(255,255,255,0.9);
  }
  .modal-header-actions {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .modal-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .weekday-select {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.9);
    padding: 5px 8px;
    border-radius: 4px;
  }
  .btn-reset {
    border: 1px solid rgba(255,152,0,0.5);
    background: rgba(255,152,0,0.1);
    color: rgba(255,152,0,0.9);
    padding: 5px 10px;
    font-size: 0.75em;
  }
  .btn-reset:hover { background: rgba(255,152,0,0.25); }

  .weekday-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 14px;
  }
  .weekday-select option {
    background: #1e1e2e;
    color: rgba(255,255,255,0.9);
  }
  .weekday-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    background: rgba(255,255,255,0.04);   
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
  }
  .weekday-row.before-start {
    opacity: 0.4;
  }
  .day-badge {
    width: 60px;
    padding: 8px 0;
    border: none;
    border-radius: 6px;
    color: #1e1e2e;
    font-weight: bold;
    cursor: pointer;
  }
  .day-badge.off { filter: grayscale(1) brightness(0.6); }

  .meal-slots {
    flex: 1;                   
    display: flex;
    justify-content: center;   
    gap: 8px;
  }   
  .meal-slot.off { filter: grayscale(1) brightness(0.5); }
  .meal-slot:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .show-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.7);
    cursor: pointer;
    margin-bottom: 14px;
  }
  .show-toggle input { accent-color: #3498db; width: 15px; height: 15px; }

  .modal-footer { text-align: right; }
  .btn-apply {
    border: 1px solid rgba(52,152,219,0.6);
    background: rgba(52,152,219,0.15);
    color: #6cb8ea;
    padding: 6px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  .btn-apply:hover { background: rgba(52,152,219,0.3); }

  .btn-close {
    width: 24px; height: 24px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.7);
    font-size: 0.85em;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    padding: 0;
  }
  .btn-close:hover { background: rgba(255,255,255,0.15); }
</style>
