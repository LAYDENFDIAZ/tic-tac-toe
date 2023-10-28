const GAMEBOARD = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardHtml = "";
    gameboard.forEach((square, index) => {
      boardHtml += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.querySelector("#gameboard").innerHTML = boardHtml;

    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const update = (index, value) => {
    gameboard[index] = value;
    render();
  };

  const getGameboard = () => gameboard;

  return {
    render,
    update,
    getGameboard,
  };
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1").value, "x"),
      createPlayer(document.querySelector("#player2").value, "o"),
    ];

    currentPlayerIndex = 0;
    gameOver = false;
    GAMEBOARD.render();
  };

  const restart = () => {
    const emptyGameboard = ["", "", "", "", "", "", "", "", ""];
    emptyGameboard.forEach((value, index) => {
      GAMEBOARD.update(index, value);
    });
  };

  const handleClick = (event) => {
    let index = parseInt(event.target.id.split("-")[1]);
    if (GAMEBOARD.getGameboard()[index] !== "") {
      return;
    }
    GAMEBOARD.update(index, players[currentPlayerIndex].mark);
    if (
      checkForWin(GAMEBOARD.getGameboard()) &&
      GAMEBOARD.getGameboard()[index] === players[currentPlayerIndex].mark
    ) {
      gameOver = true;
      alert(`${players[currentPlayerIndex].name} won`);
    } else if (checkForTie(GAMEBOARD.getGameboard())) {
      gameOver = true;
      alert(`its a tie`);
    }
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  return {
    start,
    restart,
    handleClick,
  };
})();

function checkForWin(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      console.log(board[a], board[b], board[c]);
      return true;
    }
    return false;
  }
}

function checkForTie(board) {
  return board.every((cell) => cell !== "");
}

document.addEventListener("DOMContentLoaded", () => {
  const RESTART_BUTTON = document.querySelector("#restart-button");
  RESTART_BUTTON.addEventListener("click", () => {
    console.log(GAMEBOARD.getGameboard());
    Game.restart();
  });

  const START_BUTTON = document.querySelector("#start-button");
  START_BUTTON.addEventListener("click", () => {
    Game.start();
  });
});
