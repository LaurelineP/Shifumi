let scores = { user : 0, cpu : 0 };
let messages = {
    play: ['Do you want to play?', `Do you want to loose?`, 'Are you ready for the next battle?', 'Do you want to fight?', 'Do you want to give it a shot?!', `Don't you want to loose against a mere computer?`, 'Do you want to bet on who will be superior?!', 'Would you play with me?!'],
    win : ['Well done, for now!', 'I saw you cheated maannn!', 'Yeah, okay, I give it to you.', 'Hey, jayjaaay (GG)!',`I'll never give up against a human!`, 'Pfff, never mind.',`Come on, again?! Really?!`, `Don't you want to play fair for once?!`],
    lost : ['Ohhh, sorry... or not.', 'Maybe next time?!', 'Keep trying...', `I'm afraid you just lost...`, 'Ahhhh... Nope, you lost!', 'The computer seems to be smarter than a human.', 'Bouuuuyyyaaahh!!','Poly owned!'],
    draw : ['No wins, no losses.', 'Draw! Play again?!', 'And this is... uh?! A tie.', `It's a tie!`, 'Same weapon, duh!', `Next time will be the good one?`, 'One more chance, yeahh!', 'Noooooooooooo, a draw!']
}

$('document').ready( function(){
    $('.message').html(generateMessage('play'));
})

function generateMessage( status ) {
    var index = Math.floor( Math.random() * messages[status].length );
    return `"${messages[status][index]}"`;
}

function computerPlay() {
    let weapons = [ 'rock', 'paper', 'scissors'];
    let random = Math.floor( Math.random() * weapons.length) ;
    return weapons[random];
}

function playerSelection() {
    let selection = event.target.name;
    $('.message').html( versusResult( selection, computerPlay() ) );
    setScores();
}

function setScores() {
    for(player in scores){
        $(`.${player}-score`).html(scores[player]);
    }
}

function versusResult( userWeapon, computerWeapon ) {
    if( userWeapon === computerWeapon){
         return generateMessage('draw');
    } else {
        let  usrRockWin = userWeapon === 'rock' && computerWeapon === 'scissors',
                usrScissorsWin = userWeapon === 'scissors' && computerWeapon === 'paper',
                usrPaperWin = userWeapon === 'paper' && computerWeapon === 'rock';

        if(usrRockWin || usrScissorsWin || usrPaperWin ){
            scores.user++;
            polyOwned();
            return generateMessage('win');
        } else {
            scores.cpu++;
            polyOwned();
            return generateMessage('lost');
        }
    }
}

function resetScore() {
    scores.user = scores.cpu = 0;
    setScores();
}

function polyOwned() {
    if(scores.cpu === 3 && scores.user === 0){
        $('.modal-content').addClass('show');
    }
}

document.querySelector('.resetScore').addEventListener('click', () => {
    scores.user = scores.cpu = 0;
    setScores();

})