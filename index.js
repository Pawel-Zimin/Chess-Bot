import { startGameBtn, whitesBtn, blacksBtn, winnerDiv, whoWonSpan } from './modules/domElements.js';
import { startingPosition } from "./modules/dataGiven.js";
import { greySquare, removeGreySquares, displayPossibleMoves } from './modules/visualLayer.js';
import { determinePlayerColorChoice } from './modules/helperFuctions.js';
import { pawnPromotionCheck, winConditionCheck, botMove } from './modules/logicFunctions.js';

let theGameIsOn = false;
export let playersColor;

const startGame = () => {
   winnerDiv.style.opacity = 0;
   whoWonSpan.textContent = '';

   theGameIsOn = true;
   startGameBtn.textContent = 'RESET';
   startGameBtn.removeEventListener('click', startGame);
   startGameBtn.addEventListener('click', reset);
   
   playersColor = determinePlayerColorChoice();
   whitesBtn.setAttribute('disabled', true);
   blacksBtn.setAttribute('disabled', true);

   if(playersColor === 'blacks'){
      window.setTimeout(botMove, 250);
   }
}

export const reset = () => {
   theGameIsOn = false;
   startGameBtn.textContent = 'START GAME';
   startGameBtn.removeEventListener('click', reset);
   startGameBtn.addEventListener('click', startGame);

   playersColor = '';
   whitesBtn.removeAttribute('disabled');
   blacksBtn.removeAttribute('disabled');

   board.position(startingPosition, false);   
}

const init = () => {
   startGameBtn.addEventListener('click', startGame);
}

const onDragStart = (source, piece, position, orientation) => {
   if(!theGameIsOn){
      alert('You need to start a game first.');
      return false;
   }

   if(
      (whitesBtn.checked && piece.search(/^w/) === -1) || 
      (blacksBtn.checked && piece.search(/^b/) === -1)
   ){
      return false;
   }
}

const onDrop = (source, target, piece) => {
   removeGreySquares();
   if(!displayPossibleMoves(piece, source).includes(target)){
      removeGreySquares();
      return 'snapback';
   }
   removeGreySquares();

   window.setTimeout(botMove, 250);
}

const onMouseoverSquare = (square, piece, boardPosition, orientation) => {
   if(theGameIsOn){
      greySquare(square);
      displayPossibleMoves(piece, square);
   }
}

const onMouseoutSquare = (square, piece) => {
   removeGreySquares();
}

const onSnapEnd = (source, target, piece) => {
   winConditionCheck();
   pawnPromotionCheck();
}

const config = {
   pieceTheme: './img/chesspieces/wikipedia/{piece}.png',
   position: startingPosition,
   draggable: true,
   onDragStart: onDragStart,
   onDrop: onDrop,
   onSnapEnd: onSnapEnd,
   onMouseoutSquare: onMouseoutSquare,
   onMouseoverSquare: onMouseoverSquare,
}

export const board = Chessboard('board', config);

window.addEventListener('DOMContentLoaded', init);