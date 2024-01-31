const playerIcons = {
  playerO: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 56 56" version="1.1" class="icon o">
    <g stroke-width="1" fill-rule="evenodd">
      <g transform="translate(-160.000000, -168.000000)" stroke-width="10">
        <g transform="translate(16.000000, 141.000000)">
          <circle cx="172" cy="55" r="23"/>
        </g>
      </g>
    </g>
  </svg>`,
  playerX: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="00 20 80 80" version="1.1" class="icon x">
    <g stroke-width="1" fill-rule="evenodd">
      <g transform="translate(-265.000000, -156.000000)">
        <g transform="translate(16.000000, 141.000000)">
          <g transform="translate(289.000000, 55.000000) rotate(-315.000000) translate(-289.000000, -55.000000) translate(261.000000, 27.000000) scale(1.5,1.5)">
            <rect x="21.8048515" y="0.722642212" width="12.2739726" height="55.2328767"/>
            <polygon transform="translate(27.941838, 28.339081) rotate(-270.000000) translate(-27.941838, -28.339081) " points="21.8048515 0.722642212 34.0788241 0.722642212 34.0788241 55.9555189 21.8048515 55.9555189"/>
          </g>
        </g>
      </g>
    </g>
  </svg>`,
  tie: `<svg xmlns="http://www.w3.org/2000/svg" data-name="Artboard 30" viewBox="0 0 64 64" id="tic-tac-toe" class="icon">
    <path d="M41,22H23a1,1,0,0,0-1,1V41a1,1,0,0,0,1,1H41a1,1,0,0,0,1-1V23A1,1,0,0,0,41,22ZM40,40H24V24H40Z"></path>
    <path d="M60,24a3,3,0,0,0,0-6H46V4a3,3,0,0,0-6,0V18H24V4a3,3,0,0,0-6,0V18H4a3,3,0,0,0,0,6H18V40H4a3,3,0,0,0,0,6H18V60a3,3,0,0,0,6,0V46H40V60a3,3,0,0,0,6,0V46H60a3,3,0,0,0,0-6H46V24ZM45,42H60a1,1,0,0,1,0,2H45a1,1,0,0,0-1,1V60a1,1,0,0,1-2,0V45a1,1,0,0,0-1-1H23a1,1,0,0,0-1,1V60a1,1,0,0,1-2,0V45a1,1,0,0,0-1-1H4a1,1,0,0,1,0-2H19a1,1,0,0,0,1-1V23a1,1,0,0,0-1-1H4a1,1,0,0,1,0-2H19a1,1,0,0,0,1-1V4a1,1,0,0,1,2,0V19a1,1,0,0,0,1,1H41a1,1,0,0,0,1-1V4a1,1,0,0,1,2,0V19a1,1,0,0,0,1,1H60a1,1,0,0,1,0,2H45a1,1,0,0,0-1,1V41A1,1,0,0,0,45,42Z"></path>
    <path d="M32,38a6,6,0,1,0-6-6A6.006,6.006,0,0,0,32,38Zm0-10a4,4,0,1,1-4,4A4,4,0,0,1,32,28Z"></path>
    <polygon points="5.707 15.707 10 11.414 14.293 15.707 15.707 14.293 11.414 10 15.707 5.707 14.293 4.293 10 8.586 5.707 4.293 4.293 5.707 8.586 10 4.293 14.293 5.707 15.707"></polygon>
    <polygon points="27.707 15.707 32 11.414 36.293 15.707 37.707 14.293 33.414 10 37.707 5.707 36.293 4.293 32 8.586 27.707 4.293 26.293 5.707 30.586 10 26.293 14.293 27.707 15.707"></polygon>
    <path d="M54 16a6 6 0 10-6-6A6.006 6.006,0,0,0,54 16zM54 6a4 4 0 11-4 4A4 4,0,0,1,54 6zM60 54a6 6,0,0,0-6,6A6.006,6.006,0,0,0,60 54zM50 54a4 4,0,0,1,4,4A4 4,0,0,1,50 54z"></path>
  </svg>`,
};

const SELECTORS = {
  main: '.main',
  gameTable: '#game-table',
  newGameButton: '.new-game-button',
  changeColorButton: '#changeColor',
  playerTitle: '#playerTitle',
  winnerDialog: '#winnerDialog',
  winnerText: '#winnerText',
  winnerIcon: '#winnerIcon',
  boardCell: '.board__cell',
  playerXWins: '#playerXWins',
  playerOWins: '#playerOWins',
  aside: '.aside',
  toggleAside: '#toggleAside',
};

class TicTacToeGame {
  currentPlayer = 'playerX';
  boardState = Array(3).fill(null).map(() => Array(3).fill(null));
  winningHistory = {
    playerX: 0,
    playerO: 0
  };
  domManipulator;

  constructor(rows, cols) {
    this.domManipulator = new DOMManipulator();
    this.generateGameTable(rows, cols);
    this.setWiningHistory();
    this.addListeners();
  }

