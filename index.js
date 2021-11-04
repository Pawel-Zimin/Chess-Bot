const startGameBtn = document.querySelector('.startGame');
const whitesBtn = document.querySelector('#white');
const blacksBtn = document.querySelector('#black');
const winnerDiv = document.querySelector('.winnerDiv');
const whoWonSpan = document.querySelector('.winnerDiv span');

const startingPosition = {
   d1: 'wQ',
   e1: 'wK',
   a3: 'wP',
   b3: 'wP',
   c3: 'wP',
   d3: 'wP',
   e3: 'wP',
   f3: 'wP',
   g3: 'wP',
   h3: 'wP',

   d8: 'bQ',
   e8: 'bK',
   a6: 'bP',
   b6: 'bP',
   c6: 'bP',
   d6: 'bP',
   e6: 'bP',
   f6: 'bP',
   g6: 'bP',
   h6: 'bP',
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

const determinePossibleBotMoves = (piece, currPos) => {
   const pos = stringPosToArr(currPos);
   const x = parseInt(pos[0]);
   const y = parseInt(pos[1]);
   
   let possibleBotMovesArr = [];

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

const botMove = () => {
   let allPossibleMoves = [];

   for(const square in board.position()){
      if(playersColor === 'whites'){
         if(board.position()[square][0] === 'b'){
            let possibleTargetSquaresForPiece = determinePossibleBotMoves(board.position()[square], square);

            possibleTargetSquaresForPiece.forEach(targetSq => {
               let possibleMove = `${square}-${targetSq}`;
               allPossibleMoves.push(possibleMove);
            });
         }
      }else if(playersColor === 'blacks'){
         if(board.position()[square][0] === 'w'){
            let possibleTargetSquaresForPiece = determinePossibleBotMoves(board.position()[square], square);

            possibleTargetSquaresForPiece.forEach(targetSq => {
               let possibleMove = `${square}-${targetSq}`;
               allPossibleMoves.push(possibleMove);
            });
         }
      }
   }

   let chosenIndex = Math.floor(Math.random() * allPossibleMoves.length);

   board.move(allPossibleMoves[chosenIndex]);

   winConditionCheck();
   pawnPromotionCheck();
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

let board = null;
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

board = Chessboard('board', config);

let theGameIsOn = false;
let playersColor;

const determinePlayerColorChoice = () => {
   if(document.querySelector('#white').checked){
      return 'whites';
   }else if(document.querySelector('#black').checked){
      return 'blacks';
   }else{
      return 'Something\'s wrong';
   }
}

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

const reset = () => {
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

window.addEventListener('DOMContentLoaded', init);