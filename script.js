// _....... Nothing
// X....... Wall
// Blank... Floor
// @....... Player
// Dot..... Target
// b....... Box not on target
// B....... Box on target

const grid = document.querySelector('#grid');
const field = ['XXXXX__', 'X   X__', 'X@XbXXX', 'X b ..X', 'XXXXXXX'];

buildGrid(field);

function buildGrid() {
  for (line of field) {
    const row = document.createElement('div');
    row.className = 'row';
    grid.appendChild(row);

    for (let i = 0; i < line.length; i++) {
      const cell = document.createElement('span');
      cell.classList.add('cell');
      row.appendChild(cell);
      getCellClass(line.charAt(i)) && cell.classList.add(getCellClass(line[i]));
    }
  }
}

function getCellClass(character) {
  switch (character) {
    case 'X':
      return 'wall';
    case '_':
      return '';
    case ' ':
      return 'floor';
    case 'b':
      return 'box';
    case '@':
      return 'player';
    case '.':
      return 'target';
  }
}

document.addEventListener('keydown', event => {
  console.log(event.key);

  let playerPosition = getPlayerPosition(field);

  switch (event.key) {
    case 'ArrowUp':
      move(field, playerPosition, -1, 0);
      break;
    case 'ArrowDown':
      move(field, playerPosition, 1, 0);
      break;
    case 'ArrowLeft':
      move(field, playerPosition, 0, -1);
      break;
    case 'ArrowRight':
      move(field, playerPosition, 0, 1);
      break;
  }
});

function getPlayerPosition(field) {
  for (row in field) {
    for (let column = 0; column < field[row].length; column++) {
      const cellValue = field[row].charAt(column);
      if (cellValue === '@') {
        return { row: parseInt(row), column };
      }
    }
  }
}

function getCell(row, col) {
  return document.querySelector(
    `#grid div:nth-child(${row + 1}) span:nth-child(${col + 1})`
  );
}

function replaceCharacter(field, row, column, newCharacter) {
  let line = field[row];
  let newLine =
    line.substring(0, column) + newCharacter + line.substring(column + 1);
  field[row] = newLine;
}

function move(field, playerPosition, rowChange, columnChange) {
  let goalField = field[playerPosition.row + rowChange].charAt(
    playerPosition.column + columnChange
  );

  if (goalField === 'X') {
    console.log('You cannot go through walls or boxes!');
    return;
  }

  if (goalField === 'b') {
    const boxNewRow = playerPosition.row + 2 * rowChange;
    const boxNewColumn = playerPosition.column + 2 * columnChange;
    let boxGoalField = field[boxNewRow].charAt(boxNewColumn);

    if (boxGoalField === 'X' || boxGoalField === 'b') {
      return;
    }

    const boxNext = getCell(boxNewRow, boxNewColumn);

    boxNext.classList.remove('floor');
    boxNext.classList.add('box');
    replaceCharacter(field, boxNewRow, boxNewColumn, 'b');
  }

  const playerBefore = getCell(playerPosition.row, playerPosition.column);
  playerBefore.classList.remove('player');
  playerBefore.classList.add('floor');
  replaceCharacter(field, playerPosition.row, playerPosition.column, ' ');

  const playerNext = getCell(
    playerPosition.row + rowChange,
    playerPosition.column + columnChange
  );
  playerNext.classList.remove('floor');
  playerNext.classList.remove('box');
  playerNext.classList.add('player');
  replaceCharacter(
    field,
    playerPosition.row + rowChange,
    playerPosition.column + columnChange,
    '@'
  );
}

// [
//     "XXXXXXX",
//     "X.   .X",
//     "X.bbb.X",
//     "XXb@bXX",
//     "X.bbb.X",
//     "X.   .X",
//     "XXXXXXX",
//   ]
// [
//     "XXXXX__",
//     "X   X__",
//     "X@XbXXX",
//     "X b ..X",
//     "XXXXXXX"
//   ],
//   [
//     "XXXXXXX",
//     "X.   .X",
//     "X  b  X",
//     "X b@b X",
//     "X  b  X",
//     "X.   .X",
//     "XXXXXXX",
//   ],
//   [
//     "XXXXXXX",
//     "X.   .X",
//     "X.bbb.X",
//     "XXb@bXX",
//     "X.bbb.X",
//     "X.   .X",
//     "XXXXXXX",
//   ],
//   [
//     "__XXXXX_",
//     "XXX   X_",
//     "X.@b  X_",
//     "XXX b.X_",
//     "X.XXb X_",
//     "X X . XX",
//     "Xb Bbb.X",
//     "X   .  X",
//     "XXXXXXXX"
//   ],
//   [
//     "____XXXXX_____________",
//     "____X   X_____________",
//     "____Xb  X_____________",
//     "__XXX  bXXX___________",
//     "__X  b  b X___________",
//     "XXX X XXX X     XXXXXX",
//     "X   X XXX XXXXXXX  ..X",
//     "X b  b             ..X",
//     "XXXXX XXXX X@XXXX  ..X",
//     "____X      XXX__XXXXXX",
//     "____XXXXXXXX__________"
//   ]
