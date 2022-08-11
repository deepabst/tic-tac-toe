// UI code
// click handler for squares
$('.square').on('click', function(e){
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
        // don't register clicks after the game is over
        console.log(`click after the game is over`);
    }
}); 

// update the UI
const updateScreen = function(){
    $('#message').html(`Your turn, ${game.getActivePlayer()} choose a square`);
    // layout the game board
    for(let i = 0; i<game.board.length;i++){
        if(game.board[i]=== '1UP'){
            // player one owns the square
            $(`#${i}`).css({
                backgroundImage: 'url(\'img/1.png\')',
            });
        } else if (game.board[i]=== '2UP'){
            $(`#${i}`).css({
                backgroundImage: 'url(\'img/2.png\')',
            });
        }
        // remove the .free class from the square indicates it is taken
        if(game.board[i] !== null){
            $(`#${i}`).removeClass('free');
        }
    }
    // show the result splash screen
    if(game.winner !== null){
        showGameResult(game.winner);
    }
    // update wins on the leaderboard
    $('#1UPWinCounter').html(game.winCounter[0]);
    $('#2UPWinCounter').html(game.winCounter[1]);
}      

const showGameResult = function(winner){
    let result = $(`#${winner}`);
    if(winner === 'draw'){
        $('#message').html(`Its a draw - press any key to play again`);
    } else{
        $('#message').html(`${winner} wins - press any key to play again`);
    }
    result.show().animate(
        {
            width: '40%',
            height: '40%',
            top: '30%',
            left: '30%',
            position: 'absolute'
        }, 500
    );

    if(winner !== 'draw'){
        $('#strike').addClass(game.strike);
        $('#strike').show();
    }
};

$('.square').on('mouseenter', function(){
    if($(this).hasClass('free')){
        $(this).addClass('active');
    }
});

$('.square').on('mouseleave', function(){
        $(this).removeClass('active');
});

// press any key to start a new game
$('body').on('keypress', function(){
    if(game.gameOver){
        let $resultMessage;
        $resultMessage = $(`#${game.winner}`);
        console.log('the result message is:',$resultMessage);
        $resultMessage.css({
            width: '10%',
            height: '10%',
            position: 'absolute',
            top: '45%',
            left: '45%',
            display: 'none'
        });
        resetUI();
    }
});

const resetUI = function(){
    //check localStorage (for previous wins)
    if('localStorage' in window){
        let winCounter = localStorage.getItem('winCounter');
        // check if winCounter is not null
        if(winCounter !== null){
            // update winCounter
            game.winCounter = JSON.parse(winCounter);
        }
    }
    // update wins on the leaderboard
    $('#1UPWinCounter').html(game.winCounter[0]);
    $('#2UPWinCounter').html(game.winCounter[1]);
    
    // add .free class to all squares
    $('.square').addClass('free');
    // hide images
    $('.square').css('background-image', 'none');
    // hide strike out
    $('#strike').hide().removeClass();
    // set initial message
    $('#message').html(`${game.getActivePlayer()} is first, choose a square`);

    game.newGame();
}

resetUI();