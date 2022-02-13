const { table } = require('table');
const inquirer = require('inquirer');

const tiles = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; 

const randTiles = () => {
  for (let i = tiles.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let k = tiles[i];
    tiles[i] = tiles[j];
    tiles[j] = k;
  }
};

randTiles();

const nTiles = [];
while(tiles.length > 0) {
	nTiles.push(tiles.splice(0,4));
}
console.log(table(nTiles));


// inquirer.prompt([
//     {
//         name: 'tileNum',
//         message: 'Enter tile number',
//     },
// ])