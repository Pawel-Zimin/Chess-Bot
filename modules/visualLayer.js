import { stringPosToArr, arrPosToString, isSquareEmpty, checkColorOfPiece, determinePlayerColorChoice } from './helperFuctions.js';
import { playersColor } from '../index.js';

const whiteSquareGrey = '#a9a9a9';
const blackSquareGrey = '#696969';

const greySquare = (square) => {
   let $square = $('#board .square-' + square);
   let background = whiteSquareGrey;
   if($square.hasClass('black-3c85d')){
      background = blackSquareGrey;
   }
   $square.css('background', background);
}

const removeGreySquares = () => {
   $('#board .square-55d63').css('background', '');
}

const displayPossibleMoves = (piece, currPos) => {
   const pos = stringPosToArr(currPos);
   const x = parseInt(pos[0]);
   const y = parseInt(pos[1]);

   const possibleMoves = [];
   let pieceColor;

   const handlePossibleSquares = (targetSquare, pieceColor) => {
      if(pieceColor === 'white'){
         if(!isSquareEmpty(targetSquare) && checkColorOfPiece(targetSquare) === 'white'){
            
         }else if(!isSquareEmpty(targetSquare) && checkColorOfPiece(targetSquare) === 'black'){
            greySquare(targetSquare);
            possibleMoves.push(targetSquare);
         }else if(isSquareEmpty(targetSquare)){
            greySquare(targetSquare);
            possibleMoves.push(targetSquare);
         }
      }else if(pieceColor === 'black'){
         if(!isSquareEmpty(targetSquare) && checkColorOfPiece(targetSquare) === 'black'){
            
         }else if(!isSquareEmpty(targetSquare) && checkColorOfPiece(targetSquare) === 'white'){
            greySquare(targetSquare);
            possibleMoves.push(targetSquare);
         }else if(isSquareEmpty(targetSquare)){
            greySquare(targetSquare);
            possibleMoves.push(targetSquare);
         }
      }else{
         console.log('Invalid pieceColor');
      }
   }

   if(playersColor === 'whites'){
      switch(piece){
         case 'wP':
            if(y !== 8){
               let wPsquareForward = arrPosToString([x, y + 1]);
               if(isSquareEmpty(wPsquareForward)){
                  greySquare(wPsquareForward);
                  possibleMoves.push(wPsquareForward);
               }
            }

            let wPcaptureRight = arrPosToString([x + 1, y + 1]);
            if(!isSquareEmpty(wPcaptureRight) && checkColorOfPiece(wPcaptureRight) === 'black'){
               greySquare(wPcaptureRight);
               possibleMoves.push(wPcaptureRight);
            }
            
            let wPcaptureLeft = arrPosToString([x - 1, y + 1]);
            if(!isSquareEmpty(wPcaptureLeft) && checkColorOfPiece(wPcaptureLeft) === 'black'){
               greySquare(wPcaptureLeft);
               possibleMoves.push(wPcaptureLeft);
            }
   
            break;
         case 'wQ':
            if(y !== 8){
               let wQsqForward = arrPosToString([x, y + 1]);
               handlePossibleSquares(wQsqForward, 'white');
            }

            if(y !== 1){
               let wQsqBackward = arrPosToString([x, y - 1]);
               handlePossibleSquares(wQsqBackward, 'white');
            }

            if(x !== 8){
               let wQsqRight = arrPosToString([x + 1, y]);
               handlePossibleSquares(wQsqRight, 'white');
            }

            if(x !== 1){
               let wQsqLeft = arrPosToString([x - 1, y]);
               handlePossibleSquares(wQsqLeft, 'white');
            }

            if(x !== 8 && y !== 8){
               let wQsqFR = arrPosToString([x + 1, y + 1]);
               handlePossibleSquares(wQsqFR, 'white');
            }

            if(x !== 1 && y !== 8){
               let wQsqFL = arrPosToString([x - 1, y + 1]);
               handlePossibleSquares(wQsqFL, 'white');
            }

            if(x !== 8 && y !== 1){
               let wQsqBR = arrPosToString([x + 1, y - 1]);
               handlePossibleSquares(wQsqBR, 'white');
            }

            if(x !== 1 && y !== 1){
               let wQsqBL = arrPosToString([x - 1, y - 1]);
               handlePossibleSquares(wQsqBL, 'white');
            }

            break;
         case 'wK':
            pieceColor = 'white';
      
            if(y !== 8){
               let wKsqForward = arrPosToString([x, y + 1]);
               handlePossibleSquares(wKsqForward, pieceColor);
            }
   
            if(y !== 1){
               let wKsqBackward = arrPosToString([x, y - 1]);
               handlePossibleSquares(wKsqBackward, pieceColor);
            }
      
            if(x !== 8){
               let wKsqRight = arrPosToString([x + 1, y]);
               handlePossibleSquares(wKsqRight, pieceColor);
            }

            if(x !== 1){
               let wKsqLeft = arrPosToString([x - 1, y]);
               handlePossibleSquares(wKsqLeft, pieceColor);
            }
      
            break;
         case undefined:
            break;
      }
   }else if(playersColor === 'blacks'){
      switch(piece){
         case 'bP':
            if(y !== 1){
               let bPsquareForward = arrPosToString([x, y - 1]);
               if(isSquareEmpty(bPsquareForward)){
                  greySquare(bPsquareForward);
                  possibleMoves.push(bPsquareForward);
               }
            }
   
            let bPcaptureRight = arrPosToString([x + 1, y - 1]);
            if(!isSquareEmpty(bPcaptureRight) && checkColorOfPiece(bPcaptureRight) === 'white'){
               greySquare(bPcaptureRight);
               possibleMoves.push(bPcaptureRight);
            }
            
            let bPcaptureLeft = arrPosToString([x - 1, y - 1]);
            if(!isSquareEmpty(bPcaptureLeft) && checkColorOfPiece(bPcaptureLeft) === 'white'){
               greySquare(bPcaptureLeft);
               possibleMoves.push(bPcaptureLeft);
            }
   
            // console.log(possibleMoves);
            break;
         case 'bQ':
            if(y !== 1){
               let bQsqForward = arrPosToString([x, y - 1]);
               handlePossibleSquares(bQsqForward, 'black');
            }

            if(y !== 8){
               let bQsqBackward = arrPosToString([x, y + 1]);
               handlePossibleSquares(bQsqBackward, 'black');
            }

            if(x !== 8){
               let bQsqRight = arrPosToString([x + 1, y]);
               handlePossibleSquares(bQsqRight, 'black');
            }
         
            if(x !== 1){
               let bQsqLeft = arrPosToString([x - 1, y]);
               handlePossibleSquares(bQsqLeft, 'black');
            }

            if(x !== 8 && y !== 1){
               let bQsqFR = arrPosToString([x + 1, y - 1]);
               handlePossibleSquares(bQsqFR, 'black');
            }

            if(x !== 1 && y !== 1){
               let bQsqFL = arrPosToString([x - 1, y - 1]);
               handlePossibleSquares(bQsqFL, 'black');
            }

            if(x !== 8 && y !== 8){
               let bQsqBR = arrPosToString([x + 1, y + 1]);
               handlePossibleSquares(bQsqBR, 'black');
            }

            if(x !== 1 && y !== 8){
               let bQsqBL = arrPosToString([x - 1, y + 1]);
               handlePossibleSquares(bQsqBL, 'black');
            }

            break;
         case 'bK':
            pieceColor = 'black';

            if(y !== 1){
               let bKsqForward = arrPosToString([x, y - 1]);
               handlePossibleSquares(bKsqForward, pieceColor);
            }

            if(y !== 8){
               let bKsqBackward = arrPosToString([x, y + 1]);
               handlePossibleSquares(bKsqBackward, pieceColor);
            }

            if(x !== 8){
               let bKsqRight = arrPosToString([x + 1, y]);
               handlePossibleSquares(bKsqRight, pieceColor);
            }

            if(x !== 1){
               let bKsqLeft = arrPosToString([x - 1, y]);
               handlePossibleSquares(bKsqLeft, pieceColor);
            }

            break;
         case undefined:
            break;                              
      }
   }else{
      console.log('Invalid playersColor');
   }

   return possibleMoves;
}

export { greySquare, removeGreySquares, displayPossibleMoves }