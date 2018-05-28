import { app, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'

export function initialize (window, appId) {
	const url = `http://cuixer.com/update/?app=${appId}&platform=${process.platform}&version=${app.getVersion()}`;

	const webContents = window.webContents;
	const send = webContents.send.bind(window.webContents);
	autoUpdater.on('checking-for-update', (event) => send('autoUpdater:checking-for-update'));
	autoUpdater.on('update-available', (event, ...args) => send('autoUpdater:update-available', ...args));
	autoUpdater.on('update-not-available', (event, ...args) => send('autoUpdater:update-not-available', ...args));
	autoUpdater.on('update-downloaded', (event, ...args) => send('autoUpdater:update-downloaded', ...args));
	autoUpdater.on('error', (event, ...args) => send('autoUpdater:error', ...args));
	webContents.on('did-finish-load', () => {
		autoUpdater.setFeedURL(url);
		autoUpdater.checkForUpdates();
	});
};
