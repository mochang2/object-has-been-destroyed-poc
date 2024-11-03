import { app, ipcMain, BrowserWindow } from "electron"; // ES import
import path from "node:path";
import fs from "node:fs";

const url = ""; // TODO: change

function addipcMainEvent() {
  ipcMain.handle("download", () => {
    console.log("download start");

    const window = BrowserWindow.getFocusedWindow();
    if (!window) {
      return;
    }

    window.webContents.downloadURL(url);
  });

  ipcMain.handle("exit", () => {
    app.exit();
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
    const destination = path.join(__dirname, "../", "dest");
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }

    item.setSavePath(path.join(destination, item.getFilename()));
    item.on("updated", () => {
      console.log("updated", window.webContents.isDestroyed());
    });
    item.on("done", () => {
      console.log("done", window.webContents.isDestroyed());
    });
  });
}

(function start() {
  app.on("ready", () => {
    addipcMainEvent();
    createWindow();
  });
})();
