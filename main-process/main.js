const exec = require('child_process').exec;
const ipc  = require('electron').ipcMain;

ipc.on('start-button-clicked', (event, arg) => {

    let time = maketime(arg);
    let chx = makechoix(arg[3]);

    if (chx=='error') {
        event.sender.send('error-reply');
        return;
    }

    let mask = chx + (arg[4] === true ? '-f ' + time : time);

    console.log(mask);

    let child = exec(mask, (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            event.sender.send('error-not-arg-reply');
            return;
        }
        console.log(stdout);
        event.sender.send('success-reply', arg);
    });
});

ipc.on('cancel-button-clicked', (event) => {
    let child = exec('shutdown -a', (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            event.sender.send('error-not-arg-reply');
            return;
        }
        console.log(stdout);
        event.sender.send('cancel-success-reply');
    });
});

function maketime(arg) {
    let time = arg[0]*3600+arg[1]*60+arg[2]*1;
    time = '-t ' + time;
    return time;
}

function makechoix(arg) {
    if (arg == 'off') {
        return 'shutdown -s ';
    }
    else if (arg == 'logoff') {
        return 'shutdown -l ';
    }
    else if (arg == 'sleep') {
        return 'sleep';
    }
    else if (arg == 'restart') {
        return 'shutdown -r ';
    }
    else {
        return 'error';
    }
}