const remote = require('electron').remote;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;
//渲染进程
const ipc = require('electron').ipcRenderer;
// const {ipcRenderer} = require('electron')
//监听mian process里发出的message
// function init() {
// 	ipcRenderer.on('asynchronous-reply', (event, arg) => {
// 	    alert("web2" + arg);// prints "pong"  在electron中web page里的console方法不起作用，因此使用alert作为测试方法
// 	  })
// }


 //在web page里向main process发出message
 // function say_hello() {
 // 	// alert("web1");
 // 	ipcRenderer.send('asynchronous-message', 'ping') // prints "pong"   
 //  // ipcRenderer.sendSync('synchronous-message', 'ping') // prints "pong"   
 //  // alert("web1" + 'ping');
 // }
  



var menu = new Menu.buildFromTemplate([
    {
        label: '菜单',
        submenu: [
            {
                label: '打开新窗口',
                click: function(){
                    ipc.send('zqz-show');//注册的指令。send到主进程index.js中。
                }
            }
        ]
    }
]);

Menu.setApplicationMenu(menu);