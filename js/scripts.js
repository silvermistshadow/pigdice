//Back end
//this function is from a post on StackExchange
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

Game.prototype.playerTurns = function() {
  $("button#rollP2").prop('disabled', true);
  $("button#holdP2").prop('disabled', true);
  function switchTurns() {
    if (currentTurn === "P1") {
      $("button#rollP1").prop('disabled', true);
      $("button#holdP1").prop('disabled', true);
      $("button#rollP2").prop('disabled', false);
      $("button#holdP2").prop('disabled', false);
      console.log("I have opened the mayor");
      return currentTurn = "P2";
    } else if (currentTurn === "P2") {
      $("button#rollP2").prop('disabled', true);
      $("button#holdP2").prop('disabled', true);
      $("button#rollP1").prop('disabled', false);
      $("button#holdP1").prop('disabled', false);
      console.log("When the power drops");
      return currentTurn = "P1";
    }
    else {
      console.log("FLAGRANT SYSTEM ERROR")
    }
  };
};

Game.prototype.diceRoller = function() {
  var numRolledP1 = [];
  var numRolledP2 = [];
  var totalP1 = [];
  var totalP2 = [];
  var turnScoreP1;
  var turnScoreP2;
  this.playerTurns();
  var anchorThis = this;
  $("#game").on("click", "button#rollP1", rollP1());
  $("#game").on("click", "button#holdP1", holdP1());
  $("#game").on("click", "button#rollP2", rollP2());
  $("#game").on("click", "button#holdP2", holdP2());
};

Game.prototype.rollP1 = function() {
    $("#holdError").hide();
    console.log("I want you to go in and go in and go in");
    var currentNum = getRandomIntInclusive(1, 6);
    if (currentNum !== 1) {
        numRolledP1.push(currentNum);
    }
    else {
        currentTurn = this.playerTurns().switchTurns();
    }
};

Game.prototype.rollP2 = function() {
    $("#holdError").hide();
    var currentNum = getRandomIntInclusive(1, 6);
      if (currentNum !== 1) {
        numRolledP2.push(currentNum)
      }
      else {
        currentTurn = anchorThis.playerTurns().switchTurns();
      }
};

Game.prototype.holdP1 = function() {
  console.log("like the US Marshall and his three daughters");
  if (numRolledP1.length >= 1) {
    currentTurn = anchorThis.playerTurns().switchTurns();
    player1.turns += 1;
    turnScoreP1 = numRolledP1.reduce((a, b) => a + b, 0);
    if (totalP1 >= 1) {
      totalP1.push(turnScoreP1);
      totalP1 = totalP1.reduce((a, b) => a + b, 0);
      player1.score += totalP1;
    }
    else {
      totalP1.push(turnScoreP1);
      player1.score += totalP1;
    }
  }
  else {
    $("#holdError").show();
  }
};

Game.prototype.holdP2 = function() {
  if (numRolledP2.length >= 1) {
    currentTurn = anchorThis.playerTurns().switchTurns();
    player2.turns += 1;
    turnScoreP2 = numRolledP2.reduce((a, b) => a + b, 0);
    if (totalP2 >= 1) {
        totalP2.push(turnScoreP2);
        totalP2 = totalP2.reduce((a, b) => a + b, 0);
        player2.score += totalP2;
      }
    else {
        totalP2.push(turnScoreP2);
        player2.score += totalP2;
    }
  }
    else {
      $("#holdError").show();

    }
};
Player.prototype.playerInit = function(name) {
  this.name = name;
  this.score = 0;
  this.turns = 0;
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


$(document).ready(function() {

  $("form#playersInput").show()
  $("#holdError").hide();
  $("form#playersInput").submit(function(event) {
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
  });

});
