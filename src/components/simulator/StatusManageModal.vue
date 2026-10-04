<script setup>
  import { computed } from 'vue'

  import { pokesleepIngredients } from '../../data/ingredients/pokesleepIngredients.js' //食材マスタデータ

  /****  Store ****/
  import { useSimulatorStore } from '../../stores/simulatorStore.js'
  const store = useSimulatorStore();

  import { useHistoryStore } from '../../stores/historyStore.js'
  const historyStore = useHistoryStore();

  //■画像パスを公開先のURLに合わせる(他のコンポーネントと同じ)
  const imgUrl = (path) => import.meta.env.BASE_URL + path.replace(/^\//, '');

  //■通し番号から1行分を作る(範囲内・範囲外で共通)
  const buildRow = (cookIndex, level, indexInLevel) => {
    const status = store.cookStatusMap.getStatus(cookIndex);
    const isInLevelRange = level !== null; 
    const extraIngredients = Object.entries(status.extraIngredients)
      .filter(([, qty]) => qty > 0)
      .map(([ingKey, qty]) => ({ ingredient: pokesleepIngredients[ingKey], num: qty }));

    return {
      cookIndex: cookIndex,
      level: level??null,
      indexInLevel: isInLevelRange?indexInLevel:null,
      isInLevelRange: isInLevelRange,
      isCritical: status.isCritical,
      isSunday: status.isSunday,
      extraIngredients: extraIngredients, 
      manualEnergy: store.manualEnergyMap[cookIndex] ?? null,
    };
  };

  //■表示用のデータを生成(全部の回＋範囲外に残っている設定)
  const rows = computed(() => {
    //シミュレーション結果内の条件を取得
    const dishLevelsResults = store.results?.dishLevelsResults ?? [];

    const rowsInLevelRange = dishLevelsResults.flatMap(levelResult =>
      levelResult.cooks.map((cook, index) => 
        buildRow(cook.cookIndex, levelResult.level, index + 1)
    ));
    
    //シミュレーション結果外の条件を取得
    const allSettingIndexes = [
      ...Object.keys(store.cookStatusMap.allStatusMap),
      ...Object.keys(store.manualEnergyMap),
    ].map(index => Number(index));

    const outOfRangeIndexes = [...new Set(allSettingIndexes)]
      .filter(cookIndex => !rowsInLevelRange.some(row => row.cookIndex === cookIndex));

    const rowsOutOfLevelRange = outOfRangeIndexes.map(cookIndex => buildRow(cookIndex, null, null))
      .filter(row => row.isCritical || row.isSunday || row.extraIngredients.length > 0 || row.manualEnergy !== null)
      .sort((a,b) => a.cookIndex  - b.cookIndex );

    return [...rowsInLevelRange, ...rowsOutOfLevelRange];
  });

  //■列ごとの一括解除
  const handleClearCritical = () => { store.clearAllCritical();  };
  const handleClearSunday   = () => { store.clearAllSunday();  };
  const handleClearExtra    = () => { store.clearAllExtraIngredients(); }; 
  const handleClearManual   = () => { store.clearAllManualEnergy(); };

  //■すべてリセット(取り消せないので確認を出す)
  const handleClearAll = () => {
    if (!window.confirm('すべての設定（大成功・日曜・追加食材・手入力）をリセットします。\n本当によろしいですか？')) return;

    handleClearCritical();
    handleClearSunday();
    handleClearExtra();
    handleClearManual();
  };

  //■モーダルを閉じる
  // 範囲外の設定だけを解除した時は計算結果が変わらず自動保存が動かないため、閉じる時に保存する
  const handleClose = () => {
    store.closeStatusManageModal();
    historyStore.saveCurrentSession();
  };
  </script>

<template>
  <div v-if="store.isStatusManageModalOpen" class="modal-overlay" @click.self="handleClose()">
    <div class="modal-dialog">

      <!-- ヘッダー -->
      <div class="modal-header">
        <span class="modal-title">設定の管理</span>
        <button class="btn-close" @click="handleClose()">×</button>
      </div>

      <!-- ツールバー -->
      <div class="modal-toolbar">
        <button class="btn-all" @click="handleClearAll()">すべてリセット</button>
      </div>
      
      <template v-if="rows.length > 0">
        <!-- スマホ幅で入りきらない時は、表だけ横スクロールさせる -->
        <div class="table-wrap">
          <table class="status-table">
            <thead>
              <!-- 見出し -->
              <tr>
                <th>回</th>
                <th>🍲 大成功</th>
                <th>☀ 日曜</th>
                <th>追加食材</th>
                <th>手入力</th>
              </tr>
              <!-- 列ごとの一括解除ボタン -->
              <tr class="col-actions">
                <th></th>
                <th><button class="btn-clear" @click="handleClearCritical">解除</button></th>
                <th><button class="btn-clear" @click="handleClearSunday">解除</button></th>
                <th><button class="btn-clear" @click="handleClearExtra">解除</button></th>
                <th><button class="btn-clear" @click="handleClearManual">解除</button></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="row in rows" :key="row.cookIndex" :class="{ 'out-of-range': !row.isInLevelRange }">
                <!-- どの回か -->
                <td class="cook-label">
                  <span v-if="!row.isInLevelRange" class="tag-out" title="今の調理回数より後ろに残っている設定">範囲外</span>
                  <template v-else>Lv{{ row.level }}<small>{{ row.indexInLevel  }}回目</small></template>
                </td>

                <!-- 大成功 -->
                <td>
                  <span v-if="row.isCritical">🍲</span>
                  <span v-else class="none">-</span>
                </td>

                <!-- 日曜 -->
                <td>
                  <span v-if="row.isSunday">☀</span>
                  <span v-else class="none">-</span>
                </td>
                
                <!-- 追加食材(画像×個数を縦に並べる) -->
                <td>
                  <div v-if="row.extraIngredients.length > 0" class="extra-list">
                    <div v-for="extra in row.extraIngredients" :key="extra.ingredient.name" class="extra-item">
                      <img :src="imgUrl(extra.ingredient.img)" :alt="extra.ingredient.name" class="ing-img">
                      ×{{ extra.num }}
                    </div>
                  </div>
                  <span v-else class="none">-</span>
                </td>

                <!-- 手入力エナジー -->
                <td class="val-energy">
                  <span v-if="row.manualEnergy !== null">{{ row.manualEnergy.toLocaleString() }}</span>
                  <span v-else class="none">-</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

    </div>
  </div>
</template>

<style scoped>
  .modal-overlay {
    position: fixed;           /* 画面全体を覆う */
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;              /* 他の要素より前面に */
  }
  .modal-dialog {
    background: #1e1e2e;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 10px;
    padding: 16px;
    width: 92%;
    max-width: 520px;
    max-height: 80vh;          /* 画面の8割まで */
    overflow-y: auto;          /* 縦にはみ出たらスクロール */
    color: rgba(255,255,255,0.9);
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.15);
  }
  .modal-toolbar {
    display: flex;
    justify-content:  flex-end;
    align-items: center;
    margin-bottom: 8px;
  }
  .modal-title {
    font-size: 0.95em;
    font-weight: bold;
  }
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

  /* 表 */
  .table-wrap { overflow-x: auto; }
  .status-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.82rem;
    white-space: nowrap;       /* セルの中で折り返さない */
  }
  .status-table th,
  .status-table td {
    padding: 6px;
    text-align: center;
  }
  .status-table th:first-child,
  .status-table td:first-child { text-align: left; }   /* 「回」の列だけ左寄せ */
  .status-table thead th {
    font-weight: normal;
    font-size: 0.72rem;
    color: rgba(255,255,255,0.55);
  }
  .status-table .col-actions th { padding-top: 0; }
  .status-table tbody tr { border-top: 1px solid rgba(255,255,255,0.08); }

  .cook-label { color: rgba(255,255,255,0.85); }
  .cook-label small {
    margin-left: 3px;
    color: rgba(255,255,255,0.45);
  }
  .none { color: rgba(255,255,255,0.2); }              /* 設定なしの「-」 */
  .val-energy { font-variant-numeric: tabular-nums; }

  /* 範囲外(今の調理回数より後ろに残っている設定) */
  .out-of-range td { opacity: 0.6; }
  .tag-out {
    font-size: 0.66rem;
    padding: 1px 6px;
    border-radius: 10px;
    background: rgba(231,76,60,0.2);
    border: 1px solid rgba(231,76,60,0.5);
    color: #f19a90;
  }

  /* 列ごとの解除ボタン */
  .btn-clear {
    font-size: 0.66rem;
    padding: 2px 7px;
    border: 1px solid rgba(255,152,0,0.5);
    background: rgba(255,152,0,0.1);
    color: rgba(255,152,0,0.9);
    border-radius: 3px;
    cursor: pointer;
  }
  .btn-clear:hover { background: rgba(255,152,0,0.25); }

  .btn-all {
    padding: 6px 16px;
    border: 1px solid rgba(231,76,60,0.6);
    background: rgba(231,76,60,0.15);
    color: #f19a90;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
  }
  .btn-all:hover { background: rgba(231,76,60,0.3); }


  .extra-list {
    display: flex;
    flex-direction: column; 
    align-items: center;
    gap: 2px;
  }
  .extra-item {
    display: flex;
    align-items: center; 
    gap: 2px;
  }
  .ing-img { width: 20px; height: 20px; object-fit: contain; }

</style>