  generateGameTable(rows, cols) {
    const cells = Array.from({ length: rows * cols }, (_, index) => {
      const cell = document.createElement('li');
      cell.classList.add(SELECTORS.boardCell.slice(1));
      cell.setAttribute('data-row', Math.floor(index / cols));
      cell.setAttribute('data-col', index % cols);
      return cell;
    });
    document.querySelector(SELECTORS.gameTable).append(...cells);
  }

  setWiningHistory() {
    const { playerX, playerO } = this.winningHistory;
    this.domManipulator.updatePlayerWins(playerX, playerO);
  }

  changePlayer() {
    this.currentPlayer = (this.currentPlayer === 'playerX') ? 'playerO' : 'playerX';
    this.domManipulator.updatePlayerTurn(`Turno de: ${playerIcons[this.currentPlayer]}`);
  }

  isCellOccupied(row, col) {
    return this.boardState[row][col] !== null;
  }

  updateCell(cell, row, col) {
    cell.innerHTML = playerIcons[this.currentPlayer];
    cell.classList.add(this.currentPlayer);
    this.boardState[row][col] = this.currentPlayer;
  }

  handleWinner(player) {
    this.domManipulator.showWinner(playerIcons[player]);
    this.winningHistory[player]++;
    this.setWiningHistory();
  }

  handleTie() {
    this.domManipulator.showTie(playerIcons.tie);
  }

  cellClick = (event) => {
    const cell = event.target;
    const row = cell.getAttribute('data-row');
    const col = cell.getAttribute('data-col');

    if (this.isCellOccupied(row, col)) return;

    this.updateCell(cell, row, col);

    const winner = this.checkWinner();
    if (winner) {
      this.handleWinner(winner);
      return;
    }

    if (this.checkTie()) {
      this.handleTie();
      return;
    }

    this.changePlayer();
  };

  addListeners() {
    document.querySelectorAll(SELECTORS.boardCell).forEach((tableCell, index) => {
      tableCell.addEventListener('click', this.cellClick);
      tableCell.dataset.index = index;
    });

    document.querySelectorAll(SELECTORS.newGameButton).forEach((resetButton) => {
      resetButton.addEventListener('click', this.resetGame);
    });

    document.querySelector(SELECTORS.changeColorButton).addEventListener('click', () => {
      document.querySelector(SELECTORS.main).classList.toggle('dark');
    });

    document.querySelector(SELECTORS.toggleAside).addEventListener('click', () => {
      document.querySelector(SELECTORS.aside).classList.toggle('open');
    });
  }

  checkWinner() {
    const checkLine = (a, b, c) => a && a === b && b === c;
    const checkWin = (a, b, c) => a !== null && checkLine(a, b, c);

    for (let i = 0; i < this.boardState.length; i++) {
      if (checkWin(this.boardState[i][0], this.boardState[i][1], this.boardState[i][2])) return this.boardState[i][0];
      if (checkWin(this.boardState[0][i], this.boardState[1][i], this.boardState[2][i])) return this.boardState[0][i];
    }

    if (checkWin(this.boardState[0][0], this.boardState[1][1], this.boardState[2][2])) return this.boardState[0][0];
    if (checkWin(this.boardState[0][2], this.boardState[1][1], this.boardState[2][0])) return this.boardState[0][2];

    return null;
  }

  resetGame = () => {
    document.querySelectorAll(SELECTORS.boardCell).forEach(cell => cell.textContent = '');

    this.currentPlayer = 'playerX';
    this.boardState = Array(3).fill(null).map(() => Array(3).fill(null));

    document.querySelectorAll(SELECTORS.boardCell).forEach(cell => {
      cell.classList.remove('playerX', 'playerO');
    });
    document.querySelector(SELECTORS.playerTitle).innerHTML = '¡Empezamos!';
    this.domManipulator.closeWinnerDialog();
  };

  checkTie() {
    return this.boardState.every(row => row.every(cell => cell !== null));
  }
}

class DOMManipulator {
  constructor() {
    this.playerXWinsElement = document.querySelector(SELECTORS.playerXWins);
    this.playerOWinsElement = document.querySelector(SELECTORS.playerOWins);
    this.playerTitleElement = document.querySelector(SELECTORS.playerTitle);
    this.winnerDialog = document.querySelector(SELECTORS.winnerDialog);
  }

  updatePlayerWins(playerXWins, playerOWins) {
    this.playerXWinsElement.textContent = playerXWins;
    this.playerOWinsElement.textContent = playerOWins;
  }

  updatePlayerTurn(playerIcon) {
    this.playerTitleElement.innerHTML = playerIcon;
  }

  showModal(winnerText, icon) {
    const winnerTextElement = document.querySelector(SELECTORS.winnerText);
    const winnerIconElement = document.querySelector(SELECTORS.winnerIcon);
    winnerTextElement.textContent = winnerText;
    winnerIconElement.innerHTML = icon;
    this.winnerDialog.showModal();
  }

  showWinner(playerIcon) {
    this.showModal('¡Ganador!', playerIcon);
  }
  
  showTie(tieIcon) {
    this.showModal('¡Empate!', tieIcon);
  }

  closeWinnerDialog() {
    this.winnerDialog.close();
  }
}

const ticTacToeGame = new TicTacToeGame(3, 3);
