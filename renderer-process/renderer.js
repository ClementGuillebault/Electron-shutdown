const ipc = require('electron').ipcRenderer;

const startBtn  = document.getElementById('go');
const cancelBtn = document.getElementById('cancel');


startBtn.addEventListener('click', (event) => {

    let hrs = document.getElementById('hours').value;
    let min = document.getElementById('minutes').value;
    let sec = document.getElementById('seconds').value;
    let chx = $('input:checked').val();

    let arg = [hrs, min, sec, chx, false];

    if (document.getElementById('force').checked) {
        arg[4] = true;
    }

    console.log(chx);
    console.log('Arret planifié lancé');

    clean();

    ipc.send('start-button-clicked', arg);

});


cancelBtn.addEventListener('click', (event) => {

    console.log('Abandon de l\'arret planifié');
    ipc.send('cancel-button-clicked');

});


ipc.on('error-reply', (event, arg) => {

    let msgError = document.getElementById('msgerror');

    msgError.innerHTML = 'Attention! Vous devez selectionner une action à exécuter avant de validé';
    msgError.style.display = '';

});

ipc.on('success-reply', (event, arg) => {

    let hrsTmp = String("0" + arg[0]).slice(-2);
    let minTmp = String("0" + arg[1]).slice(-2);
    let secTmp = String("0" + arg[2]).slice(-2);

    let msgSuccess = document.getElementById('msgsuccess');

    msgSuccess.innerHTML = 'Votre appareil ' + 
    (arg[3]=='off' ? 's\'éteindra dans ' : 
    arg[3]=='logoff' ? 'va fermer votre session ' : 
    arg[3]=='restart' ? 'va redémarrer ' : '') + 
    'dans ' + hrsTmp + ':' + minTmp + ':' + secTmp;

    msgSuccess.style.display = '';

    setTimeout(() => {
        $('#msgsuccess').message('close');
    }, 3000);

})

ipc.on('error-not-arg-reply', (event, arg) => {

    let msgError = document.getElementById('msgerror');

    msgError.innerHTML     = 'Une erreur inconnue est survenue! Essayé de relancer le programme.';
    msgError.style.display = '';

});


function clean() {
    document.getElementById('msgerror').style.display = 'none';
    document.getElementById('msgsuccess').style.display = 'none';
}