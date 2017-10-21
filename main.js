/**
 * Created by star on 2017/2/23.
 */
const electron = require('electron');
const {app,BrowserWindow,ipcMain} = electron;
//主进程
// const ipc = electron.ipcMain;

let win,presWindow;
//关闭窗口
ipcMain.on('window-all-closed', () => {
    app.quit();
});
//最小化
ipcMain.on('hide-window', () => {
    win.minimize();
});
//最大化
ipcMain.on('show-window', () => {
    win.maximize();
});
//还原
ipcMain.on('orignal-window', () => {
    win.unmaximize();
});
//最小化
ipcMain.on('hide-window1', () => {
    presWindow.minimize();
});
//最大化
ipcMain.on('show-window1', () => {
    presWindow.maximize();
});
//还原
ipcMain.on('orignal-window1', () => {
    presWindow.unmaximize();
});
ipcMain.on('zqz-show',function() {
    presWindow = new BrowserWindow({
        minWidth: 960,
        minHeight: 600,
        center: true,
        resizable: true,
        transparent: true,
        show: false,
        frame: false
    });

    presWindow.loadURL('file://' + __dirname + '/index.html'); //新窗口
    presWindow.show();
    win.close();

    // 打开开发工具页面
    presWindow.webContents.openDevTools();
});

app.on('ready', function() {
    win = new BrowserWindow({
        minWidth: 960,
        minHeight: 600,
        center: true,
        resizable: true,
        transparent: true,
        frame: false
    });

    win.loadURL('file://' + __dirname + '/login.html'); //主窗口

    win.once('ready-to-show', () => {
        win.show()
    });

    //关闭窗口调用方法
    win.on('closed', () => {
        win = null
    });

    // 打开开发工具页面
    win.webContents.openDevTools();
    function createWindow() {
        // Open the DevTools.
        if (process.env.NODE_ENV === 'development') {
            BrowserWindow.addDevToolsExtension("C:/Users/star/AppData/Local/Google/Chrome/User Data/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/3.1.2_0");
        }
    }

    presWindow = new BrowserWindow({
        minWidth: 960,
        minHeight: 600,
        center: true,
        resizable: true,
        transparent: true,
        show: false,
        frame: false
    });

    presWindow.loadURL('file://' + __dirname + 'index/.html'); //新窗口

    presWindow.on('closed', () => {
        presWindow = null;
    });

});



// 当所有的窗口被关闭后退出应用
app.on('window-all-closed', () => {
    // 对于OS X系统，应用和相应的菜单栏会一直激活直到用户通过Cmd + Q显式退出
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


app.on('activate', () => {
    // 对于OS X系统，当dock图标被点击后会重新创建一个app窗口，并且不会有其他
    // 窗口打开
    if (win === null) {
        createWindow();
    }
});
