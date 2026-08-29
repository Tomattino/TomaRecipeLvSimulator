import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

/****  設定取り込み ****/
import { appConfig } from '../config/appConfig.js'
import { storageConfig } from '../config/storageConfig.js'

/****  モデル取り込み ****/
import { CurrentSession } from '../models/simulator/history/CurrentSession.js'
import { SavedEntry } from '../models/simulator/history/SavedEntry.js'
import { useSimulatorStore } from './simulatorStore.js'


export const useHistoryStore = defineStore('history', () => {
  const simulatorStore = useSimulatorStore();

  // ── state:   データ（reactive な変数） ──────────────────────────────
  const currentSession  = ref(null); // 直近セッション（CurrentSession）
  const previousSession = ref(null); // 履歴読み込み前の退避（CurrentSession）
  const savedEntries    = ref([]);   // 保存済みエントリ（SavedEntry[]）

  const localStorageCanSave = ref(true); // localStorageに保存できる環境かどうか

  let saveTimeoutId = null;
  watch(() => simulatorStore.results, () => {
    clearTimeout(saveTimeoutId);
    saveTimeoutId = setTimeout(() => saveCurrentSession(), 500);
  });
  
  // タブが非表示(裏に回る等)になった瞬間即座に保存する
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      clearTimeout(saveTimeoutId);
      saveCurrentSession();
    }
  });


  // ── getters: 計算値（computed と同じ） ────────────────────────────

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
    currentSession.value = _createSnapshot(storageConfig.HistoryStorageKey.CURRENT_SESSION);
    _writeToLocalStorage (currentSession.value); 
  };

  // ■ エントリをシミュレーターに書き戻す（読み込み前に現在状態を退避）
  const savePreviousSession = () => {
    previousSession.value = _createSnapshot(storageConfig.HistoryStorageKey.PREVIOUS_SESSION);
    _writeToLocalStorage(previousSession.value); 
  }


  // ■ エントリの内容をシミュレーターに書き戻す（書き戻し前にsavePreviousSessionで現在状態を退避）
  const loadEntry = (entry) => {
    if(!entry) return;

    const { configSnapshot: loadedconfigSnapshot, 
            cookStatusRawMap: loadedCookStatusRawMap, 
            manualEnergyMap: loadedManualEnergyMap } = entry;

    simulatorStore.config.restoreSnapshot(loadedconfigSnapshot);

    simulatorStore.cookStatusMap.allStatusMap = loadedCookStatusRawMap;
    simulatorStore.restoreManualEnergyMap(loadedManualEnergyMap);
  };

  // ■ 現在状態を名前をつけてsavedEntriesに追加
  const saveEntry = (historyName) => {
    const newID = `${storageConfig.HistoryStorageKey.SAVED_PREFIX}${crypto.randomUUID()}`;
    const tmpSaveEntry = new SavedEntry({historyName, ..._createSnapshot(newID)});
    _writeToLocalStorage(tmpSaveEntry); 
    _readFromLocalStorage();
  };

  // ■ 指定IDのエントリを削除
  const deleteEntry = (id) => {
    if(!_isSavedEntry(id)) return;

    localStorage.removeItem(id);
    _readFromLocalStorage();
  };

  // ── localStorage ───────────────────────────────────────────────────
  // ■ localStorageに書き込み可能な環境か判定する(プライベートモード等を検知)
  const _checkCanSave = () => {
    try {
      localStorage.setItem(storageConfig.HistoryStorageKey.SAVE_TEST, '1');
      localStorage.removeItem(storageConfig.HistoryStorageKey.SAVE_TEST);
      return true;
    } catch {
      return false;
    }
  };


  // ■ localStorageへ書き込む（内部用）
  const _writeToLocalStorage = (entry) => {
    try {
    localStorage.setItem(entry.id, entry.toSaveDataJSON());
    } catch {
      // 容量超過・プライベートモード等で保存できない場合は静かに諦める
      console.log(`error: ローカルストレージへのアクセス不可`);
    }
  };

  // ■ localStorageから読み込む（起動時）
  const _readFromLocalStorage = () => {
    if(!localStorageCanSave.value) return;

    // currentSession の復元
    const tmpCurrentSession = localStorage.getItem(storageConfig.HistoryStorageKey.CURRENT_SESSION);
    if (tmpCurrentSession) currentSession.value = CurrentSession.toObjectFromSaveDataJson(tmpCurrentSession);

    // previousSession の復元
    const tmpPreviousSession = localStorage.getItem(storageConfig.HistoryStorageKey.PREVIOUS_SESSION);
    if (tmpPreviousSession) previousSession.value = CurrentSession.toObjectFromSaveDataJson(tmpPreviousSession);

    const tmpSavedEntries = [];
    for(let i = 0; i < localStorage.length; i++){
      const tmpSavedkey = localStorage.key(i);

      if(_isSavedEntry(tmpSavedkey)){
        const tmpSavedJson = localStorage.getItem(tmpSavedkey);
        if (tmpSavedJson) {
          const tmpEntry = SavedEntry.toObjectFromSaveDataJson(tmpSavedJson);
          if (tmpEntry) tmpSavedEntries.push(tmpEntry);
        }
      }
    }

    tmpSavedEntries.sort((a, b) => b.savedAt - a.savedAt);
    savedEntries.value = tmpSavedEntries;
  };

  const _isSavedEntry = (key) => {
    return key.startsWith(storageConfig.HistoryStorageKey.SAVED_PREFIX);
  }

  // 起動時に localStorage から状態を復元
  localStorageCanSave.value = _checkCanSave();

  if(localStorageCanSave.value){
    _readFromLocalStorage();
    loadEntry(currentSession.value);
    if(!currentSession.value) saveCurrentSession();
  }


  return {
    currentSession,
    previousSession,
    savedEntries,
    localStorageCanSave,
    saveCurrentSession,
    savePreviousSession,
    loadEntry,
    saveEntry,
    deleteEntry,
  }
})

