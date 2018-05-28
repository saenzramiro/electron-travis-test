import { app, BrowserWindow, dialog } from 'electron'
// AutoUpdater
import updater from './updater'
import { autoUpdater } from 'electron-updater'

/**
* Set `__static` path to static files in production
* https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
*/
if (process.env.NODE_ENV !== 'development') {
	global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
? `http://localhost:9080`
: `file://${__dirname}/index.html`

function createWindow () {
	/**
	* Initial window options
	*/
	mainWindow = new BrowserWindow({
		height: 563,
		useContentSize: true,
		width: 1000
	})

	mainWindow.loadURL(winURL)

	mainWindow.on('closed', () => {
		mainWindow = null
	})

	autoUpdater.autoDownload = true;

	if (process.env.NODE_ENV !== 'development') autoUpdater.checkForUpdatesAndNotify()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

/**
* Auto Updater
*
* Uncomment the following code below and install `electron-updater` to
* support auto updating. Code Signing with a valid certificate is required.
* https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
*/

autoUpdater.on('checking-for-update', () => {
	dialog.showMessageBox({
		type: 'info',
		title: '',
		message: 'Checking updates...',
		buttons: ['Sure', 'No']
	}, (buttonIndex) => {

	})
})

autoUpdater.on('update-available', () => {
	dialog.showMessageBox({
		type: 'info',
		title: '',
		message: 'Downloading update...',
		buttons: ['Sure', 'No']
	}, (buttonIndex) => {
		autoUpdater.checkForUpdates();
	})
})

autoUpdater.on('update-not-available', () => {
	dialog.showMessageBox({
		type: 'info',
		title: '',
		message: 'NO UPDATE',
		buttons: ['Sure', 'No']
	}, (buttonIndex) => {

	})
})

autoUpdater.on('update-downloaded', () => {
	autoUpdater.quitAndInstall()
})
