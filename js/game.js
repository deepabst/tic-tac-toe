console.log(`%cLet me tell thee of the days of high adventure`, 'Font-Family: fantasy; font-size: 14px;');

// game data object
const game = {
    board: [null, null, null, null, null, null, null, null, null],
    is1UPturn: true,
    turnNumber: 0,
    winner: null,
    gameOver: false,
    newGame: function(){
        console.log(`resetting the game ...`);
        // hide all images
        $('img').hide();
         // reset data
         this.turnNumber = 0;
         this.winner = null;
         this.gameOver = false;
         this.board = [null, null, null, null, null, null, null, null, null];
         // set initial message
         $('#message').html(`${this.getActivePlayer()} is first, choose a square`);
     },
     checkForWinner: function(){
        let player = this.getActivePlayer();
        // row one victory
        if(this.board[0] === player 
            && this.board[1] === player 
            && this.board[2] === player){
            game.winner = player;
        }
        // row two victory
        else if(this.board[3] === player
            && this.board[4] === player
            && this.board[5] === player){
            game.winner = player;
        }
        // row three victory
        else if(this.board[6] === player
            && this.board[7] === player
            && this.board[8] === player){
            game.winner = player;
        }
        // column one victory
        else if(this.board[0] === player
            && this.board[3] === player
            && this.board[6] === player){
            game.winner = player;
        }
        // column two victory
        else if(this.board[1] === player 
            && this.board[4] === player
            && this.board[7] === player){
            game.winner = player;
        }
        // column three victory
        else if(this.board[2] === player 
            && this.board[5] === player 
            && this.board[8] === player){
            game.winner = player;
        }
        // backslash \ diagonal victory
        else if(this.board[0] === player 
            && this.board[4] === player 
            && this.board[8] === player){
            game.winner = player;
        }
        // forwardslash / diagonal victory
        else if(this.board[2] === player 
            && this.board[4] === player 
            && this.board[6] === player){
            game.winner = player;
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