var canvas;
var stage;

// Game Objects
var game;
var background;
var spinButton;
var betMaxButton;
var resetButton;
var betOneButton;

var tiles = [];
var tileContainers = [];

// Game Variables
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;
var betMax = 70;

/* Tally Variables */
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;

var playerBetText;
var playerMoneyText;
var winnerMoneyText;

function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}

function gameLoop() {
    stage.update(); // Refreshes our stage
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

function resetEverything() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}

// Event handlers
function showPlayerStatus() {
    showPlayerBetText();
    showPlayerMoneyText();
    showWinningMoneyText();
}
function spinButtonOut() {
    spinButton.alpha = 1.0;
}

function spinButtonOver() {
    spinButton.alpha = 0.5;
}

function spinReels() {
    resetFruitTally();

    // Add Spin Reels code here
    if (turn > 0) {
        game.removeChildAt(8, 9, 10);
    }
    if (playerBet > playerMoney) {
        if (confirm("You do not have enough money to place the bet.\nDo you want to play again?")) {
            resetEverything();
            showPlayerStatus();
        }
    } else if (playerBet <= 0) {
        alert("Please place a bet.");
    } else {
        spinResult = Reels();
        fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        console.log(fruits);

        for (var tile = 0; tile < 3; tile++) {
            tiles[tile] = new createjs.Bitmap("assets/images/" + spinResult[tile] + ".jpg");
            tiles[tile].x = 62 + (80 * tile);
            tiles[tile].y = 244;

            game.addChild(tiles[tile]);
            console.log(game.getNumChildren());
        }
        turn++;
        console.log(winnings);
        showPlayerStatus();
        playerBet = 0;
        showPlayerBetText();
        showWinningMoneyText();
    }
}

function betOneButtonOut() {
    betOneButton.alpha = 1.0;
    console.log("mouseout");
}

function betOneButtonOver() {
    betOneButton.alpha = 0.4;
    console.log("mouseover");
}

function betOneButtonClicked() {
    playerBet += 1;
    playerMoney -= 1;
    showPlayerBetText();
    showPlayerMoneyText();
}

function betMaxButtonOut() {
    betMaxButton.alpha = 1.0;
    console.log("mouseout");
}

function betMaxButtonOver() {
    betMaxButton.alpha = 0.4;
    console.log("mouseover");
}

function betMaxButtonClicked() {
    playerBet += 70;
    playerMoney -= 70;
    showPlayerBetText();
    showPlayerMoneyText();
}

function resetButtonOut() {
    resetButton.alpha = 1.0;
    console.log("mouseout");
}

function resetButtonOver() {
    resetButton.alpha = 0.4;
    console.log("mouseover");
}

function resetButtonClicked() {
    resetEverything();
    showPlayerBetText();
    showPlayerMoneyText();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    } else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37):
                betLine[spin] = "grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46):
                betLine[spin] = "banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54):
                betLine[spin] = "orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59):
                betLine[spin] = "cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62):
                betLine[spin] = "bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64):
                betLine[spin] = "bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65):
                betLine[spin] = "seven";
                sevens++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        } else if (bananas == 3) {
            winnings = playerBet * 20;
        } else if (oranges == 3) {
            winnings = playerBet * 30;
        } else if (cherries == 3) {
            winnings = playerBet * 40;
        } else if (bars == 3) {
            winnings = playerBet * 50;
        } else if (bells == 3) {
            winnings = playerBet * 75;
        } else if (sevens == 3) {
            winnings = playerBet * 100;
        } else if (grapes == 2) {
            winnings = playerBet * 2;
        } else if (bananas == 2) {
            winnings = playerBet * 2;
        } else if (oranges == 2) {
            winnings = playerBet * 3;
        } else if (cherries == 2) {
            winnings = playerBet * 4;
        } else if (bars == 2) {
            winnings = playerBet * 5;
        } else if (bells == 2) {
            winnings = playerBet * 10;
        } else if (sevens == 2) {
            winnings = playerBet * 20;
        } else {
            winnings = playerBet * 1;
        }

        if (sevens == 1) {
            winnings = playerBet * 5;
        }
        winNumber++;
        playerMoney += winnings;
    } else {
        lossNumber++;
    }
}

function showPlayerBetText() {
    game.removeChild(playerBetText);
    playerBetText = new createjs.Text("  " + playerBet, "22px  Consolas", "white");
    playerBetText.x = 225;
    playerBetText.y = 471;
    game.addChild(playerBetText);
}

function showPlayerMoneyText() {
    game.removeChild(playerMoneyText);
    playerMoneyText = new createjs.Text("  " + playerMoney, "22px  Consolas", "white");
    playerMoneyText.x = 109;
    playerMoneyText.y = 471;
    game.addChild(playerMoneyText);
}

function showWinningMoneyText() {
    game.removeChild(winnerMoneyText);
    winnerMoneyText = new createjs.Text("  " + winnings, "22px  Consolas", "white");
    winnerMoneyText.x = 151;
    winnerMoneyText.y = 418;
    game.addChild(winnerMoneyText);
    console.log(winnings);
}

function createUI() {
    // instantiate my background
    background = new createjs.Bitmap("assets/images/background.jpg");
    game.addChild(background);

    // Spin Button
    spinButton = new createjs.Bitmap("assets/images/spinButton.jpg");
    spinButton.x = 265;
    spinButton.y = 497;
    game.addChild(spinButton);

    spinButton.addEventListener("click", spinReels);
    spinButton.addEventListener("mouseover", spinButtonOver);
    spinButton.addEventListener("mouseout", spinButtonOut);

    //Reset Button
    resetButton = new createjs.Bitmap("assets/images/resetButton.jpg");
    resetButton.x = 46;
    resetButton.y = 497;
    game.addChild(resetButton);

    resetButton.addEventListener("click", resetButtonClicked);
    resetButton.addEventListener("mouseover", resetButtonOver);
    resetButton.addEventListener("mouseout", resetButtonOut);

    //Bet One button
    betOneButton = new createjs.Bitmap("assets/images/betOneButton.jpg");
    betOneButton.x = 120;
    betOneButton.y = 497;
    game.addChild(betOneButton);

    betOneButton.addEventListener("click", betOneButtonClicked);
    betOneButton.addEventListener("mouseover", betOneButtonOver);
    betOneButton.addEventListener("mouseout", betOneButtonOut);

    //Bet Max Button
    betMaxButton = new createjs.Bitmap("assets/images/betMaxButton.jpg");
    betMaxButton.x = 190;
    betMaxButton.y = 497;
    game.addChild(betMaxButton);

    betMaxButton.addEventListener("click", betMaxButtonClicked);
    betMaxButton.addEventListener("mouseover", betMaxButtonOver);
    betMaxButton.addEventListener("mouseout", betMaxButtonOut);
}

// Our Game Kicks off in here
function main() {
    // instantiate my game container
    game = new createjs.Container();
    game.x = 23;
    game.y = 6;

    // Create Slotmachine User Interface
    createUI();
    stage.addChild(game);
    resetEverything();
    showPlayerStatus();
}
//# sourceMappingURL=game.js.map
