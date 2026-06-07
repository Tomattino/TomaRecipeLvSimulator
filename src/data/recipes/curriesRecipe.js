import { pokesleepIngredients } from "../ingredients/pokesleepIngredients.js";
import { IngredientsInDishes } from "../../models/common/IngredientsInDishes.js";
import { Recipe } from "../../models/common/Recipe.js";

export const curryRecipes = {
    "freshAvocadoGratin": new Recipe(
        "しんりょくアボカドグラタン", 
        "/images/Recipe/Curries/overgrowavocadogratin.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 41),
            new IngredientsInDishes(pokesleepIngredients["softPotato"], 20),
            new IngredientsInDishes(pokesleepIngredients["pureOil"], 32),
            new IngredientsInDishes(pokesleepIngredients["glossyAvocado"], 22),
        ], 
        1.78
    ),
    "iaigiriSukiyakiCurry": new Recipe(
        "いあいぎりすき焼きカレー", 
        "/images/Recipe/Curries/cutsukiyakicurry.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 26),
            new IngredientsInDishes(pokesleepIngredients["largeLeek"], 27),
            new IngredientsInDishes(pokesleepIngredients["fancyEgg"], 22),
            new IngredientsInDishes(pokesleepIngredients["honey"], 26),
        ], 
        1.61
    ),
    "hiddenPowerPerkUpStew": new Recipe(
        "めざめるパワーシチュー", 
        "/images/Recipe/Curries/hiddenpowerperk-upstew.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["greengrassSoybeans"], 28),
            new IngredientsInDishes(pokesleepIngredients["snoozyTomato"], 25),
            new IngredientsInDishes(pokesleepIngredients["tastyMushroom"], 23),
            new IngredientsInDishes(pokesleepIngredients["rousingCoffee"], 16),
        ], 
        1.61
    ),
    "roleplayPumpkabooStew": new Recipe(
        "なりきりバケッチャシチュー", 
        "/images/Recipe/Curries/roleplaypumpkaboostew.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 16),
            new IngredientsInDishes(pokesleepIngredients["softPotato"], 18),
            new IngredientsInDishes(pokesleepIngredients["tastyMushroom"], 25),
            new IngredientsInDishes(pokesleepIngredients["pumpkin"], 10),
        ], 
        1.48
    ),
    "infernoCornKeemaCurry": new Recipe(
        "れんごくコーンキーマカレー", 
        "/images/Recipe/Curries/infernocornkeemacurry.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 24),
            new IngredientsInDishes(pokesleepIngredients["fieryHerb"], 27),
            new IngredientsInDishes(pokesleepIngredients["warmingGinger"], 12),
            new IngredientsInDishes(pokesleepIngredients["greengrassCorn"], 14),
        ], 
        1.48
    ),
    "ninjaCurry": new Recipe(
        "ニンジャカレー", 
        "/images/Recipe/Curries/ninjacurry.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["greengrassSoybeans"], 24),
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 9),
            new IngredientsInDishes(pokesleepIngredients["largeLeek"], 12),
            new IngredientsInDishes(pokesleepIngredients["tastyMushroom"], 5),
        ], 
        1.48
    ),
    "dreamEaterButterCurry": new Recipe(
        "ぜったいねむりバターカレー", 
        "/images/Recipe/Curries/dreameaterbuttercurry.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["soothingCacao"], 12),
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 10),
            new IngredientsInDishes(pokesleepIngredients["softPotato"], 18),
            new IngredientsInDishes(pokesleepIngredients["snoozyTomato"], 15),
        ], 
        1.35
    ),
    "grilledTailCurry": new Recipe(
        "あぶりテールカレー", 
        "/images/Recipe/Curries/grilledtailcurry.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["fieryHerb"], 25),
            new IngredientsInDishes(pokesleepIngredients["slowpokeTail"], 8),
        ], 
        1.25
    ),
    "spicyLeekCurry": new Recipe(
        "からくちネギもりカレー", 
        "/images/Recipe/Curries/spicyleekcurry.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["largeLeek"], 14),
            new IngredientsInDishes(pokesleepIngredients["fieryHerb"], 8),
            new IngredientsInDishes(pokesleepIngredients["warmingGinger"], 10),
        ], 
        1.25
    ),
    "piyopiyoPunchSpicyCurry": new Recipe(
        "ピヨピヨパンチ辛口カレー", 
        "/images/Recipe/Curries/piyopiyoPunchSpicyCurry.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["fieryHerb"], 11),
            new IngredientsInDishes(pokesleepIngredients["honey"], 11),
            new IngredientsInDishes(pokesleepIngredients["rousingCoffee"], 11),
        ], 
        1.35
    ),
    "limberCornStew": new Recipe(
        "じゅうなんコーンシチュー", 
        "/images/Recipe/Curries/limbercornstew.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 8),
            new IngredientsInDishes(pokesleepIngredients["softPotato"], 8),
            new IngredientsInDishes(pokesleepIngredients["greengrassCorn"], 14),
        ], 
        1.25
    ),
    "eggBombCurry": new Recipe(
        "おやこあいカレー", 
        "/images/Recipe/Curries/eggbombcurry.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["softPotato"], 4),
            new IngredientsInDishes(pokesleepIngredients["fancyApple"], 11),
            new IngredientsInDishes(pokesleepIngredients["fancyEgg"], 8),
            new IngredientsInDishes(pokesleepIngredients["honey"], 12),
        ], 
        1.25
    ),
    "sporeMushroomCurry": new Recipe(
        "キノコのほうしカレー", 
        "/images/Recipe/Curries/sporemushroomcurry.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["softPotato"], 9),
            new IngredientsInDishes(pokesleepIngredients["tastyMushroom"], 14),
        ], 
        1.17
    ),
    "bulkUpBeanCurry": new Recipe(
        "ビルドアップマメカレー", 
        "/images/Recipe/Curries/bulkupbeancurry.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["greengrassSoybeans"], 12),
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 6),
            new IngredientsInDishes(pokesleepIngredients["fancyEgg"], 4),
            new IngredientsInDishes(pokesleepIngredients["fieryHerb"], 4),
        ], 
        1.17
    ),
    "softPotatoChowder": new Recipe(
        "ほっこりホワイトシチュー", 
        "/images/Recipe/Curries/softpotatochowder.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 10),
            new IngredientsInDishes(pokesleepIngredients["softPotato"], 8),
            new IngredientsInDishes(pokesleepIngredients["tastyMushroom"], 4),
        ], 
        1.17
    ),
    "softOmeletteCurry": new Recipe(
        "とけるオムカレー", 
        "/images/Recipe/Curries/softOmeletteCurry.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["fancyEgg"], 10),
            new IngredientsInDishes(pokesleepIngredients["snoozyTomato"], 6),
        ], 
        1.11
    ),
    "solarPowerTomatoCurry": new Recipe(
        "サンパワートマトカレー", 
        "/images/Recipe/Curries/solarpowertomatocurry.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["fieryHerb"], 5),
            new IngredientsInDishes(pokesleepIngredients["snoozyTomato"], 10),
        ], 
        1.11
    ),
    "droughtCutletCurry": new Recipe(
        "ひでりカツレツカレー", 
        "/images/Recipe/Curries/droughtkatsucurry.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 10),
            new IngredientsInDishes(pokesleepIngredients["pureOil"], 5),
        ], 
        1.11
    ),
    "cheeseburgerCurry": new Recipe(
        "満腹チーズバーグカレー", 
        "/images/Recipe/Curries/cheeseburgercurry.png ", 
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 8),
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 8),
        ], 
        1.11
    ),
    "beanBurgerCurry": new Recipe(
        "マメバーグカレー", 
        "/images/Recipe/Curries/beanburgercurry.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 7),
        ], 
        1.188//要検証1.06
    ),
    "babyHoneyCurry": new Recipe(
        "ベイビィハニーカレー", 
        "/images/Recipe/Curries/babyHoneyCurry.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["honey"], 7),
        ], 
        1.188//要検証1.06
    ),
    "simpleChowder": new Recipe(
        "たんじゅんホワイトシチュー", 
        "/images/Recipe/Curries/simplechowder.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 7),
        ], 
        1.188//要検証1.06
    ),
    "fancyAppleCurry": new Recipe(
        "とくせんリンゴカレー", 
        "/images/Recipe/Curries/fancyapplecurry.png", 
        [
            new IngredientsInDishes(pokesleepIngredients["fancyApple"], 7),
        ], 
        1.188//要検証1.06
    ),
};