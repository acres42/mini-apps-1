var initialState = function() {
  return [null, null, null, null, null, null, null, null, null];
};

// borrowed from https://gomakethings.com/recreating-the-react-tic-tac-toe-game-with-vanilla-js/
var wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

currentState = initialState();
var turn = 'X';
var squares = document.getElementsByClassName('square');

for (var i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', toggleFunction, false);
}

var reset = document.getElementById('btn');
reset.addEventListener('click', resetBoard, false);

function resetBoard(){
  currentState = initialState();
  var turn = 'X';
  for (var i = 0; i < squares.length; i++) {
    squares[i].innerHTML = null;
  }
}

function toggleFunction() {

  var pos = this.attributes['data-id'].value;

  if (checkState(pos)) {
    closePos(pos, turn);
    this.innerHTML = turn;
    changeTurn();
    checkForWinsOrFull();
  } else {
    alert('That square is filled. Choose another');
  }
}

function closePos(pos, turn) {
  return currentState[pos] = turn;
}

function checkState(pos) {
  if (currentState[pos] === null) {
    return true;
  }
  return false;
}

function changeTurn() {
  if (turn === 'O' || turn === undefined) {
    turn = 'X';
  } else {
    turn = 'O';
  }
  return turn;
}

function checkForWinsOrFull() {
  if (currentState.includes(null)) {
    //get a set for X and O
    var xSet = getAllIndexes(currentState, 'X');
    var oSet = getAllIndexes(currentState, 'O');
    // console.log(xSet, oSet);
    //if any of the sets of wins are a subset of X or O
    if (checkSubsets(wins, xSet)) {
      alert('X Wins!')
    }
    if (checkSubsets(wins, oSet)) {
      alert('O Wins!');
    }
    //X or O is a winner.
    // console.log('winner');
  } else {
    alert('tie!')
  }
}

function getAllIndexes(arr, val) {
  var indexes = [],
    i;
  for (i = 0; i < arr.length; i++)
    if (arr[i] === val)
      indexes.push(i);
  return indexes;
}

function checkSubsets(wins, positions) {
  //http://hippieitgeek.blogspot.com/2013/11/how-to-check-if-one-array-is-subset-of.html
  for (var i = 0; i < wins.length; i++) {
    var result = wins[i].every(function(val) {
      return positions.indexOf(val) >= 0;
    });
    if (result) {
      return true;
    }
  }
  return false;
};