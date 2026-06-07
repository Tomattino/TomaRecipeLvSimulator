import { defineStore } from 'pinia'
import { ref, reactive, computed, watch  } from 'vue'

/****  モデル取り込み ****/
// レシピデータ
import { dessertRecipes } from '../data/recipes/dessertRecipe.js' //デザート
import { saladRecipes } from '../data/recipes/saladRecipes.js' //サラダ
import { curryRecipes } from '../data/recipes/curriesRecipe.js' //カレー

//マスターデータ
import { recipeLevelMaster } from '../data/recipeLevelMaster.js' //料理レベルマスタ

//シミュレーション関係モデル
import { RecipeLvSimulatorConfig } from '../models/simulator/RecipeLvSimulatorConfig.js' // シミュレータ設定
import { RecipeLvSimulatorResultList } from '../models/simulator/RecipeLvSimulatorResultList.js' //料理シミュレーション結果
import { CookStatusMap } from '../models/simulator/CookStatusMap.js' //料理結果 判定条件紐づけ用モデル




export const useSimulatorStore = defineStore('simulator', () => {
  // ── state:   データ（reactive な変数） ──────────────────────────────
  const config = reactive(new RecipeLvSimulatorConfig(recipeLevelMaster)) // シミュレータ設定
  const selectedCategory = ref('curry') // 選択カテゴリの初期値
  const cookStatusMap = reactive(new CookStatusMap()) //シミュレーション関係モデル
  

  // 初期カテゴリに合わせて初期表示レシピを設定
  const initialRecipes = {
    curry: curryRecipes,
    salad: saladRecipes,
    dessert: dessertRecipes
  }

  if (!config.selectedRecipeName) {
    config.selectedRecipeName = Object.values(initialRecipes[selectedCategory.value])[0]?.name ?? ''
  }
  
  
  
  // ── getters: 計算値（computed と同じ） ────────────────────────────
  //■料理カテゴリの変更
  // 選択中のレシピオブジェクトを返す
  const currentRecipes = computed(() => {
    if (selectedCategory.value === 'salad') return saladRecipes
    if (selectedCategory.value === 'curry') return curryRecipes
    if (selectedCategory.value === 'dessert') return dessertRecipes
  })
  
  //■ 選択料理の変更
  //config.selectedRecipeName が変わると自動で再計算される
  const targetRecipe = computed(() =>
    Object.values(currentRecipes.value).find(d => d.name === config.selectedRecipeName)
  )


  //■ 料理レベルシミュレーション計算結果
  const results = computed(() => {
    if (!targetRecipe.value) return null

    // 依存関係明示用(更新もれの防止)
    const _start = config.startLevel //開始レベル
    const _end = config.endLevel //目標レベル
    const _initial = config.initialExp //獲得済みEXP
    const _field = config.fieldBonus //フィールドボーナス
    const _event = config.eventBonus //イベントボーナス
    
    return new RecipeLvSimulatorResultList({
        config , //シミュレーション設定
        recipe: targetRecipe.value , //選択中料理
        levelMaster: recipeLevelMaster , //料理レベルマスター
        cookStatusMap //料理結果 判定条件紐づけmap
    })
  })


  
  // ── actions: 操作（メソッドと同じ） ────────────────────────────
  //■カテゴリ変更時にカテゴリ内の最初の料理を表示
  watch(selectedCategory, () => {
      config.selectedRecipeName = Object.values(currentRecipes.value)[0]?.name ?? ''
  })

  // ■ 余剰経験値算出
  // 必要経験値更新時に値の取得および余剰経験値および初期経験値を計算する
  const setExpForNextLv = (val) => {
    config.expForNextLv = val
  }

  // ■判定条件紐づけmap更新用
  const toggleSunday = (cookIndex) => cookStatusMap.toggleSunday(cookIndex) //日曜日フラグ
  const toggleCritical = (cookIndex) => cookStatusMap.toggleCritical(cookIndex) //大成功フラグ
  
  // TODO: 追加食材入力をモーダル化したときにロジック見直し
  const setExtraQty = (cookIndex, ingKey, qty) => cookStatusMap.setExtraQty(cookIndex, ingKey, qty) //追加食材個数を増やす
  const adjustExtraQty = (cookIndex, ingKey, delta) => cookStatusMap.adjustExtraQty(cookIndex, ingKey, delta) //追加食材数増減
  
  const getExtraQty = (cookIndex, ingKey) => cookStatusMap.getStatus(cookIndex).extraIngredients?.[ingKey] ?? 0 //追加食材数取得
  


  // コンポーネントで使用する変数
  return {
    // ------ シミュレーション設定 ------
    config, //設定値群
    selectedCategory, //料理カテゴリ
    targetRecipe, //選択レシピ

    // ------ 可変マスタ 等 ------ 
    currentRecipes, //料理レシピリスト

    // ------ シミュレーション結果  ------
    results, //シミュレーション結果
    cookStatusMap, //個別シミュレーション条件紐づけ用

    // ------ アクション(各動きは上記参照)  ------    
    setExpForNextLv,
    toggleSunday,
    toggleCritical,
    setExtraQty,
    adjustExtraQty,
    getExtraQty
  }

})