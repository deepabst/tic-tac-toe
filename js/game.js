console.log(`%cLet me tell thee of the days of high adventure`, 'Font-Family: fantasy; font-size: 14px;');

// game data object
const game = {
    board: [null, null, null, null, null, null, null, null, null],
    is1UPturn: true,
    turnNumber: 0,
    winner: null,
    gameOver: false,
    strike: null,
    newGame: function(){
        console.log(`resetting the game ...`);
         // reset data
         this.turnNumber = 0;
         this.winner = null;
         this.gameOver = false;
         this.board = [null, null, null, null, null, null, null, null, null];
         this.strike = null;
     },
     checkForWinner: function(){
        let player = this.getActivePlayer();
        // row one victory
        if(this.board[0] === player 
            && this.board[1] === player 
            && this.board[2] === player){
            game.winner = player;
            game.strike = 'rowOneVictory'
        }
        // row two victory
        else if(this.board[3] === player
            && this.board[4] === player
            && this.board[5] === player){
                game.winner = player;
                game.strike = 'rowTwoVictory'
        }
            // row three victory
            else if(this.board[6] === player
            && this.board[7] === player
            && this.board[8] === player){
            game.winner = player;
            game.strike = 'rowThreeVictory'
        }
                // column one victory
        else if(this.board[0] === player
            && this.board[3] === player
            && this.board[6] === player){
            game.winner = player;
            game.strike = 'colOneVictory'
        }
        // column two victory
        else if(this.board[1] === player 
            && this.board[4] === player
            && this.board[7] === player){
            game.winner = player;
            game.strike = 'colTwoVictory'
        }
        // column three victory
        else if(this.board[2] === player 
            && this.board[5] === player 
            && this.board[8] === player){
            game.winner = player;
            game.strike = 'colThreeVictory'
        }
        // backslash \ diagonal victory
        else if(this.board[0] === player 
            && this.board[4] === player 
            && this.board[8] === player){
            game.winner = player;
            game.strike = 'backslashVictory'
        }
        // forwardslash / diagonal victory
        else if(this.board[2] === player 
            && this.board[4] === player 
            && this.board[6] === player){
            game.winner = player;
            game.strike = 'forwardslashVictory'
        } 
        if(game.turnNumber === 9 && game.winner === null ){
            game.winner = `draw`;
        }
        if(this.winner !== null){
            this.gameOver = true;
        }
        return this.winner;
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
     }
}