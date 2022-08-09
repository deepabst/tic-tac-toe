// UI code
// click handler for squares
$('.row>div').on('click', function(e){
    // is the game is still going?
    if(game.gameOver === false){
        // which square was clicked?
        square = $(this)[0].id;
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
        showGameResult(game.winner);
    }
}      

const showGameResult = function(winner){
    let result;
    if(winner === 'draw'){
        $('#message').html(`Its a draw - press any key to play again`);
        result = $('#draw');
    } else if (winner === '1UP'){
        $('#message').html(`${winner} wins - press any key to play again`);
        result = $('#1UPWin');
    } else if (winner === '2UP'){
        $('#message').html(`${winner} wins - press any key to play again`);
        result = $('#2UPWin');
    }
    result.show().animate(
        {
            width: '40%',
            height: '40%',
            top: '30%',
            left: '30%',
            position: 'absolute'
        }, 2000
    );

    if(winner !== 'draw'){
        $('#strike').addClass(game.strike);
        $('#strike').show();
    }
};

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
            position: 'absolute',
            top: '45%',
            left: '45%',
            display: 'none'
        });
        // game.newGame();
        resetUI();
    }
});

const resetUI = function(){
    // hide all images
    $('img').hide();
    // hide strike out div
    $('#strike').hide().removeClass();
    // set initial message
    $('#message').html(`${game.getActivePlayer()} is first, choose a square`);
    game.newGame();
}

// // test feature button
// $('#testBtn').on('click', function(){
//     console.log('test feature')
// });

resetUI();