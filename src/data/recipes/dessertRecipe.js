import { pokesleepIngredients } from "../ingredients/pokesleepIngredients.js";
import { IngredientsInDishes } from "../../models/common/IngredientsInDishes.js";
import { Recipe } from "../../models/common/Recipe.js";

export const dessertRecipes = {
    "honeyGatherChocolateWaffles": new Recipe(
        "ミツあつめチョコワッフル",
        "/images/Recipe/Dessert/honeygatherchocolatewaffles.png",
        [
            new IngredientsInDishes(pokesleepIngredients["honey"], 38),
            new IngredientsInDishes(pokesleepIngredients["greengrassCorn"], 28),
            new IngredientsInDishes(pokesleepIngredients["pureOil"], 28),
            new IngredientsInDishes(pokesleepIngredients["soothingCacao"], 21),
        ],
        25484
    ),
    "scaryFacePancakes": new Recipe(
        "ドキドキこわいかおパンケーキ",
        "/images/Recipe/Dessert/scaryfacepancakes.png",
        [
            new IngredientsInDishes(pokesleepIngredients["fancyEgg"], 24),
            new IngredientsInDishes(pokesleepIngredients["snoozyTomato"], 29),
            new IngredientsInDishes(pokesleepIngredients["honey"], 32),
            new IngredientsInDishes(pokesleepIngredients["pumpkin"], 18),
        ],
        24354
    ),
    "clodsireEclair": new Recipe(
        "ドオーのエクレア",
        "/images/Recipe/Dessert/clodsireeclair.png",
        [
        new IngredientsInDishes(pokesleepIngredients["soothingCacao"], 30),
        new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 26),
        new IngredientsInDishes(pokesleepIngredients["honey"], 22),
        new IngredientsInDishes(pokesleepIngredients["rousingCoffee"], 24),
        ],
        20885
    ),
    "zingZapSpicedCola": new Recipe(
        "スパークスパイスコーラ",
        "/images/Recipe/Dessert/zingzapspicedcola.png",
        [
        new IngredientsInDishes(pokesleepIngredients["largeLeek"], 20),
        new IngredientsInDishes(pokesleepIngredients["fancyApple"], 35),
        new IngredientsInDishes(pokesleepIngredients["warmingGinger"], 20),
        new IngredientsInDishes(pokesleepIngredients["rousingCoffee"], 12),
        ],
        17494
    ),
    "flowerGiftMacarons": new Recipe(
        "フラワーギフトマカロン",
        "/images/Recipe/Dessert/flowergiftmacarons.png",
        [
        new IngredientsInDishes(pokesleepIngredients["soothingCacao"], 25),
        new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 10),
        new IngredientsInDishes(pokesleepIngredients["fancyEgg"], 25),
        new IngredientsInDishes(pokesleepIngredients["honey"], 17),
        ],
        13834
    ),
    "teatimeCornScones": new Recipe(
        "おちゃかいコーンスコーン",
        "/images/Recipe/Dessert/teatimecornscones.png",
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 9),
            new IngredientsInDishes(pokesleepIngredients["fancyApple"], 20),
            new IngredientsInDishes(pokesleepIngredients["warmingGinger"], 20),
            new IngredientsInDishes(pokesleepIngredients["greengrassCorn"], 18),
        ],
        10925
    ),
    "leafTornadoSmoothie": new Recipe(
        "グラスミキサースムージー",
        "/images/Recipe/Dessert/leaftornadosmoothie.png",
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 14),
            new IngredientsInDishes(pokesleepIngredients["snoozyTomato"], 16),
            new IngredientsInDishes(pokesleepIngredients["glossyAvocado"], 18),
        ],
        8165
    ),
    "jigglypuffsFruityFlan": new Recipe(
        "プリンのプリンアラモード",
        "/images/Recipe/Dessert/jigglypuff'sfruityflan.png",
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 10),
            new IngredientsInDishes(pokesleepIngredients["fancyApple"], 10),
            new IngredientsInDishes(pokesleepIngredients["fancyEgg"], 15),
            new IngredientsInDishes(pokesleepIngredients["honey"], 20),
        ],
        7594
    ),
    "moldBreakerCornTiramisu": new Recipe(
        "かたやぶりコーンティラミス",
        "/images/Recipe/Dessert/moldbreakercorntiramisu.png",
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 12),
            new IngredientsInDishes(pokesleepIngredients["greengrassCorn"], 14),
            new IngredientsInDishes(pokesleepIngredients["rousingCoffee"], 14),
        ],
        7125
    ),
    "earlyBirdCoffeeJelly": new Recipe(
        "はやおきコーヒーゼリー",
        "/images/Recipe/Dessert/earlybirdcoffeejelly.png",
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 14),
            new IngredientsInDishes(pokesleepIngredients["honey"], 12),
            new IngredientsInDishes(pokesleepIngredients["rousingCoffee"], 16),
        ],
        6793
    ),
    "explosionPopcorn": new Recipe(
        "だいばくはつポップコーン",
        "/images/Recipe/Dessert/explosionpopcorn.png",
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 7),
            new IngredientsInDishes(pokesleepIngredients["pureOil"], 14),
            new IngredientsInDishes(pokesleepIngredients["greengrassCorn"], 15),
        ],
        6048
    ),
    "hugePowerSoyDonuts": new Recipe(
        "ちからもちソイドーナッツ",
        "/images/Recipe/Dessert/hugepowersoydonuts.png",
        [
            new IngredientsInDishes(pokesleepIngredients["greengrassSoybeans"], 16),
            new IngredientsInDishes(pokesleepIngredients["soothingCacao"], 7),
            new IngredientsInDishes(pokesleepIngredients["pureOil"], 12),
        ],
        5547
    ),
    "nerolisRestorativeTea": new Recipe(
        "ネロリのデトックスティー",
        "/images/Recipe/Dessert/neroli'srestorativetea.png",
        [
            new IngredientsInDishes(pokesleepIngredients["fancyApple"], 15),
            new IngredientsInDishes(pokesleepIngredients["warmingGinger"], 11),
            new IngredientsInDishes(pokesleepIngredients["tastyMushroom"], 9),
        ],
        5065
    ),
    "steadfastGingerCookies": new Recipe(
        "ふくつのジンジャークッキー",
        "/images/Recipe/Dessert/steadfastgingercookies.png",
        [
            new IngredientsInDishes(pokesleepIngredients["soothingCacao"], 5),
            new IngredientsInDishes(pokesleepIngredients["fancyEgg"], 4),
            new IngredientsInDishes(pokesleepIngredients["honey"], 14),
            new IngredientsInDishes(pokesleepIngredients["warmingGinger"], 12),
        ],
        4921
    ),
    "lovelyKissSmoothie": new Recipe(
        "あくまのキッスフルーツオレ",
        "/images/Recipe/Dessert/lovelykisssmoothie.png",
        [
            new IngredientsInDishes(pokesleepIngredients["soothingCacao"], 8),
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 9),
            new IngredientsInDishes(pokesleepIngredients["fancyApple"], 11),
            new IngredientsInDishes(pokesleepIngredients["honey"], 7),
        ],
        4734
    ),
    "sweetScentChocolateCake": new Recipe(
        "あまいかおりチョコケーキ",
        "/images/Recipe/Dessert/sweetscentchocolatecake.png",
        [
            new IngredientsInDishes(pokesleepIngredients["soothingCacao"], 8),
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 7),
            new IngredientsInDishes(pokesleepIngredients["honey"], 9),
        ],
        3378
    ),
    "petalDanceChocolateTart": new Recipe(
        "はなびらのまいチョコタルト",
        "/images/Recipe/Dessert/petaldancechocolatetart.png",
        [
            new IngredientsInDishes(pokesleepIngredients["soothingCacao"], 11),
            new IngredientsInDishes(pokesleepIngredients["fancyApple"], 11),
        ],
        3314
    ),
    "hustleProteinSmoothie": new Recipe(
        "はりきりプロテインスムージー",
        "/images/Recipe/Dessert/hustleproteinsmoothie.png",
        [
            new IngredientsInDishes(pokesleepIngredients["greengrassSoybeans"], 15),
            new IngredientsInDishes(pokesleepIngredients["soothingCacao"], 8),
        ],
        3263
    ),
    "bigMalasada": new Recipe(
        "おおきいマラサダ",
        "/images/Recipe/Dessert/bigmalasada.png",
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 7),
            new IngredientsInDishes(pokesleepIngredients["pureOil"], 10),
            new IngredientsInDishes(pokesleepIngredients["honey"], 6),
        ],
        3015
    ),
    "stalwartVegetableJuice": new Recipe(
        "マイペースやさいジュース",
        "/images/Recipe/Dessert/stalwartvegetablejuice.png",
        [
            new IngredientsInDishes(pokesleepIngredients["fancyApple"], 7),
            new IngredientsInDishes(pokesleepIngredients["snoozyTomato"], 9),
        ],
        1924
    ),
    "cloudNineSoyCake": new Recipe(
        "かるわざソイケーキ",
        "/images/Recipe/Dessert/cloudninesoycake.png",
        [
            new IngredientsInDishes(pokesleepIngredients["greengrassSoybeans"], 7),
            new IngredientsInDishes(pokesleepIngredients["fancyEgg"], 8),
        ],
        1924
    ),
    "emberGingerTea": new Recipe(
        "ひのこのジンジャーティー",
        "/images/Recipe/Dessert/embergingertea.png",
        [
            new IngredientsInDishes(pokesleepIngredients["fancyApple"], 7),
            new IngredientsInDishes(pokesleepIngredients["warmingGinger"], 9),
        ],
        1913
    ),
    "fluffySweetPotatoes": new Recipe(
        "じゅくせいスイートポテト",
        "/images/Recipe/Dessert/fluffysweetpotatoes.png",
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 5),
            new IngredientsInDishes(pokesleepIngredients["softPotato"], 9),
        ],
        1907
    ),
    "luckyChantApplePie": new Recipe(
        "ねがいごとアップルパイ",
        "/images/Recipe/Dessert/luckychantapplepie.png",
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 4),
            new IngredientsInDishes(pokesleepIngredients["fancyApple"], 12),
        ],
        1748
    ),
    "craftSodaPop": new Recipe(
        "クラフトサイコソーダ",
        "/images/Recipe/Dessert/craftsodapop.png",
        [
            new IngredientsInDishes(pokesleepIngredients["honey"], 9),
        ],
        1079
    ),
    "fancyAppleJuice": new Recipe(
        "とくせんリンゴジュース",
        "/images/Recipe/Dessert/fancyapplejuice.png",
        [
            new IngredientsInDishes(pokesleepIngredients["fancyApple"], 8),
        ],
        855
    ),
    "warmMoomooMilk": new Recipe(
        "モーモーホットミルク",
        "/images/Recipe/Dessert/warmmoomoomilk.png",
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 7),
        ],
        814
    ),
};
