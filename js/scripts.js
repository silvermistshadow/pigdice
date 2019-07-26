//Back end
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function Game(Players) {
  this.Players = Players;

};

function Players(p1, p2) {
  this.p1 = p1;
  this.p2 = p2;

};

Game.prototype.displayPlayers = function() {
  $("game").show();
  $("#player1").prepend(this.p1);
  $("#player2").prepend(this.p2);
}

Game.prototype.playerTurns = function() {
  var numRolledP1 = [];
  var numRolledP2 = [];
  var totalP1 = [];
  var totalP2 = [];
  var turnScoreP1;
  var turnScoreP2;
  var currentTurn = "P1";
  $("button#rollP2").prop('disabled', true)
  function switchTurns() {
    if (currentTurn === "P1") {
      $("button#rollP1").prop('disabled', true);
      $("button#holdP1").prop('disabled', true);
      $("button#rollP2").prop('disabled', false);
      $("button#holdP2").prop('disabled', false);
      return currentTurn = "P2";
    } else if (currentTurn === "P2") {
      $("button#rollP2").prop('disabled', true);
      $("button#holdP2").prop('disabled', true);
      $("button#rollP1").prop('disabled', false);
      $("button#holdP1").prop('disabled', false);
      return currentTurn = "P1";
    }
    else {
      console.log("FLAGRANT SYSTEM ERROR")
    }
  };

  function diceRoller() {
    $("#game").on("click", "button#rollP1", function() {
      $("#holdError").hide();
      var currentNum = getRandomIntInclusive(1, 6);
      if (currentNum !== 1) {
        numRolledP1.push(currentNum);
      }
      else {
        currentTurn = switchTurns();
      }
    });
    $("#game").on("click", "button#holdP1", function() {
      if (numRolledP1.length >= 1) {
        turnScoreP1 = numRolledP1.reduce((a, b) => a + b, 0);
        if (totalP1 >= 1) {
          totalP1.push(turnScoreP1);
          totalP1 = totalP1.reduce((a, b) => a + b, 0);
        }
        else {
          totalP1.push(turnScoreP1);
        }
      }
      else {
        $("#holdError").show();
      }
    });
    $("#game").on("click", "button#rollP2", function() {
      $("#holdError").hide();
      var currentNum = getRandomIntInclusive(1, 6);
      if (currentNum !== 1) {
        numRolledP2.push(currentNum)
      }
      else {
        currentTurn = switchTurns();
      }
    });
    $("#game").on("click", "button#holdP2", function() {
      if (numRolledP2.length >= 1) {
        turnScoreP2 = numRolledP2.reduce((a, b) => a + b, 0);
        if (totalP2 >= 1) {
          totalP2.push(turnScoreP2);
          totalP2 = totalP2.reduce((a, b) => a + b, 0);
        }
        else {
          totalP2.push(turnScoreP2);
        }
      }
      else {
        $("#holdError").show();
      }
    };
};











//UI
$(document).ready(function() {
  $("form#playersInput").show()
  $("form#playersInput").submit(function(event) {
    event.preventDefault();
    var inputP1 = $("input#nameP1").val();
    var inputP2 = $("input#nameP2").val();

    var players = new Players(inputP1, inputP2);
    var newGame = new Game(players)
    newGame.displayPlayers();
  });
});
