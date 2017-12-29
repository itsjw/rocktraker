const { app, BrowserWindow, globalShortcut } = require('electron');

let win;
let onTop=false;

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
      width: 1000, 
      height: 600,
      backgroundColor: '#ffffff',
      icon: `file://${__dirname}/dist/assets/logo.png`,
      frame: false,
      resizable: false,
      fullscreen:false
    })
  
  
    win.loadURL(`file://${__dirname}/dist/index.html`)
  
    
     // Register a 'CommandOrControl+X' shortcut listener.
    const ret = globalShortcut.register('CommandOrControl+T', () => {
      console.log('CommandOrControl+X is pressed');
      onTop = !onTop;
      win.setAlwaysOnTop(onTop, "floating");
      win.setVisibleOnAllWorkspaces(true);
    })

    if (!ret) {
      console.log('registration failed')
    }

    // Check whether a shortcut is registered.
    console.log(globalShortcut.isRegistered('CommandOrControl+X'))
  
    //// uncomment below to open the DevTools.
    //win.webContents.openDevTools()
  
    // "floating" + 1 is higher than all regular windows, but still behind things 
    // like spotlight or the screen saver
    
    // Event when the window is closed.
    win.on('closed', function () {
      win = null
    })
  }
  
  // hides the dock icon for our app which allows our windows to join other 
  // apps' spaces. without this our windows open on the nearest "desktop" space
  
  

  // Create window on electron intialization
  app.on('ready', createWindow)
  
  // Quit when all windows are closed.
  app.on('window-all-closed', function () {
  
    // On macOS specific close process
    if (process.platform !== 'darwin') {
      app.quit()
      //app.dock.hide();
    }
  })
  
  app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
      createWindow()
    }
  })