const {app, BrowserWindow} = require('electron');
const path = require('path');
const url  = require('url');
const glob = require('glob');

let win;

loadMain();

function createWindow () {
    win = new BrowserWindow({ width: 800, height: 600, frame: false });

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})


function loadMain() {
    var files = glob.sync(path.join(__dirname, 'main-process/*.js'))
    files.forEach((file) => {
        require(file)
    });
}
