const { table } = require('table');
const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');
const stringify = require('stringify');



const tiles = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "⠀"];



class Puzzle {

  puzzle = JSON.parse(JSON.stringify(tiles));

  constructor() {
    this.direction = "";

    for (let i = this.puzzle.length - 1; i > 0; i--)
    {
      let j = Math.floor(Math.random() * i);
      let k = this.puzzle[i];
      this.puzzle[i] = this.puzzle[j];
      this.puzzle[j] = k;
    }
    this.blankIndex = this.puzzle.indexOf("⠀");
  }

  /* move blank
  isValidMove() {
    if (this.direction === "u" && this.blankIndex > 3) {
      return true;
    }
    else if (this.direction === "d" && this.blankIndex < 12) {
      return true;
    }
    else if (this.direction === "l" && (this.blankIndex != 0 || this.blankIndex != 4 || this.blankIndex != 8 || this.blankIndex != 12)) {
      return true;
    }
    else if (this.direction === "r" && (this.blankIndex != 3 || this.blankIndex != 7 || this.blankIndex != 11 || this.blankIndex != 15)) {
      return true;
    }
    return false;
  }
  */

  //move tile
  isValidMove() {
    if (this.direction === "u" && this.blankIndex < 12) {
      return true;
    }
    else if (this.direction === "d" && this.blankIndex > 3) {
      return true;
    }
    else if (this.direction === "l" && (this.blankIndex != 3 || this.blankIndex != 7 || this.blankIndex != 11 || this.blankIndex != 15)) {
      return true;
    }
    else if (this.direction === "r" && (this.blankIndex != 0 || this.blankIndex != 4 || this.blankIndex != 8 || this.blankIndex != 12)) {
      return true;
    }
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
      //console.log(this.blankIndex);
      //console.log(tiles);
      //console.log(this.puzzle);
      
      this.promptUser();
          
      if (this.isValidMove()) {
        this.updateState();
        if (this.isFinalState()) {
          this.finish();
          continueGame = false;
        }
      }
      else {
        console.log("Invalid Move!");
        continueGame = false;
      }
    }    
  } //End of startGame
 


  print() {
    clear();

    const printTiles = [];
    const copyTiles = JSON.parse(JSON.stringify(this.puzzle));
    while(copyTiles.length > 0)
    {
      printTiles.push(copyTiles.splice(0,4));
    }
    console.log(table(printTiles));    
  } //End of print

  /* move blank
  promptUser() {
    const answer = prompt("Enter move direction: ").toLowerCase();
    switch (answer)
    {
      case "u":
        this.direction = "u";
        this.newIndex = this.blankIndex - 4;
        break;
      case "d":
        this.direction = "d";
        this.newIndex = this.blankIndex + 4;
        break;
      case "l":
        this.direction = "l";
        this.newIndex = this.blankIndex - 1;
        break;
      case "r":
        this.direction = "r";
        this.newIndex = this.blankIndex + 1;
        break;
      default:
        console.log("Enter u, d, l or r ");
        this.promptUser();
    }
    
  }
  */


  //move tile
  promptUser() {
    const answer = prompt("Enter move direction: ").toLowerCase();
    switch (answer)
    {
      case "u":
        this.direction = "u";
        this.newIndex = this.blankIndex + 4;
        break;
      case "d":
        this.direction = "d";
        this.newIndex = this.blankIndex - 4;
        break;
      case "l":
        this.direction = "l";
        this.newIndex = this.blankIndex + 1;
        break;
      case "r":
        this.direction = "r";
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















