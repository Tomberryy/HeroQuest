
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
    <script src="./Classes/armes_armures.js"></script>
    <script src="./Classes/game.js"></script>
    <script src="./Classes/monster_hero.js"></script>
    <script src="./Classes/NPC.js"></script>
    <script>
        var heros = null;
        var weapons = [];
        var armors = [];
        var npcs = [];
        var monsters = null;
        var game = new Game;
    </script>
</head>
<body onload="game.init();">
    <div id="container">
        <div id="menuScene" class="scene">
            <div class="menuBox">
                <h1>HeroQuest</h1>
                <input type="text" id="heroName" placeholder="Hero's name">
                <button type="button" id="startGame" onclick="game.newGame();">Start!</button>
            </div>
        </div>
        <div id="playScene" class="scene">
            <div id="playBox">
                <div id="charStats"></div>
                <div id="charPic"></div>
                <div id="monsterPic"></div>
                <div id="monsterStats"></div>
            </div>
            <div id="fightButtons" class="eventButtons">
                <button type="button" id="heroAtk" onclick="game.heroAction(1, heros, monsters);">Attack!</button>
                <button type="button" id="heroDef" onclick="game.heroAction(2);">Defend!</button>
                <button type="button" id="heroFlee" onclick="game.heroAction(3);">Flee!</button>
            </div>
            <div id="shopButtons" class="eventButtons">
                <button type="button" id="buyWeapo">Buy weapon</button>
                <button type="button" id="buyArm">Buy armor</button>
                <button type="button" id="leaveShop">Leave</button>
            </div>
        </div>
        <div id="scoreScene" class="scene">
            <div class="menuBox">
                <h1 id="resultGame"><h1>
                <h1 id="scoreGame"><h1>
            </div>
        </div>
    </div>
</body>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</html>