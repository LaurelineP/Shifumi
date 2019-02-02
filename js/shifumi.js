let scores = { user : 0, cpu : 0 };
let messages = {
    play: ['Do you want to play ?', `Do you want to loose ?`, 'Are you ready for the next battle ?', 'Do you want to fight ?', 'Do you want to give it a shot ?!', `Would you be my inferior guest ?`, 'Who will be your superior here ?!', 'Would you play with me ?!'],
    win : ['Well done, for now!', 'I saw you cheated maannn !', 'Yeah, okay, I give it to you.', 'Hey, jayjaaay (GG)!',`I'll never give up, human, nevaaa !`, 'Pfff, never mind.',`Come on, again ?! Really ?!`, `Play fair for once, no ?!`],
    lost : ['Ohhh, sorry... or not.', 'Maybe next time ?!', 'Keep trying...', `I'm afraid you just lost...`, 'Ahhhh... Nope, you lost !', 'IBot seems to be smarter you.', 'Bouuuuyyyaaahh!!','Poly owned !'],
    draw : ['No winner, no loser.', 'Draw! Play again !!', 'And this is... uh ?! A tie.', `It's a tiiiie!`, 'Same weapon, duuuh !', `Stop copyiiiing !`, 'One more chance, yeahh !', 'Noooooooooooo, a draw !']
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
    let track;
    if( verdict === 'tie'){
        track = `You both picked "${userWeapon}" — it's a ${verdict} !`
        actionsOnTracks(track)

    } else if ( verdict === 'You' || verdict === 'IBot' ) {
        track = `You picked "${userWeapon}" versus IBot with '${botWeapon}' — ${verdict} wins !`
        actionsOnTracks(track)

    } else {
        track = 'You put an end to the game.'
        actionsOnTracks(track)

    }
    function actionsOnTracks(track){
        tracks.push(track)
        $('.results-container').append(`<p class="track">${track}</p>`)

    }
}

function polyOwned() {
    if(scores.cpu === 3 && scores.user === 0){
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