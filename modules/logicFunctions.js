import { board, reset, playersColor } from "../index.js";
import { winnerDiv, whoWonSpan } from "./domElements.js";
import { stringPosToArr, arrPosToString, isSquareEmpty, checkColorOfPiece } from "./helperFuctions.js";

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

const handlePossibleBotMoves = (targetSquare, pieceColor, possibleBotMovesArr) => {
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

const determinePossibleBotMoves = (piece, currPos) => {
   const pos = stringPosToArr(currPos);
   const x = parseInt(pos[0]);
   const y = parseInt(pos[1]);
   
   let possibleBotMovesArr = [];
   let pieceColor;

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
               handlePossibleBotMoves(wQsqForward, 'white', possibleBotMovesArr);
            }

            if(y !== 1){
               let wQsqBackward = arrPosToString([x, y - 1]);
               handlePossibleBotMoves(wQsqBackward, 'white', possibleBotMovesArr);
            }

            if(x !== 8){
               let wQsqRight = arrPosToString([x + 1, y]);
               handlePossibleBotMoves(wQsqRight, 'white', possibleBotMovesArr);
            }

            if(x !== 1){
               let wQsqLeft = arrPosToString([x - 1, y]);
               handlePossibleBotMoves(wQsqLeft, 'white', possibleBotMovesArr);
            }

            if(x !== 8 && y !== 8){
               let wQsqFR = arrPosToString([x + 1, y + 1]);
               handlePossibleBotMoves(wQsqFR, 'white', possibleBotMovesArr);
            }

            if(x !== 1 && y !== 8){
               let wQsqFL = arrPosToString([x - 1, y + 1]);
               handlePossibleBotMoves(wQsqFL, 'white', possibleBotMovesArr);
            }

            if(x !== 8 && y !== 1){
               let wQsqBR = arrPosToString([x + 1, y - 1]);
               handlePossibleBotMoves(wQsqBR, 'white', possibleBotMovesArr);
            }

            if(x !== 1 && y !== 1){
               let wQsqBL = arrPosToString([x - 1, y - 1]);
               handlePossibleBotMoves(wQsqBL, 'white', possibleBotMovesArr);
            }

            break;
         case 'wK':
            pieceColor = 'white';
      
            if(y !== 8){
               let wKsqForward = arrPosToString([x, y + 1]);
               handlePossibleBotMoves(wKsqForward, pieceColor, possibleBotMovesArr);
            }
   
            if(y !== 1){
               let wKsqBackward = arrPosToString([x, y - 1]);
               handlePossibleBotMoves(wKsqBackward, pieceColor, possibleBotMovesArr);
            }
      
            if(x !== 8){
               let wKsqRight = arrPosToString([x + 1, y]);
               handlePossibleBotMoves(wKsqRight, pieceColor, possibleBotMovesArr);
            }

            if(x !== 1){
               let wKsqLeft = arrPosToString([x - 1, y]);
               handlePossibleBotMoves(wKsqLeft, pieceColor, possibleBotMovesArr);
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
               handlePossibleBotMoves(bQsqForward, 'black', possibleBotMovesArr);
            }

            if(y !== 8){
               let bQsqBackward = arrPosToString([x, y + 1]);
               handlePossibleBotMoves(bQsqBackward, 'black', possibleBotMovesArr);
            }

            if(x !== 8){
               let bQsqRight = arrPosToString([x + 1, y]);
               handlePossibleBotMoves(bQsqRight, 'black', possibleBotMovesArr);
            }
         
            if(x !== 1){
               let bQsqLeft = arrPosToString([x - 1, y]);
               handlePossibleBotMoves(bQsqLeft, 'black', possibleBotMovesArr);
            }

            if(x !== 8 && y !== 1){
               let bQsqFR = arrPosToString([x + 1, y - 1]);
               handlePossibleBotMoves(bQsqFR, 'black', possibleBotMovesArr);
            }

            if(x !== 1 && y !== 1){
               let bQsqFL = arrPosToString([x - 1, y - 1]);
               handlePossibleBotMoves(bQsqFL, 'black', possibleBotMovesArr);
            }

            if(x !== 8 && y !== 8){
               let bQsqBR = arrPosToString([x + 1, y + 1]);
               handlePossibleBotMoves(bQsqBR, 'black', possibleBotMovesArr);
            }

            if(x !== 1 && y !== 8){
               let bQsqBL = arrPosToString([x - 1, y + 1]);
               handlePossibleBotMoves(bQsqBL, 'black', possibleBotMovesArr);
            }

            break;
         case 'bK':
            pieceColor = 'black';

            if(y !== 1){
               let bKsqForward = arrPosToString([x, y - 1]);
               handlePossibleBotMoves(bKsqForward, pieceColor, possibleBotMovesArr);
            }

            if(y !== 8){
               let bKsqBackward = arrPosToString([x, y + 1]);
               handlePossibleBotMoves(bKsqBackward, pieceColor, possibleBotMovesArr);
            }

            if(x !== 8){
               let bKsqRight = arrPosToString([x + 1, y]);
               handlePossibleBotMoves(bKsqRight, pieceColor, possibleBotMovesArr);
            }

            if(x !== 1){
               let bKsqLeft = arrPosToString([x - 1, y]);
               handlePossibleBotMoves(bKsqLeft, pieceColor, possibleBotMovesArr);
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

const generateBotMove = (firstLetterOfBotColor, playerColor, square, allPossibleMoves, goodMoves) => {
   if(board.position()[square][0] === firstLetterOfBotColor){
      let possibleTargetSquaresForPiece = determinePossibleBotMoves(board.position()[square], square);

      possibleTargetSquaresForPiece.forEach(potentialTarget => {
         if(!isSquareEmpty(potentialTarget) && checkColorOfPiece(potentialTarget) === playerColor){
            let goodMove = `${square}-${potentialTarget}`;
            goodMoves.push(goodMove);
         }else if(isSquareEmpty(potentialTarget)){
            let possibleMove = `${square}-${potentialTarget}`;
            allPossibleMoves.push(possibleMove);
         }
      });
   }
}

const botMove = () => {
   let allPossibleMoves = [];
   let goodMoves = [];

   for(const square in board.position()){
      if(playersColor === 'whites'){
         generateBotMove('b', 'white', square, allPossibleMoves, goodMoves);
      }else if(playersColor === 'blacks'){
         generateBotMove('w', 'black', square, allPossibleMoves, goodMoves);
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

export { pawnPromotionCheck, winConditionCheck, determinePossibleBotMoves, botMove }