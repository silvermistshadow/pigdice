//Back end
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function Game(Players) {
  this.Players = Players;

}

function Players(p1, p2) {
  this.p1 = p1;
  this.p2 = p2;

}

Game.prototype.displayPlayers = function() {
  $("game").show();
  $("#player1").prepend(this.p1);
  $("#player2").prepend(this.p2);
}

Game.prototype.playerTurns = function() {
  var numRolledP1 = [];
  var numRolledP2 = [];
  var totalP1;
  var totalP2;
  var currentTurn = "P1";
  $("button#rollP2").prop('disabled', true)
  function switchTurns() {
    if (currentTurn === "P1") {
      $("button#rollP1").prop('disabled', true);
      $("button#rollP2").prop('disabled', false);
      return currentTurn = "P2";
    } else if (currentTurn === "P2") {
      $("button#rollP2").prop('disabled', true);
      $("button#rollP1").prop('disabled', false);
      return currentTurn = "P1";
    }
    else {
      console.log("FLAGRANT SYSTEM ERROR")
    }
  };

  function diceRoller() {
    $("#game").on("click", "button#rollP1", function() {
      var currentNum = getRandomIntInclusive(1, 6);
      if (currentNum !== 1) {
        numRolledP1.push(currentNum);
      }
      else {
        currentTurn = switchTurns();
      }
    });
    $("#game").on("click", "button#rollP2", function() {
      var currentNum = getRandomIntInclusive(1, 6);
      if (currentNum !== 1) {
        numRolledP2.push(currentNum)
      }
      else {
        currentTurn = switchTurns();
      }
    });
    };
};











//UI
