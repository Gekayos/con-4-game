const WIDTH = 7;
const HEIGHT = 7;


let actIvep = 1;
let board = [];


function makeBoard() {
    for (let y = 0; y < HEIGHT; y++) {
      board.push(Array.from(
        { length: WIDTH }));
    }
  }


  function makeHtmlBoard() {
    const board = document.getElementById('board'); 
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', hclIck);
    for (let x = 0; x < WIDTH; x++) {
        const topBox = document.createElement('td');
        topBox.setAttribute('id', x);
        top.append(topBox);
      }
      board.append(top);
      for (let y = 0; y < HEIGHT; y++) {
        const row = document.createElement('tr');
    
        for (let x = 0; x < WIDTH; x++) {
          const box = document.createElement('td');
          box.setAttribute('id', `${y}-${x}`);
          row.append(box);
        }
    
        board.append(row);
      }
    }


    function collumplace(x) {
        for (let y = HEIGHT - 1; y >= 0; y--) {
          if (!board[y][x]) {
            return y;
          }
        }
        return null;
      }


      function inSert(y, x) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.classList.add(`p${actIvep}`);
        piece.style.top = -50 * (y + 2);
      
        const dot = document.getElementById(`${y}-${x}`);
        dot.append(piece);
      }


      function endGame(msg) {
        alert(msg);
      }


      function hclIck(evt) {
  
  const x = +evt.target.id;

  
  const y = collumplace(x);
  if (y === null) {
    return;
  }

  
  board[y][x] = actIvep;
  inSert(y, x);

  
  if (checkForWin()) {
    return endGame(`Player ${actIvep} won!`);
  }

  
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }
    
  
  actIvep = actIvep === 1 ? 2 : 1;
}



function checkForWin() {
  function _win(cells) {
   

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === actIvep
    );
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
