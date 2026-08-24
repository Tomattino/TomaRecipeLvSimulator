import { pokesleepIngredients } from "../ingredients/pokesleepIngredients.js";
import { IngredientsInDishes } from "../../models/common/IngredientsInDishes.js";
import { Recipe } from "../../models/common/Recipe.js";

export const saladRecipes = {
    "ScaldChunkySalad": new Recipe(
        "ごろごろねっとうサラダ",
        "/images/Recipe/Salad/ScaldChunkySalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["softPotato"], 30),
            new IngredientsInDishes(pokesleepIngredients["tastyMushroom"], 27),
            new IngredientsInDishes(pokesleepIngredients["greengrassCorn"], 18),
            new IngredientsInDishes(pokesleepIngredients["pumpkin"], 20),
        ],
        25356
    ),
    "bulldozeGuacamoleAndChips": new Recipe(
        "じならしワカモレチップス",
        "/images/Recipe/Salad/bulldozeguacamoleandchips.png",
        [
            new IngredientsInDishes(pokesleepIngredients["greengrassSoybeans"], 22),
            new IngredientsInDishes(pokesleepIngredients["fieryHerb"], 30),
            new IngredientsInDishes(pokesleepIngredients["greengrassCorn"], 25),
            new IngredientsInDishes(pokesleepIngredients["glossyAvocado"], 28),
        ],
        25162
    ),
    "defiantCoffeeSalad": new Recipe(
        "まけんきコーヒーサラダ",
        "/images/Recipe/Salad/defiantcoffee-dressedsalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 28),
            new IngredientsInDishes(pokesleepIngredients["softPotato"], 22),
            new IngredientsInDishes(pokesleepIngredients["pureOil"], 22),
            new IngredientsInDishes(pokesleepIngredients["rousingCoffee"], 28),
        ],
        20218
    ),
    "appleAcidYogurtDressedSalad": new Recipe(
        "りんごさんヨーグルトサラダ",
        "/images/Recipe/Salad/appleacidyogurt-dressedsalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 18),
            new IngredientsInDishes(pokesleepIngredients["fancyApple"], 28),
            new IngredientsInDishes(pokesleepIngredients["fancyEgg"], 35),
            new IngredientsInDishes(pokesleepIngredients["snoozyTomato"], 23),
        ],
        19293
    ),
    "petalBlizzardLayeredSalad": new Recipe(
        "はなふぶきミモザサラダ",
        "/images/Recipe/Salad/petalblizzardlayeredsalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 12),
            new IngredientsInDishes(pokesleepIngredients["softPotato"], 15),
            new IngredientsInDishes(pokesleepIngredients["pureOil"], 17),
            new IngredientsInDishes(pokesleepIngredients["fancyEgg"], 25),
        ],
        11881
    ),
    "ninjaSalad": new Recipe(
        "ニンジャサラダ",
        "/images/Recipe/Salad/ninjasalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["greengrassSoybeans"], 19),
            new IngredientsInDishes(pokesleepIngredients["largeLeek"], 15),
            new IngredientsInDishes(pokesleepIngredients["warmingGinger"], 11),
            new IngredientsInDishes(pokesleepIngredients["tastyMushroom"], 12),
        ],
        11659
    ),
    "greengrassSalad": new Recipe(
        "ワカクササラダ",
        "/images/Recipe/Salad/greengrasssalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["softPotato"], 9),
            new IngredientsInDishes(pokesleepIngredients["pureOil"], 22),
            new IngredientsInDishes(pokesleepIngredients["snoozyTomato"], 14),
            new IngredientsInDishes(pokesleepIngredients["greengrassCorn"], 17),
        ],
        11393
    ),
    "crossChopSalad": new Recipe(
        "クロスチョップドサラダ",
        "/images/Recipe/Salad/crosschopsalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 15),
            new IngredientsInDishes(pokesleepIngredients["fancyEgg"], 20),
            new IngredientsInDishes(pokesleepIngredients["snoozyTomato"], 10),
            new IngredientsInDishes(pokesleepIngredients["greengrassCorn"], 11),
        ],
        8755
    ),
    "slowpokeTailPepperSalad": new Recipe(
        "ヤドンテールのペッパーサラダ",
        "/images/Recipe/Salad/slowpoketailpeppersalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["pureOil"], 15),
            new IngredientsInDishes(pokesleepIngredients["fieryHerb"], 10),
            new IngredientsInDishes(pokesleepIngredients["slowpokeTail"], 10),
        ],
        8169
    ),
    "calmMindFruitSalad": new Recipe(
        "めいそうスイートサラダ",
        "/images/Recipe/Salad/calmmindfruitsalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["fancyApple"], 21),
            new IngredientsInDishes(pokesleepIngredients["honey"], 16),
            new IngredientsInDishes(pokesleepIngredients["greengrassCorn"], 12),
        ],
        7675
    ),
    "lusciousAvocadoSalad": new Recipe(
        "くだけるアボカドサラダ",
        "/images/Recipe/Salad/lusciousavocadosalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["greengrassSoybeans"], 18),
            new IngredientsInDishes(pokesleepIngredients["pureOil"], 10),
            new IngredientsInDishes(pokesleepIngredients["glossyAvocado"], 14),
        ],
        7125
    ),
    "sporeMushroomSalad": new Recipe(
        "キノコのほうしサラダ",
        "/images/Recipe/Salad/sporemushroomsalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["pureOil"], 8),
            new IngredientsInDishes(pokesleepIngredients["snoozyTomato"], 8),
            new IngredientsInDishes(pokesleepIngredients["tastyMushroom"], 17),
        ],
        5859
    ),
    "overheatSalad": new Recipe(
        "オーバーヒートサラダ",
        "/images/Recipe/Salad/overheatgingersalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["fieryHerb"], 17),
            new IngredientsInDishes(pokesleepIngredients["snoozyTomato"], 8),
            new IngredientsInDishes(pokesleepIngredients["warmingGinger"], 10),
        ],
        5225
    ),
    "gluttonyPotatoSalad": new Recipe(
        "くいしんぼうポテトサラダ",
        "/images/Recipe/Salad/gluttonypotatosalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 7),
            new IngredientsInDishes(pokesleepIngredients["softPotato"], 14),
            new IngredientsInDishes(pokesleepIngredients["fancyApple"], 6),
            new IngredientsInDishes(pokesleepIngredients["fancyEgg"], 9),
        ],
        5040
    ),
    "moodyMeatChocolateSalad": new Recipe(
        "ムラっけチョコミートサラダ",
        "/images/Recipe/Salad/contrarychocolatemeatsalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["soothingCacao"], 14),
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 9),
        ],
        3665
    ),
    "waterVeilTofuSalad": new Recipe(
        "うるおいとうふサラダ",
        "/images/Recipe/Salad/waterveiltofusalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["greengrassSoybeans"], 15),
            new IngredientsInDishes(pokesleepIngredients["snoozyTomato"], 9),
        ],
        3113
    ),
    "superpowerExtremeSalad": new Recipe(
        "ばかぢからワイルドサラダ",
        "/images/Recipe/Salad/superpowerextremesalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 9),
            new IngredientsInDishes(pokesleepIngredients["softPotato"], 3),
            new IngredientsInDishes(pokesleepIngredients["fancyEgg"], 5),
            new IngredientsInDishes(pokesleepIngredients["warmingGinger"], 6),
        ],
        3046
    ),
    "moomooCaprese": new Recipe(
        "モーモーカプレーゼ",
        "/images/Recipe/Salad/moomoocapresesalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 12),
            new IngredientsInDishes(pokesleepIngredients["pureOil"], 5),
            new IngredientsInDishes(pokesleepIngredients["snoozyTomato"], 6),
        ],
        2942
    ),
    "immunityLeekSalad": new Recipe(
        "めんえきねぎサラダ",
        "/images/Recipe/Salad/immunityleeksalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["largeLeek"], 10),
            new IngredientsInDishes(pokesleepIngredients["warmingGinger"], 5),
        ],
        2845
    ),
    "furyAttackCornSalad": new Recipe(
        "みだれづきコーンサラダ",
        "/images/Recipe/Salad/furyattackcornsalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["pureOil"], 8),
            new IngredientsInDishes(pokesleepIngredients["greengrassCorn"], 9),
        ],
        2785
    ),
    "dazzlingAppleCheeseSalad": new Recipe(
        "メロメロりんごのチーズサラダ",
        "/images/Recipe/Salad/dazzlingapplecheesesalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 5),
            new IngredientsInDishes(pokesleepIngredients["pureOil"], 3),
            new IngredientsInDishes(pokesleepIngredients["fancyApple"], 15),
        ],
        2655
    ),
    "heatWaveTofuSalad": new Recipe(
        "ねっぷうとうふサラダ",
        "/images/Recipe/Salad/heatwavetofusalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["greengrassSoybeans"], 10),
            new IngredientsInDishes(pokesleepIngredients["fieryHerb"], 6),
        ],
        2114
    ),
    "snowCloakCaesarSalad": new Recipe(
        "ゆきかきシーザーサラダ",
        "/images/Recipe/Salad/snowcloakcaesarsalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["moomooMilk"], 10),
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 6),
        ],
        1898
    ),
    "snoozyTomatoSalad": new Recipe(
        "あんみんトマトサラダ",
        "/images/Recipe/Salad/snoozytomatosalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["snoozyTomato"], 8),
        ],
        1045
    ),
    "beanHamSalad": new Recipe(
        "マメハムサラダ",
        "/images/Recipe/Salad/beanhamsalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["beanSausage"], 8),
        ],
        978
    ),
    "fancyAppleSalad": new Recipe(
        "とくせんリンゴサラダ",
        "/images/Recipe/Salad/fancyapplesalad.png",
        [
            new IngredientsInDishes(pokesleepIngredients["fancyApple"], 8),
        ],
        855
    ),
};
