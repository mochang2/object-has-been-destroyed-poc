//main.ts
import { app, ipcMain, BrowserWindow } from "electron"; // ES import
import path from "node:path";

function addipcMainEvent() {
  ipcMain.handle("download", () => {
    console.warn("download receive");
  });
}

function createWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: true, // MAC: alt + cmd + I
      preload: path.join(__dirname, "preload.js"),
    },
  });
  window.loadFile("index.html");
}

(function start() {
  app.on("ready", () => {
    addipcMainEvent();
    createWindow();
  });
})();
