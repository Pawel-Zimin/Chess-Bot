import { startGameBtn, whitesBtn, blacksBtn, winnerDiv, whoWonSpan } from './modules/domElements.js';
import { startingPosition } from "./modules/dataGiven.js";
import { greySquare, removeGreySquares, displayPossibleMoves } from './modules/visualLayer.js';
import { stringPosToArr, arrPosToString, isSquareEmpty, checkColorOfPiece, determinePlayerColorChoice } from './modules/helperFuctions.js';
import { pawnPromotionCheck, winConditionCheck } from './modules/logicFunctions.js';

const determinePossibleBotMoves = (piece, currPos) => {
   const pos = stringPosToArr(currPos);
   const x = parseInt(pos[0]);
   const y = parseInt(pos[1]);
   
   let possibleBotMovesArr = [];
   let pieceColor;

   const handlePossibleBotMoves = (targetSquare, pieceColor) => {
      if(pieceColor === 'white'){
         if(!isSquareEmpty(targetSquare) && checkColorOfPiece(targetSquare) === 'white'){
            return;
         }else if(!isSquareEmpty(targetSquare) && checkColorOfPiece(targetSquare) === 'black'){
            possibleBotMovesArr.push(targetSquare);
         }else if(isSquareEmpty(targetSquare)){
            possibleBotMovesArr.push(targetSquare);
         }
      }else if(pieceColor === 'black'){
         if(!isSquareEmpty(targetSquare) && checkColorOfPiece(targetSquare) === 'black'){
            return;
         }else if(!isSquareEmpty(targetSquare) && checkColorOfPiece(targetSquare) === 'white'){
            possibleBotMovesArr.push(targetSquare);
         }else if(isSquareEmpty(targetSquare)){
            possibleBotMovesArr.push(targetSquare);
         }
      }else{
         console.log('Invalid pieceColor');
      }
   }

   if(playersColor === 'blacks'){
      switch(piece){
         case 'wP':
            let wPsquareForward = arrPosToString([x, y + 1]);
            let wPcaptureRight = arrPosToString([x + 1, y + 1]);
            let wPcaptureLeft = arrPosToString([x - 1, y + 1]);

            if(!isSquareEmpty(wPcaptureRight) && checkColorOfPiece(wPcaptureRight) === 'black'){
               possibleBotMovesArr.push(wPcaptureRight);
            }else if(!isSquareEmpty(wPcaptureLeft) && checkColorOfPiece(wPcaptureLeft) === 'black'){
               possibleBotMovesArr.push(wPcaptureLeft);
            }else if(y !== 8){
               if(isSquareEmpty(wPsquareForward)){
                  possibleBotMovesArr.push(wPsquareForward);
               }
            }
   
            break;
         case 'wQ':
            if(y !== 8){
               let wQsqForward = arrPosToString([x, y + 1]);
               handlePossibleBotMoves(wQsqForward, 'white');
            }

            if(y !== 1){
               let wQsqBackward = arrPosToString([x, y - 1]);
               handlePossibleBotMoves(wQsqBackward, 'white');
            }

            if(x !== 8){
               let wQsqRight = arrPosToString([x + 1, y]);
               handlePossibleBotMoves(wQsqRight, 'white');
            }

            if(x !== 1){
               let wQsqLeft = arrPosToString([x - 1, y]);
               handlePossibleBotMoves(wQsqLeft, 'white');
            }

            if(x !== 8 && y !== 8){
               let wQsqFR = arrPosToString([x + 1, y + 1]);
               handlePossibleBotMoves(wQsqFR, 'white');
            }

            if(x !== 1 && y !== 8){
               let wQsqFL = arrPosToString([x - 1, y + 1]);
               handlePossibleBotMoves(wQsqFL, 'white');
            }

            if(x !== 8 && y !== 1){
               let wQsqBR = arrPosToString([x + 1, y - 1]);
               handlePossibleBotMoves(wQsqBR, 'white');
            }

            if(x !== 1 && y !== 1){
               let wQsqBL = arrPosToString([x - 1, y - 1]);
               handlePossibleBotMoves(wQsqBL, 'white');
            }

            break;
         case 'wK':
            pieceColor = 'white';
      
            if(y !== 8){
               let wKsqForward = arrPosToString([x, y + 1]);
               handlePossibleBotMoves(wKsqForward, pieceColor);
            }
   
            if(y !== 1){
               let wKsqBackward = arrPosToString([x, y - 1]);
               handlePossibleBotMoves(wKsqBackward, pieceColor);
            }
      
            if(x !== 8){
               let wKsqRight = arrPosToString([x + 1, y]);
               handlePossibleBotMoves(wKsqRight, pieceColor);
            }

            if(x !== 1){
               let wKsqLeft = arrPosToString([x - 1, y]);
               handlePossibleBotMoves(wKsqLeft, pieceColor);
            }
      
            break;
         case undefined:
            break;
      }
   }else if(playersColor === 'whites'){
      switch(piece){
         case 'bP':
            let bPsquareForward = arrPosToString([x, y - 1]);
            let bPcaptureRight = arrPosToString([x + 1, y - 1]);
            let bPcaptureLeft = arrPosToString([x - 1, y - 1]);

            if(!isSquareEmpty(bPcaptureRight) && checkColorOfPiece(bPcaptureRight) === 'white'){
               possibleBotMovesArr.push(bPcaptureRight);
            }else if(!isSquareEmpty(bPcaptureLeft) && checkColorOfPiece(bPcaptureLeft) === 'white'){
               possibleBotMovesArr.push(bPcaptureLeft);
            }else if(y !== 1){
               if(isSquareEmpty(bPsquareForward)){
                  possibleBotMovesArr.push(bPsquareForward);
               }
            }

            break;
         case 'bQ':
            if(y !== 1){
               let bQsqForward = arrPosToString([x, y - 1]);
               handlePossibleBotMoves(bQsqForward, 'black');
            }

            if(y !== 8){
               let bQsqBackward = arrPosToString([x, y + 1]);
               handlePossibleBotMoves(bQsqBackward, 'black');
            }

            if(x !== 8){
               let bQsqRight = arrPosToString([x + 1, y]);
               handlePossibleBotMoves(bQsqRight, 'black');
            }
         
            if(x !== 1){
               let bQsqLeft = arrPosToString([x - 1, y]);
               handlePossibleBotMoves(bQsqLeft, 'black');
            }

            if(x !== 8 && y !== 1){
               let bQsqFR = arrPosToString([x + 1, y - 1]);
               handlePossibleBotMoves(bQsqFR, 'black');
            }

            if(x !== 1 && y !== 1){
               let bQsqFL = arrPosToString([x - 1, y - 1]);
               handlePossibleBotMoves(bQsqFL, 'black');
            }

            if(x !== 8 && y !== 8){
               let bQsqBR = arrPosToString([x + 1, y + 1]);
               handlePossibleBotMoves(bQsqBR, 'black');
            }

            if(x !== 1 && y !== 8){
               let bQsqBL = arrPosToString([x - 1, y + 1]);
               handlePossibleBotMoves(bQsqBL, 'black');
            }

            break;
         case 'bK':
            pieceColor = 'black';

            if(y !== 1){
               let bKsqForward = arrPosToString([x, y - 1]);
               handlePossibleBotMoves(bKsqForward, pieceColor);
            }

            if(y !== 8){
               let bKsqBackward = arrPosToString([x, y + 1]);
               handlePossibleBotMoves(bKsqBackward, pieceColor);
            }

            if(x !== 8){
               let bKsqRight = arrPosToString([x + 1, y]);
               handlePossibleBotMoves(bKsqRight, pieceColor);
            }

            if(x !== 1){
               let bKsqLeft = arrPosToString([x - 1, y]);
               handlePossibleBotMoves(bKsqLeft, pieceColor);
            }

            break;
         case undefined:
            break;                              
      }
   }else{
      console.log('Invalid playersColor');
   }

   return possibleBotMovesArr;
}

