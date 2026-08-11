import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

/****  設定取り込み ****/
import { appConfig } from '../config/appConfig.js'

/****  モデル取り込み ****/
import { CurrentSession } from '../models/simulator/history/CurrentSession.js'
import { SavedEntry } from '../models/simulator/history/SavedEntry.js'
import { useSimulatorStore } from './simulatorStore.js'


export const useHistoryStore = defineStore('history', () => {
  const simulatorStore = useSimulatorStore();

  // ── state ──────────────────────────────────────────────────────────
  const currentSession  = ref(null); // 直近セッション（CurrentSession）
  const previousSession = ref(null); // 履歴読み込み前の退避（CurrentSession）
  const savedEntries    = ref([]);   // 保存済みエントリ（SavedEntry[]）

  // ── actions ────────────────────────────────────────────────────────

  const _createSnapshot = (id) => {
    return new CurrentSession({
      id: id ,
      configSnapshot: {
          startLevel: simulatorStore.config.startLevel,
          endLevel: simulatorStore.config.endLevel,
          fieldBonus: simulatorStore.config.fieldBonus,
          eventBonus: simulatorStore.config.eventBonus,
          expForNextLv: simulatorStore.config.expForNextLv,
          selectedRecipeName: simulatorStore.config.selectedRecipeName,
      },
      cookStatusRawMap: {...simulatorStore.cookStatusMap.allStatusMap},
      manualEnergyMap: {...simulatorStore.manualEnergyMap},
      savedAt: new Date(),
      version: appConfig.historyStorage.version,
    });
  };

  // ■ 現在のシミュレーター状態からスナップショットを作りcurrentSessionに保存
  const saveCurrentSession = () => {
    currentSession.value = _createSnapshot("currentSession");
    _writeToLocalStorage(currentSession.value); 
  };

  // ■ エントリをシミュレーターに書き戻す（読み込み前に現在状態を退避）
  const loadEntry = (entry) => {
  };

  // ■ 現在状態を名前をつけてsavedEntriesに追加
  const saveEntry = (historyName) => {

    previousSession.value = _createSnapshot("previousSession");
    _writeToLocalStorage(previousSession.value); 
  };

  // ■ 指定IDのエントリを削除
  const deleteEntry = (id) => {
  };

  // ── localStorage ───────────────────────────────────────────────────
  // ■ localStorageへ書き込む（内部用）
  const _writeToLocalStorage = (entry) => {
    localStorage.setItem(entry.id, entry.toSaveDataJSON());
  };

  // ■ localStorageから読み込む（起動時）
  const _readFromLocalStorage = () => {
  };

  return {
    currentSession,
    previousSession,
    savedEntries,
    saveCurrentSession,
    loadEntry,
    saveEntry,
    deleteEntry,
  }
})

