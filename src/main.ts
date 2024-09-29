//main.ts
import { app, ipcMain, BrowserWindow } from "electron"; // ES import
import path from "node:path";

function addipcMainEvent() {
  ipcMain.handle("download", () => {
    console.log("download start");

    const window = BrowserWindow.getFocusedWindow();
    if (!window) {
      return;
    }

    window.webContents.downloadURL(); // TODO: 여기 채우기
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

  window.webContents.session.on("will-download", (_, item) => {
    console.log("save path", item.getSavePath());

    item.on("updated", (__, state) => {
      console.log("updated", state);
    });
    item.on("done", (__, state) => {
      console.log("done", state);
    });
  });
}

(function start() {
  app.on("ready", () => {
    addipcMainEvent();
    createWindow();
  });
})();
