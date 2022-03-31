const { table } = require('table');
const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');
const stringify = require('stringify');



const tiles = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "⠀"];



class Puzzle {

  puzzle = [];

  constructor() {
    for (let i = tiles.length - 1; i > 0; i--)
    {
      let j = Math.floor(Math.random() * i);
      let k = tiles[i];
      tiles[i] = tiles[j];
      tiles[j] = k;
    }

    this.puzzle = tiles;

    this.blankIndex = this.puzzle.indexOf("⠀");

  }



  invalidMove() {
    // const leftIndex = [3, 7, 11, 15];
    // const rightIndex = [0, 4, 8, 12];

    if (this.answer == "u" && this.blankIndex > 11) {
      return true;
    }
    else if (this.answer == "d" && this.blankIndex < 4) {
      return true;
    }
    else if (this.answer == "l" && (this.blankIndex == 3 || this.blankIndex == 7 || this.blankIndex == 11 || this.blankIndex == 15)) {
      return true;
    }
    else if (this.answer == "r" && (this.blankIndex == 0 || this.blankIndex == 4 || this.blankIndex == 8 || this.blankIndex == 12)) {
      return true;
    }
  


    // else if (this.answer == "l" && this.blankIndex == 3 || this.blankIndex == 7 || this.blankIndex == 11 || this.blankIndex == 15) {
    //   return true;
    // }
    // else if (this.answer == "r" && this.blankIndex == 0 || this.blankIndex == 4 || this.blankIndex == 8 || this.blankIndex == 12) {
    //   return true;
    // }


    // else if (this.answer == "l" && leftIndex.includes(this.blankIndex)) {
    //   return true;
    // }
    // else if (this.answer == "r" && rightIndex.includes(this.blankIndex)) {
    //   return true;
    // }


    // else if (this.answer == "l" && (this.blankIndex == 3 || this.blankIndex == 7 || this.blankIndex == 11 || this.blankIndex == 15)) {
    //   return true;
    // }

    // else if (this.answer == "r" && (this.blankIndex == 0 || this.blankIndex == 4 || this.blankIndex == 8 || this.blankIndex == 12)) {
    //   return true;
    // }

    return false;
  }


  updateState() {
    [this.puzzle[this.blankIndex], this.puzzle[this.newIndex]] = [this.puzzle[this.newIndex], this.puzzle[this.blankIndex]];
  
    this.blankIndex = this.puzzle.indexOf("⠀");   
  }

  isFinalState() {
    if (stringify(this.puzzle) === stringify(tiles)) {
      return true;
    }
    return false;
  }

  finish() {
    console.log("Congrats, you win!");
  }

  startGame() {
    let continueGame = true;
    while (continueGame) {
      this.print();
      //console.log(this.puzzle.indexOf("⠀"))
      console.log(this.blankIndex);
      //console.log(this.newIndex);
      
      this.promptUser();    
          
      if (this.invalidMove()) {
        console.log("Invalid Move!");
        continueGame = false;
      }
      else {
        this.updateState();
        if (this.isFinalState()) {
          this.finish();
          continueGame = false;
        }
      }
    }    
  } //End of startGame
 


  print() {
    clear();

    //console.log(this.puzzle);
    const printTiles = [];
    const copyTiles = [...this.puzzle];
    while(copyTiles.length > 0)
    {
      printTiles.push(copyTiles.splice(0,4));
    }
    console.log(table(printTiles));
    
    
  } //End of print


  promptUser() {
    const answer = prompt("Enter move direction: ").toLowerCase();
    switch (answer)
    {
      case "u":
        this.newIndex = this.blankIndex + 4;
        break;
      case "d":
        this.newIndex = this.blankIndex - 4;
        break;
      case "l":
        this.newIndex = this.blankIndex + 1;
        break;
      case "r":
        this.newIndex = this.blankIndex - 1;
        break;
      default:
        console.log("Enter u, d, l or r ");
        this.promptUser();
    }
    
  } //End of promptUser



} //End of Puzzle Class


const myPuzzle = new Puzzle();
myPuzzle.startGame();














// const tiles = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; 

// const randTiles = () => {
//   for (let i = tiles.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * i);
//     let k = tiles[i];
//     tiles[i] = tiles[j];
//     tiles[j] = k;
//   }
// };

// randTiles();

// const nTiles = [];
// while(tiles.length > 0) {
// 	nTiles.push(tiles.splice(0,4));
// }
// console.log(table(nTiles));




