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

// UI code

// click handler for every square
$('.row>div').on('click', function(e){
    // is the game is still going?
    if(game.gameOver === false){
        // which square was clicked?
        square = $(this)[0].id;
        console.log(`square ${square} is set to: ${game.board[square]}`);
        // is that square free?
        if(game.board[square] === null){
            game.turnNumber++;            
            // update the game array
            game.board[square] = game.getActivePlayer();
            console.log(`game square ${square} claimed by player ${game.board[square]}`)
            // check if current player won
            game.checkForWinner();
            // end turn - begin other player's turn
            game.setActivePlayer();
            console.log(`it's ${game.getActivePlayer()}'s turn`);
        } else {
            // square has been claimed do nothing, play on
            console.log(`this square belongs to ${game.board[square]}`);
        }
        updateScreen();
    }else{
        console.log(`click after the game is over`);
    }
}); 

// update the UI
const updateScreen = function(){
    $('#message').html(`Your turn, ${game.getActivePlayer()} choose a square`);
    for(let i = 0; i<game.board.length;i++){
        if(game.board[i]=== '1UP'){
            // player one owns the square
            $(`#${i}>img[src='img/1.png']`).show();
        } else if (game.board[i]=== '2UP'){
            // player two owns this square
            $(`#${i}>img[src='img/2.png']`).show();
        }
    }
    if(game.winner !== null){
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
    $('#message').html(`Player 2 wins - press any key to play again`);
    $('#2UPWin').show().animate(
        {
            width: '40%',
            height: '40%',
            top: '30%',
            left: '30%',
            position: 'fixed'
        }, 2000
    );
}

const show1UPwins = function(){
    // pop the player 1 one wins message 
    $('#message').html(`Player 1 wins - press any key to play again`);
    $('#1UPWin').show().animate(
        {
            width: '40%',
            height: '40%',
            top: '30%',
            left: '30%',
            position: 'fixed'
        }, 2000
    );
}

// animate the draw message
const showDrawResult =  function(){
    // pop the draw message 
    $('#message').html(`Its a draw - press any key to play again`);
    $('#draw').show().animate(
        {
            width: '40%',
            height: '40%',
            top: '30%',
            left: '30%',
            position: 'fixed'
        }, 2000
    );
}

// press any key to start a new game
$('body').on('keypress', function(){
    if(game.gameOver){
        let $resultMessage;
        if(game.winner === 'draw'){
            $resultMessage = $('#draw');
        } else if(game.winner === '1UP'){
            $resultMessage = $('#1UPWin');
        } else if(game.winner === '2UP'){
            $resultMessage = $('#2UPWin');
        }
        $resultMessage.css({
            width: '10%',
            height: '10%',
            position: 'fixed',
            top: '45%',
            left: '45%',
            display: 'none'
        });
        game.newGame();
    }
});

// test feature button
$('#testBtn').on('click', function(){
    console.log('test feature')
});

game.newGame();