import { pokesleepIngredients } from "../ingredients/pokesleepIngredients.js";
import { IngredientsInDishes } from "../../models/common/IngredientsInDishes.js";
import { Recipe } from "../../models/common/Recipe.js";

export const curryRecipes = {
    "bounceCurryUdon": new Recipe(
        "とびはねるカレーうどん",
        "/images/Recipe/Curries/bouncecurryudon.png",
        [
            new IngredientsInDishes(pokesleepIngredients["warmingGinger"], 39),
            new IngredientsInDishes(pokesleepIngredients["tastyMushroom"], 31),
            new IngredientsInDishes(pokesleepIngredients["fieryHerb"], 22),
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 20),
        ],
        25539
    ),
    "greengrassCurryBun": new Recipe(
        "ワカクサカレーパン",
        "/images/Recipe/Curries/greengrasscurrybun.png",
        [
            new IngredientsInDishes(pokesleepIngredients["warmingGinger"], 20),
            new IngredientsInDishes(pokesleepIngredients["fieryHerb"], 20),
            new IngredientsInDishes(pokesleepIngredients["greengrassSoybeans"], 8),
            new IngredientsInDishes(pokesleepIngredients["pureOil"], 15),
        ],
        10945
    ),
    "freshAvocadoGratin": new Recipe(
        "しんりょくアボカドグラタン",
        "/images/Recipe/Curries/overgrowavocadogratin.png",
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 41),
            new IngredientsInDishes(pokesleepIngredients["softPotato"], 20),
            new IngredientsInDishes(pokesleepIngredients["pureOil"], 32),
            new IngredientsInDishes(pokesleepIngredients["glossyAvocado"], 22),
        ],
        24802
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
        20655
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
        19061
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
        15621
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
        13690
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
        9445
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
        9010
    ),
    "grilledTailCurry": new Recipe(
        "あぶりテールカレー",
        "/images/Recipe/Curries/grilledtailcurry.png",
        [
            new IngredientsInDishes(pokesleepIngredients["fieryHerb"], 25),
            new IngredientsInDishes(pokesleepIngredients["slowpokeTail"], 8),
        ],
        7483
    ),
    "spicyLeekCurry": new Recipe(
        "からくちネギもりカレー",
        "/images/Recipe/Curries/spicyleekcurry.png",
        [
            new IngredientsInDishes(pokesleepIngredients["largeLeek"], 14),
            new IngredientsInDishes(pokesleepIngredients["fieryHerb"], 8),
            new IngredientsInDishes(pokesleepIngredients["warmingGinger"], 10),
        ],
        5900
    ),
    "piyopiyoPunchSpicyCurry": new Recipe(
        "ピヨピヨパンチ辛口カレー",
        "/images/Recipe/Curries/piyopiyoPunchSpicyCurry.png",
        [
            new IngredientsInDishes(pokesleepIngredients["fieryHerb"], 11),
            new IngredientsInDishes(pokesleepIngredients["honey"], 11),
            new IngredientsInDishes(pokesleepIngredients["rousingCoffee"], 11),
        ],
        5702
    ),
    "limberCornStew": new Recipe(
        "じゅうなんコーンシチュー",
        "/images/Recipe/Curries/limbercornstew.png",
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 8),
            new IngredientsInDishes(pokesleepIngredients["softPotato"], 8),
            new IngredientsInDishes(pokesleepIngredients["greengrassCorn"], 14),
        ],
        4670
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
        4523
    ),
    "sporeMushroomCurry": new Recipe(
        "キノコのほうしカレー",
        "/images/Recipe/Curries/sporemushroomcurry.png",
        [
            new IngredientsInDishes(pokesleepIngredients["softPotato"], 9),
            new IngredientsInDishes(pokesleepIngredients["tastyMushroom"], 14),
        ],
        4162
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
        3372
    ),
    "softPotatoChowder": new Recipe(
        "ほっこりホワイトシチュー",
        "/images/Recipe/Curries/softpotatochowder.png",
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 10),
            new IngredientsInDishes(pokesleepIngredients["softPotato"], 8),
            new IngredientsInDishes(pokesleepIngredients["tastyMushroom"], 4),
        ],
        3181
    ),
    "softOmeletteCurry": new Recipe(
        "とけるオムカレー",
        "/images/Recipe/Curries/softOmeletteCurry.png",
        [
            new IngredientsInDishes(pokesleepIngredients["fancyEgg"], 10),
            new IngredientsInDishes(pokesleepIngredients["snoozyTomato"], 6),
        ],
        2150
    ),
    "solarPowerTomatoCurry": new Recipe(
        "サンパワートマトカレー",
        "/images/Recipe/Curries/solarpowertomatocurry.png",
        [
            new IngredientsInDishes(pokesleepIngredients["fieryHerb"], 5),
            new IngredientsInDishes(pokesleepIngredients["snoozyTomato"], 10),
        ],
        2078
    ),
    "droughtCutletCurry": new Recipe(
        "ひでりカツレツカレー",
        "/images/Recipe/Curries/droughtkatsucurry.png",
        [
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 10),
            new IngredientsInDishes(pokesleepIngredients["pureOil"], 5),
        ],
        1942
    ),
    "cheeseburgerCurry": new Recipe(
        "満腹チーズバーグカレー",
        "/images/Recipe/Curries/cheeseburgercurry.png ",
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 8),
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 8),
        ],
        1910
    ),
    "beanBurgerCurry": new Recipe(
        "マメバーグカレー",
        "/images/Recipe/Curries/beanburgercurry.png",
        [
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 7),
        ],
        856
    ),
    "babyHoneyCurry": new Recipe(
        "ベイビィハニーカレー",
        "/images/Recipe/Curries/babyHoneyCurry.png",
        [
            new IngredientsInDishes(pokesleepIngredients["honey"], 7),
        ],
        839
    ),
    "simpleChowder": new Recipe(
        "たんじゅんホワイトシチュー",
        "/images/Recipe/Curries/simplechowder.png",
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 7),
        ],
        814
    ),
    "fancyAppleCurry": new Recipe(
        "とくせんリンゴカレー",
        "/images/Recipe/Curries/fancyapplecurry.png",
        [
            new IngredientsInDishes(pokesleepIngredients["fancyApple"], 7),
        ],
        748
    ),
};
