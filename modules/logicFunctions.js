import { board, reset } from "../index.js";
import { winnerDiv, whoWonSpan } from "./domElements.js";

const pawnPromotionCheck = () => {
   let currBoardPosition = board.position();

   for(const square in board.position()){
      if(square[1] === '1' && board.position()[square] === 'bP'){
         currBoardPosition[square] = 'bQ';
         board.position(currBoardPosition);
      }
      if(square[1] === '8' && board.position()[square] === 'wP'){
         currBoardPosition[square] = 'wQ';
         board.position(currBoardPosition);
      }
   }
}

const winConditionCheck = () => {
   let arrOfKings = [];

   for(const square in board.position()){
      if(board.position()[square][1] === 'K'){
         arrOfKings.push(board.position()[square]);
      }
   }

   if(arrOfKings.length === 1){
      winnerDiv.style.opacity = 1;

      if(arrOfKings[0] === 'wK'){
         whoWonSpan.textContent = 'Whites';
      }else if(arrOfKings[0] === 'bK'){
         whoWonSpan.textContent = 'Blacks';
      }
      reset();
   }
}

export { pawnPromotionCheck, winConditionCheck }