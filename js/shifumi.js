let scores = { user : 0, cpu : 0 };
let messages = {
    play: ['Do you want to play?', `Do you want to loose?`, 'Are you ready for the next battle?', 'Do you want to fight?', 'Do you want to give it a shot?!', `Don't you want to loose against a mere computer?`, 'Do you want to bet on who will be superior?!', 'Would you play with me?!'],
    win : ['Well done, for now!', 'I saw you cheated maannn!', 'Yeah, okay, I give it to you.', 'Hey, jayjaaay (GG)!',`I'll never give up against a human!`, 'Pfff, never mind.',`Come on, again?! Really?!`, `Don't you want to play fair for once?!`],
    lost : ['Ohhh, sorry... or not.', 'Maybe next time?!', 'Keep trying...', `I'm afraid you just lost...`, 'Ahhhh... Nope, you lost!', 'The computer seems to be smarter than a human.', 'Bouuuuyyyaaahh!!','Poly owned!'],
    draw : ['No wins, no losses.', 'Draw! Play again?!', 'And this is... uh?! A tie.', `It's a tie!`, 'Same weapon, duh!', `Next time will be the good one?`, 'One more chance, yeahh!', 'Noooooooooooo, a draw!']
}
let tracks = [];
$('document').ready( function(){
    $('.message').html(generateMessage('play'));
})

function generateMessage( status ) {
    var index = Math.floor( Math.random() * messages[status].length );
    return `"${messages[status][index]}"`;
}

function computerPlay() {
    let weapons = [ 'rock', 'paper', 'scissors'];
    let random = Math.floor( Math.random() * weapons.length );
    return weapons[random];
}

function playerSelection() {
    let usrWeapon = event.target.name;
    let botWeapon = computerPlay()
    $('.message').html( versusResult( usrWeapon, botWeapon ) );
    createEmote( 'user', usrWeapon );
    createEmote( 'bot', botWeapon );

    setScores();
}

function setScores() {
    for(player in scores){
        $(`.${player}-score`).html(scores[player]);
    }
}

function versusResult( userWeapon, computerWeapon ) {
    if( userWeapon === computerWeapon ) {
        keepTracks( 'tie', userWeapon );
         return generateMessage('draw');
    } else {
        let  usrRockWin = userWeapon === 'rock' && computerWeapon === 'scissors',
                usrScissorsWin = userWeapon === 'scissors' && computerWeapon === 'paper',
                usrPaperWin = userWeapon === 'paper' && computerWeapon === 'rock';

        if ( usrRockWin || usrScissorsWin || usrPaperWin ){
            scores.user++;
            keepTracks( 'You', userWeapon, computerWeapon )
            polyOwned();
            return generateMessage('win');
        } else {
            scores.cpu++;
            keepTracks( 'IBot', userWeapon, computerWeapon )
            polyOwned();
            return generateMessage('lost');
        }
    }
}
function createEmote ( player, weapon ) {
   let emote =  weapon === "rock" ? '🤘🏼' : weapon === "paper" ? '✋🏼' : '✌🏼';
   $(`.hand-${player}`).html(emote);
}

function keepTracks( verdict, userWeapon, botWeapon ){
    if( verdict === 'tie'){
        tracks.push(`You both picked "${userWeapon}" — it's a ${verdict} !`)
    } else if ( verdict === 'You' || verdict === 'IBot' ) {
        tracks.push(`You picked "${userWeapon}" versus IBot with '${botWeapon}' — ${verdict} wins !`)
    } else {
        tracks.push('You put an end to the game.')
    }
    for (track of tracks){
        $('.results-container').append(`<p class="track">${track}</p>`)
    }
}

function polyOwned() {
    if(scores.cpu === 3 && scores.user === 0){
        console.log(' cpuuu')
        $('.modal-container').addClass('show');
    }
}

function closeModal() {
    $('.modal-container').css('visibility', 'hidden');
}

document.querySelector('.resetScore').addEventListener('click', () => {
    keepTracks( 'reset' );
    scores.user = scores.cpu = 0;
    setScores();

})