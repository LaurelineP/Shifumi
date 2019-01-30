function computerPlay () {
    let weapons = [ 'rock', 'paper', 'scissors'];
    let random = Math.floor( Math.random() * weapons.length) ;
    return weapons[random];
}

function playerSelection () {
    let selection = event.target.name;
    let result = versus(selection, computerPlay())
    console.log('result', result)
}

function versus (userWeapon, computerWeapon) {
     if( userWeapon === computerWeapon){
         return `That's a withdraw, try again maybe ? ${userWeapon} === ${computerWeapon}`;
     } else {
        let  usrRockWin = userWeapon === 'rock' && computerWeapon === 'scissors',
                usrScissorsWin = userWeapon === 'scissors' && computerWeapon === 'paper',
                usrPaperWin = userWeapon === 'paper' && computerWeapon === 'rock';

        if(usrRockWin || usrScissorsWin || usrPaperWin ){
            return `You won ( ${userWeapon} > ${computerWeapon} )`;
        }
        return `You lost ( ${userWeapon} < ${computerWeapon} )`;
    }
}