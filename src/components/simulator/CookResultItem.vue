<script setup>
  /****  コンポーネント取り込み ****/
  import { ref } from 'vue';
  
  /****  Store ****/
  import { useSimulatorStore } from '../../stores/simulatorStore.js';
  const store = useSimulatorStore();

  const props = defineProps({
      cook: Object, //各回の料理結果
      localIndex: Number //レベル内で何回目か
  });
  
  const editMode = ref(false);
  const manualInputVal = ref('');

  const handleSave = () => {
    if(manualInputVal.value === '' || manualInputVal.value === null) {
        editMode.value = false;
        return;
    }
    store.setManualEnergy(props.cook.cookIndex, Number(manualInputVal.value));
    editMode.value = false;
    manualInputVal.value = '';
  }
  //TODO共通化
  const imgUrl = (path) => import.meta.env.BASE_URL + path.replace(/^\//, '')
</script>

<template>
    <div class="cook-item" :class="{ 'is-critical': cook.isCritical }">
        <div class="cook-header">
            <!-- 結果表示 -->
            <span class="cook-num">{{ localIndex }} 回目</span>
            <span class="energy" :class="{ 'is-critical-text': cook.isCritical }">
                <!-- 表示モード -->
                <div v-if ="!editMode">
                  <!-- 計算値 -->
                  <div v-if="store.manualEnergyMap[cook.cookIndex] === undefined" >
                    {{ cook.finalEnergy.toLocaleString() }} エナジー 
                    <div class="icon-btn" @click.stop="editMode = true"> ✏️ </div>
                  </div>
                  <div v-else >
                    {{ store.manualEnergyMap[cook.cookIndex].toLocaleString() }} エナジー
                    <div class="icon-btn" @click.stop="editMode = true"> ✏️ </div>
                    <div class="icon-btn"  @click.stop="store.clearManualEnergy(cook.cookIndex)" >🗑</div>
                    <span class="manual-badge">手入力</span>
                  </div>
                </div>
                <!-- 入力モード -->
                <div v-else>
                  <input type="number" v-model="manualInputVal" @keydown.enter="handleSave">
                  <div class="icon-btn" @click.stop="handleSave">✅</div>
                  <div class="icon-btn" @click.stop="editMode = false">×</div>
                </div>

            </span> 

            <!-- 条件設定 -->
            <div class="cook-actions">
                <button @click.stop="store.openIngModal(cook.cookIndex)" class="action-btn">追加食材編集</button>
                <button @click.stop="store.toggleSunday(cook.cookIndex)"
                    :class="['action-btn', 'sunday-btn', { active: cook.isSunday }]">☀ 日曜</button>
                <button @click.stop="store.toggleCritical(cook.cookIndex)"
                    :class="['action-btn', 'critical-btn', { active: cook.isCritical }]">🍲 大成功</button>
                <span v-if="cook.isCritical" class="multiplier">
                    {{ cook.isSunday ? '×3' : '×2' }}
                </span>
            </div> <!-- 条件設定 -->
        </div>
    </div>
</template>

<style scoped>
    .cook-item {
        border-left: 4px solid #3498db;
        padding: 8px 12px;
        background: rgba(255,255,255,0.04);
        border-radius: 0 8px 8px 0;
    }
    .cook-item.is-critical {
        border-left-color: #f1c40f;
        background: rgba(241,196,15,0.05);
    }

    .cook-num { font-size: 0.8em; color: rgba(255,255,255,0.5); white-space: nowrap; }
    .energy { font-variant-numeric: tabular-nums; font-size: 0.95em; }
    .is-critical-text { color: #f1c40f; font-weight: bold; }
    .multiplier { font-size: 0.9em; color: #f1c40f; font-weight: bold; }

    .cook-actions { display: flex; align-items: center; gap: 6px; }
    .action-btn {
        padding: 3px 10px;
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 6px;
        background: rgba(255,255,255,0.08);
        color: white;
        font-size: 0.82em;
        cursor: pointer;
        white-space: nowrap;
    }
    .sunday-btn.active  { background: #e67e22; border-color: #e67e22; }
    .critical-btn.active { background: rgba(241,196,15,0.3); border-color: #f1c40f; }
    .manual-badge {
    font-size: 0.7em;
    padding: 1px 6px;
    border-radius: 10px;
    background: rgba(150, 150, 150, 0.25);
    border: 1px solid rgba(150, 150, 150, 0.4);
    color: rgba(255, 255, 255, 0.55);
    white-space: nowrap;
    }
    .icon-btn {
        cursor: pointer;
        user-select: none;
        display: inline-block;
        padding: 2px 4px;
        border-radius: 4px;
        transition: background 0.1s, opacity 0.1s;
    }
    .icon-btn:hover  { background: rgba(255,255,255,0.12); }
    .icon-btn:active { opacity: 0.6; }
</style>