const botMove = () => {
   let allPossibleMoves = [];
   let goodMoves = [];

   for(const square in board.position()){
      if(playersColor === 'whites'){
         if(board.position()[square][0] === 'b'){
            let possibleTargetSquaresForPiece = determinePossibleBotMoves(board.position()[square], square);

            possibleTargetSquaresForPiece.forEach(potentialTarget => {
               if(!isSquareEmpty(potentialTarget) && checkColorOfPiece(potentialTarget) === 'white'){
                  let goodMove = `${square}-${potentialTarget}`;
                  goodMoves.push(goodMove);
               }else if(isSquareEmpty(potentialTarget)){
                  let possibleMove = `${square}-${potentialTarget}`;
                  allPossibleMoves.push(possibleMove);
               }
            });
         }
      }else if(playersColor === 'blacks'){
         if(board.position()[square][0] === 'w'){
            let possibleTargetSquaresForPiece = determinePossibleBotMoves(board.position()[square], square);

            possibleTargetSquaresForPiece.forEach(potentialTarget => {
               if(!isSquareEmpty(potentialTarget) && checkColorOfPiece(potentialTarget) === 'black'){
                  let goodMove = `${square}-${potentialTarget}`;
                  goodMoves.push(goodMove);
               }else if(isSquareEmpty(potentialTarget)){
                  let possibleMove = `${square}-${potentialTarget}`;
                  allPossibleMoves.push(possibleMove);
               }
            });
         }
      }
   }

   if(goodMoves.length === 0){
      let chosenIndex = Math.floor(Math.random() * allPossibleMoves.length);
      board.move(allPossibleMoves[chosenIndex]);
   }else if(goodMoves.length > 0){
      let chosenIndex = Math.floor(Math.random() * goodMoves.length);
      board.move(goodMoves[chosenIndex]);
   }

   winConditionCheck();
   pawnPromotionCheck();
}

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