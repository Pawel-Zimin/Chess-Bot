import { board } from "../index.js";

const stringPosToArr = pos => {
   switch(pos[0]){
      case 'a':
         return ['1', pos[1]];
      case 'b':
         return ['2', pos[1]];
      case 'c':
         return ['3', pos[1]];
      case 'd':
         return ['4', pos[1]];
      case 'e':
         return ['5', pos[1]];
      case 'f':
         return ['6', pos[1]];
      case 'g':
         return ['7', pos[1]];
      case 'h':
         return ['8', pos[1]];
   }
}

const arrPosToString = posArr => {
   let posStr = '';
   switch(posArr[0]){
      case 1:
         posStr = `a${posArr[1]}`;
         return posStr;
      case 2:
         posStr = `b${posArr[1]}`;
         return posStr;
      case 3:
         posStr = `c${posArr[1]}`;
         return posStr;
      case 4:
         posStr = `d${posArr[1]}`;
         return posStr;
      case 5:
         posStr = `e${posArr[1]}`;
         return posStr;
      case 6:
         posStr = `f${posArr[1]}`;
         return posStr;
      case 7:
         posStr = `g${posArr[1]}`;
         return posStr;
      case 8:
         posStr = `h${posArr[1]}`;
         return posStr;          
   }
}

const isSquareEmpty = (square) => {
   if(board.position().hasOwnProperty(square) === false){
      return true;
   }else if(board.position().hasOwnProperty(square) === true){
      return false;
   }
}

const checkColorOfPiece = (square) => {
   if(board.position()[square][0] === 'w'){
      return 'white';
   }else if(board.position()[square][0] === 'b'){
      return 'black';
   }else{
      return 'Something\'s wrong with color determination...'
   }
}

const determinePlayerColorChoice = () => {
   if(document.querySelector('#white').checked){
      return 'whites';
   }else if(document.querySelector('#black').checked){
      return 'blacks';
   }else{
      return 'Something\'s wrong';
   }
}

export { stringPosToArr, arrPosToString, isSquareEmpty, checkColorOfPiece, determinePlayerColorChoice }