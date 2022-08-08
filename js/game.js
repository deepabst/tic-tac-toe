console.log(`%cLet me tell thee of the days of high adventure`, 'Font-Family: fantasy; font-size: 14px;');

// object to hold game data
const game = {
    board: [null, null, null, null, null, null, null, null, null],
    is1UPturn: true,
    turnNumber: 0,
    winner: null,
    gameOver: false,
    refreshScreen: function(){
        // hide all images
         $('img').attr('hidden', true);
         console.log(`refresh screen ran`);
     },
     checkForWinner: function(player){
        // row one victory
        if(this.board[0] === player 
            && this.board[1] === player 
            && this.board[2] === player){
            game.winner = player;
            console.log(`player ${player} won with a row one victory!`)
        }
        // row two victory
        else if(this.board[3] === player
            && this.board[4] === player
            && this.board[5] === player){
            game.winner = player;
            console.log(`player ${player} won with a row two victory!`)
        }
        // row three victory
        else if(this.board[6] === player
            && this.board[7] === player
            && this.board[8] === player){
            game.winner = player;
            console.log(`player ${player} won with a row three victory!`)
        }
        // column one victory
        else if(this.board[0] === player
            && this.board[3] === player
            && this.board[6] === player){
            game.winner = player;
            console.log(`player ${player} won with a col one victory!`)
        }
        // column two victory
        else if(this.board[1] === player 
            && this.board[4] === player
            && this.board[7] === player){
            game.winner = player;
            console.log(`player ${player} won with a col two victory!`)
        }
        // column three victory
        else if(this.board[2] === player 
            && this.board[5] === player 
            && this.board[8] === player){
            game.winner = player;
            console.log(`player ${player} won with a col three victory!`)
        }
        // backslash \ diagonal victory
        else if(this.board[0] === player 
            && this.board[4] === player 
            && this.board[8] === player){
            game.winner = player;
            console.log(`player ${player} won with a \ backslash diagonal victory!`)
        }
        // forwardslash / diagonal victory
        else if(this.board[2] === player 
            && this.board[4] === player 
            && this.board[6] === player){
            game.winner = player;
            console.log(`player ${player} won with a / forwardslash diagonal victory!`)
        } else if(game.turnNumber === 9 && game.winner === null ){
            game.winner = `draw`;
            console.log(`it's a draw!`);
        }
     },
}

// UI code

// click handler for every square
$('.row>div').on('click', function(e){
    // check if game is still going
    if(game.gameOver === false){
        // which square was clicked?
        square = $(this)[0].id;
        console.log(`square ${square} is set to: ${game.board[square]}`);
        // is that square free?
        if(game.board[square] === null){
            // whose turn is it?
            let player = ''; 
            if(game.is1UPturn){
                player = '1UP';
             } else {
                player = '2UP';
             }
            // update the game array
            game.board[square] = player;
            console.log(`game square ${square} claimed by player ${player}`)
            // check if current player won
            game.checkForWinner(player)
            // end turn - begin other player's turn
            game.is1UPturn = !game.is1UPturn;
            game.turnNumber++;
            console.log(`this.is1UPturn = ${game.is1UPturn}`);
        } else {
            // square has been claimed doesn't end turn 
            // do nothing, play on
            console.log(`this square belongs to ${game.board[square]}`);
        }
        updateScreen();
        // update screen
    } // if() game still going?
}); 

// update the UI
const updateScreen = function(){
    for(let i = 0; i<game.board.length;i++){
        if(game.board[i]=== '1UP'){
            // player one owns the square
            $(`#${i}>img[src='/img/1.png']`).show();
        } else if (game.board[i]=== '2UP'){
            // player two owns this square
            $(`#${i}>img[src='/img/2.png']`).show();
        }
    }
    if(game.winner !== null){
        // alert(`the winner is ${game.winner}`);
        game.refreshScreen();
    }
}
