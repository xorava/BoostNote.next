const electron = require('electron')
const path = require('path')
// import { format as formatUrl } from 'url'

const { app, BrowserWindow } = electron
const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

function createMainWindow() {
  const window = new BrowserWindow({
    webPreferences: { nodeIntegration: true }
  })

  window.loadFile(path.join(__dirname, '../compiled/index.html'))

  // if (isDevelopment) {
  // } else {
  //   window.loadURL(`http://localhost:3000/app`)
  //   // window.loadURL(
  //   //   formatUrl({
  //   //     pathname: path.join(__dirname, 'index.html'),
  //   //     protocol: 'file',
  //   //     slashes: true
  //   //   })
  //   // )
  // }

  window.on('closed', () => {
    mainWindow = null
  })
  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})
