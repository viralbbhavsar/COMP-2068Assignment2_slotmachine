
var canvas;
var stage: createjs.Stage;

// Objects that are going to be used throughout the game 
var game: createjs.Container;
var background: createjs.Bitmap;
var spinButton: createjs.Bitmap;
var betMaxButton: createjs.Bitmap;
var resetButton: createjs.Bitmap;
var betOneButton: createjs.Bitmap;
var closeButton: createjs.Bitmap;

var tiles: createjs.Bitmap[] = [];
var tileContainers: createjs.Container[] = [];

// Variables
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var results = "";
var winRatio = 0;
var betMax = 70;


//Reel Variables
var apple = 0;
var bigwin = 0;
var diamond = 0;
var dollar = 0;
var flower = 0;
var srtawberry = 0;
var seven = 0;
var blanks = 0;

//Text objects to show user winnings, money and bet
var playerBetText: createjs.Text;
var playerMoneyText: createjs.Text;
var winnerMoneyText: createjs.Text;

// fucntion which is called when game is loaded
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


// function to reset all reel variables
function resetReels() {
    apple = 0;
    bigwin = 0;
    diamond = 0;
    dollar = 0;
    flower = 0;
    srtawberry = 0;
    seven = 0;
    blanks = 0;
}

// function to reset all variables
function resetEverything() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
    winnings = 0;
}
// Event handlers

// function that shows player's standings in the game
function showPlayerStatus() {
    showPlayerBetText();
    showPlayerMoneyText();
    showWinningMoneyText();
}

// function for buttons like hover over, hover out and click events
function spinButtonOut() {
    spinButton.alpha = 1.0;
}

function spinButtonOver() {
    spinButton.alpha = 0.5;
}

function spinButtonClicked() {
    resetReels();

    // conditions to check if user is playing more than one time then removes previous object
    if (turn > 0) {
        game.removeChildAt(8, 9, 10);

    //condition to check if user has enough money to bet or not
    }
    if (playerBet > playerMoney) {
        if (confirm("You do not have enough money to place the bet.\nDo you want to play again?")) {
            resetEverything();
            resetReels();
            showPlayerStatus();
        }
    }
    else if (playerBet <= 0) {
        alert("Please place a bet.");
    }
    else {
    spinResult = Reels();
    results = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
    console.log(results);
    
    for (var tile = 0; tile < 3; tile++) {

        tiles[tile] = new createjs.Bitmap("assets/images/" + spinResult[tile] + ".jpg");
        tiles[tile].x = 62 + (80 * tile);
        tiles[tile].y = 244;

        game.addChild(tiles[tile]);
        console.log(game.getNumChildren());
    }
        turn++;
        determineWinnings();
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
    betOneButton.alpha = 0.6;
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
    betMaxButton.alpha = 0.6;
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
    resetButton.alpha = 0.6;
    console.log("mouseover");
}

function resetButtonClicked() {
    resetEverything();
    resetReels();
    showPlayerBetText();
    showPlayerMoneyText();
}
function closeButtonClicked() {
    if(confirm("Do you really want to quit the game?")) {
            close();
        }
}

function closeButtonOut() {
    closeButton.alpha = 1.0;
    console.log("mouseout");
}

function closeButtonOver() {
    closeButton.alpha = 0.6;
    console.log("mouseover");
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

// When this function is called it determines the betLine results.

function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "apple";
                apple++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "diamond";
                bigwin++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "dollar";
                diamond++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "flower";
                dollar++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "bigwin";
                flower++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "srtawberry";
                srtawberry++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "seven";
                seven++;
                break;
        }
    }
    return betLine;
}


/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (apple == 3) {
            winnings = playerBet * 10;
        }
        else if (bigwin == 3) {
            winnings = playerBet * 20;
        }
        else if (diamond == 3) {
            winnings = playerBet * 30;
        }
        else if (dollar == 3) {
            winnings = playerBet * 40;
        }
        else if (flower == 3) {
            winnings = playerBet * 50;
        }
        else if (srtawberry == 3) {
            winnings = playerBet * 75;
        }
        else if (seven == 3) {
            winnings = playerBet * 100;
        }
        else if (apple == 2) {
            winnings = playerBet * 2;
        }
        else if (bigwin == 2) {
            winnings = playerBet * 2;
        }
        else if (diamond == 2) {
            winnings = playerBet * 3;
        }
        else if (dollar == 2) {
            winnings = playerBet * 4;
        }
        else if (flower == 2) {
            winnings = playerBet * 5;
        }
        else if (srtawberry == 2) {
            winnings = playerBet * 10;
        }
        else if (seven == 2) {
            winnings = playerBet * 20;
        }
        else {
            winnings = playerBet * 1;
        }

        if (seven == 1) {
            winnings = playerBet * 5;
        }
        winNumber++;
        playerMoney += winnings;
    }
    else {
        lossNumber++;
    }

}

// this funciton shows player's bet on screen
function showPlayerBetText() {
    game.removeChild(playerBetText);
    playerBetText = new createjs.Text("$" + playerBet, "24px Arial", "Black");
    playerBetText.x = 223;
    playerBetText.y = 464;
    game.addChild(playerBetText);
}

// this funciton shows player's money on screen
function showPlayerMoneyText() {
    game.removeChild(playerMoneyText);
    playerMoneyText = new createjs.Text("$"+ playerMoney, "24px Arial", "Black");
    playerMoneyText.x = 106;
    playerMoneyText.y = 464;
    game.addChild(playerMoneyText);
}

// this funciton shows player's winnings on screen
function showWinningMoneyText() {
    game.removeChild(winnerMoneyText);
    winnerMoneyText = new createjs.Text("$" + winnings, "24px Arial", "Black");
    winnerMoneyText.x = 150;
    winnerMoneyText.y = 412;
    game.addChild(winnerMoneyText);
    console.log(winnings);
}

function createUI():void {
    // instantiate my background
    background = new createjs.Bitmap("assets/images/background.jpg");
    game.addChild(background);

    // Spin Button
    spinButton = new createjs.Bitmap("assets/images/spinButton.jpg");
    spinButton.x = 265;
    spinButton.y = 497;
    game.addChild(spinButton);

    spinButton.addEventListener("click", spinButtonClicked);
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

    //Close Button
    closeButton = new createjs.Bitmap("assets/images/closeButton.jpg");
    closeButton.x = 295;
    closeButton.y = 179;
    game.addChild(closeButton);

    closeButton.addEventListener("click", closeButtonClicked);
    closeButton.addEventListener("mouseover", closeButtonOver);
    closeButton.addEventListener("mouseout", closeButtonOut);
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