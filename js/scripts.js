//Back end
//this function is from a post on StackExchange
var numRolledP1 = [];
var numRolledP2 = [];
var totalP1 = [];
var totalP2 = [];
var turnScoreP1;
var turnScoreP2;
var rolledThisTurn = [];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function Game(player) {
  this.Player = player;
};

function Player() {
  this.name
  this.score
  this.turns
};


var currentTurn = "P1";

Game.prototype.playerTurns = function () {
  if (currentTurn === "P1") {
    $("button#rollP1").prop('disabled', true);
    $("button#holdP1").prop('disabled', true);
    $("button#rollP2").prop('disabled', false);
    $("button#holdP2").prop('disabled', false);
    console.log("I have opened the mayor");
    displayScore();
    rolledThisTurn = [];
    return currentTurn = "P2";
  } else if (currentTurn === "P2") {
    $("button#rollP2").prop('disabled', true);
    $("button#holdP2").prop('disabled', true);
    $("button#rollP1").prop('disabled', false);
    $("button#holdP1").prop('disabled', false);
    console.log("When the power drops");
    displayScore();
    rolledThisTurn = [];
    return currentTurn = "P1";
  }
  else {
    console.log("FLAGRANT SYSTEM ERROR")
  }

};



Game.prototype.rollP1 = function () {
  $("#holdError").hide();
  console.log("I want you to go in and go in and go in");
  var currentNum = getRandomIntInclusive(1, 6);
  if (currentNum !== 1) {
    numRolledP1.push(currentNum);
    rolledThisTurn.push(currentNum);
    displayRoll();
  }
  else {
    currentTurn = this.playerTurns();
  }
};

Game.prototype.rollP2 = function () {
  $("#holdError").hide();
  var currentNum = getRandomIntInclusive(1, 6);
  if (currentNum !== 1) {
    numRolledP2.push(currentNum)
    rolledThisTurn.push(currentNum);
    displayRoll();
  }
  else {
    currentTurn = this.playerTurns();
  }
};

Game.prototype.holdP1 = function () {
  console.log("like the US Marshall and his three daughters");
  if (numRolledP1.length >= 1) {
    currentTurn = this.playerTurns();
    player1.turns += 1;
    turnScoreP1 = parseInt(numRolledP1.reduce((a, b) => a + b, 0));
    console.log(turnScoreP1);
    if (totalP1.length >= 1)  {
      console.log("get pills against my orders");
      totalP1.push(turnScoreP1);
      var score = [parseInt(totalP1.reduce((a, b) => a + b, 0))];
      player1.score = score;
      console.log(player1.score);
      numRolledP1 = [];
      if (score >= 100) {
        console.log("the most silent way to eliminate Manderly")
        gameEnd(player1);
      }
      score = [];
    }
    else {
      console.log("get moving!");
      totalP1.push(turnScoreP1);
      player1.score += totalP1[0];
      console.log(player1.score);
      numRolledP1 = [];
    }
  }
  else {
    $("#holdError").show();
  }
};

Game.prototype.holdP2 = function () {
  if (numRolledP2.length >= 1) {
    currentTurn = this.playerTurns();
    player2.turns += 1;
    turnScoreP2 = numRolledP2.reduce((a, b) => a + b, 0);
    if (totalP2.length >= 1)  {
      console.log("get pills against my orders");
      totalP2.push(turnScoreP2);
      var score = [parseInt(totalP2.reduce((a, b) => a + b, 0))];
      player2.score = score;
      console.log(player2.score);
      numRolledP2 = [];
      if (score >= 100) {
        console.log("the most silent way to eliminate Manderly")
        gameEnd(player2);
      }
      score = [];
    }
    else if (totalP2 === 0) {
      totalP2.push(turnScoreP2);
      player2.score += totalP2[0];
      numRolledP2 = [];
    }
  }
  else {
    $("#holdError").show();

  }
};

Game.prototype.diceRoller = function () {
  console.log("diceRoller")
  //$("#game").on("click", "button#rollP1", anchorThis.rollP1());
  //$("#game").on("click", "button#holdP1", anchorThis.holdP1());
  //$("#game").on("click", "button#rollP2", anchorThis.rollP2());
  //$("#game").on("click", "button#holdP2", anchorThis.holdP2());
};


Player.prototype.playerInit = function (name) {
  this.name = name;
  this.score = 0;
  this.turns = 0;
};

function gameEnd(player) {
  $("#gameEnd").html('Winner:' + player.name.toString());
};

var player1 = new Player();
var player2 = new Player();
var playerArray = [player1, player2];
var newGame = new Game(playerArray);

//UI
function displayScore() {
  $("#p1Score").html('Score:' + ' ' + player1.score);
  $("#p1Turns").html('Turns:' + ' ' + player1.turns);
  $("#p2Score").html('Score:' + ' ' + player2.score);
  $("#p2Turns").html('Turns:' + ' ' + player2.turns);
  console.log("And we lose the vaccine");
};

function displayRoll() {
  var rolledString = rolledThisTurn.toString();
  $("#currentRoll").html('Rolled:' + ' ' +  rolledString);
}

$(document).ready(function () {

  $("form#playersInput").show()
  $("#holdError").hide();
  $("form#playersInput").submit(function (event) {
    $("button#rollP2").prop('disabled', true);
    $("button#holdP2").prop('disabled', true);
    event.preventDefault();
    $("form#playersInput").hide()
    var inputP1 = $("input#nameP1").val();
    var inputP2 = $("input#nameP2").val();
    $("game").show();
    $("#p1Name").text(inputP1);
    $("#p2Name").text(inputP2);
    player1.playerInit(inputP1);
    player2.playerInit(inputP2)
    displayScore();
    newGame.diceRoller();
    $("button#rollP1").click(function () {
      newGame.rollP1();
    });
    $("button#holdP1").click(function () {
      newGame.holdP1();
    });
    $("button#rollP2").click(function () {
      newGame.rollP2();
    });
    $("button#holdP2").click(function () {
      newGame.holdP2();
    });
    // $("#game").on("click", "button#rollP1", newGame.rollP1());
    // $("#game").on("click", "button#holdP1", newGame.holdP1());
    // $("#game").on("click", "button#rollP2", newGame.rollP2());
    // $("#game").on("click", "button#holdP2", newGame.holdP2());
  });
  
});
