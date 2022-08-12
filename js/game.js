console.log(`%cLet me tell thee of the days of high adventure`, 'Font-Family: fantasy; font-size: 14px;');

// game data object
const game = {
    board: [null, null, null, null, null, null, null, null, null],
    is1UPturn: true,
    turnNumber: 0,
    winner: null,
    gameOver: false,
    strike: null,
    winCounter: [0,0],
    newGame: function(){
        console.log(`resetting the game ...`);
         // reset data
         this.turnNumber = 0;
         this.winner = null;
         this.gameOver = false;
         this.board = [null, null, null, null, null, null, null, null, null];
         this.strike = null;
     },
     getActivePlayer: function(){
        let player; 
        if(game.is1UPturn){
            player = '1UP';
         } else {
            player = '2UP';
         }
         return player;
     },
     setActivePlayer: function(){
        game.is1UPturn = !game.is1UPturn;
     },
     recordWin: function(){
        if(game.is1UPturn){
            this.winCounter[0]++;
            if('localStorage' in window){
                localStorage.setItem('winCounter', JSON.stringify(this.winCounter));
            }
        }else{
            this.winCounter[1]++;
            if('localStorage' in window){
                localStorage.setItem('winCounter', JSON.stringify(this.winCounter));
            }
        }
     },
     checkForWinner: function(){
        // win not possible until the 5th turn
        if(game.turnNumber > 4){

            // create an object of winning combinations (arrays)
            const winners = {
                rowOneVictory: [0,1,2],
                rowTwoVictory: [3,4,5],
                rowThreeVictory: [6,7,8],
                colOneVictory: [0,3,6],
                colTwoVictory: [1,4,7],
                colThreeVictory: [2,5,8],
                backslashVictory: [0,4,8],
                forwardslashVictory: [2,4,6]
            };
        
            // check game board for each combo
            for (const combo in winners){
                let threeOfAKind = [];
                for (let j = 0; j < 3; j++){
                    // save the entries at each location
                    threeOfAKind.push(game.board[winners[combo][j]]);
                }
                
                // do the three of a kind match?
                if(threeOfAKind[0] === threeOfAKind[1] 
                    && threeOfAKind[0] === threeOfAKind[2]){
                    // are they matching AND not empty?
                    if(threeOfAKind[0] !== null){
                        // game winning combo - current player wins!
                        game.winner = this.getActivePlayer();
                        game.strike = combo;
                        break; // break out of loop
                    }
                }
            }
        
            // did we run out of spaces? (i.e. 9 completed turns)
            if(game.turnNumber === 9 && game.winner === null ){
                game.winner = `draw`;
            }
        
            // do we have a winner?
            if(game.winner !== null){
                game.gameOver = true;
            }

            // add +1 to the win total
            if(this.winner !== null && this.winner !== 'draw'){
                this.recordWin();
            }
        }
        return this.winner;
    }
}