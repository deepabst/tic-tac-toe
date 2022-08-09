console.log(`%cLet me tell thee of the days of high adventure`, 'Font-Family: fantasy; font-size: 14px;');

// object to hold game data
const game = {
    board: [null, null, null, null, null, null, null, null, null],
    is1UPturn: true,
    turnNumber: 0,
    winner: null,
    gameOver: false,
    resetGame: function(){
        // hide all images
        $('img').hide();
         // reset all the data
         this.turnNumber = 0;
         this.winner = null;
         this.gameOver = false;
         this.board = [null, null, null, null, null, null, null, null, null];
         // TODO - set 1st player
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
        } 
        if(game.turnNumber === 9 && game.winner === null ){
            game.winner = `draw`;
            console.log(`it's a draw!`);
        }
        if(this.winner !== null){
            this.gameOver = true;
        }
        return this.winner;
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
            game.turnNumber++;
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
            game.checkForWinner(player);
            // end turn - begin other player's turn
            game.is1UPturn = !game.is1UPturn;
            console.log(`this.is1UPturn = ${game.is1UPturn}`);
        } else {
            // square has been claimed doesn't end turn 
            // do nothing, play on
            console.log(`this square belongs to ${game.board[square]}`);
        }
        updateScreen();
        // update screen
    } // if() game still going?
    console.log(`click after the game is over`);
}); 

// update the UI
const updateScreen = function(){
    $('#message').html(`Turn: ${game.turnNumber}`);
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
        if(game.winner === 'draw'){
            showDrawResult();
        } else if(game.winner === '1UP'){
            show1UPwins();
        } else if(game.winner === '2UP'){
            show2UPWinMessage();
        }
    }
}      


const show2UPWinMessage = function(){
    // pop the player 2 wins message
    $('#message').html(`Player 2 wins - click to play again`);
    $('#2UPWin').show().animate(
        {
            width: '40%',
            height: '40%',
            top: '30%',
            left: '30%',
            position: 'fixed'
        }, 2000
    );
    // reset the game on next click
    $('#2UPWin').on('click', function(){
        $(this).css({
            width: '10%',
            height: '10%',
            position: 'fixed',
            top: '45%',
            left: '45%',
            display: 'none'
        });
        game.resetGame();
    });     
}

const show1UPwins = function(){
    // pop the player 1 one wins message 
    $('#message').html(`Player 1 wins - click to play again`);
    $('#1UPWin').show().animate(
        {
            width: '40%',
            height: '40%',
            top: '30%',
            left: '30%',
            position: 'fixed'
        }, 2000
    );
    // reset the game on next click
    $('#1UPWin').on('click', function(){
        $(this).css({
            width: '10%',
            height: '10%',
            position: 'fixed',
            top: '45%',
            left: '45%',
            display: 'none'
        });
        game.resetGame();
    });     
}

// animate the draw message and set a click handler to reset game 
const showDrawResult =  function(){
    // pop the draw message 
    $('#message').html(`Its a draw - click to play again`);
    $('#draw').show().animate(
        {
            width: '40%',
            height: '40%',
            top: '30%',
            left: '30%',
            position: 'fixed'
        }, 2000
    );
    // reset the game on next click
    $('#draw').on('click', function(){
        $(this).css({
            width: '10%',
            height: '10%',
            position: 'fixed',
            top: '45%',
            left: '45%',
            display: 'none'
        });
        game.resetGame();
    });     
}

// test feature button
$('#testBtn').on('click', function(){
    console.log('test feature')
});
