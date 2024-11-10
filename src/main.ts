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
      for (let i = 0; i < 1_000_000_000; i++) {
        // a long synchronous task
        if (i % 200_000_000 === 0) {
          console.log(i, window.isDestroyed());
        }
      }
      console.log(window.isDestroyed());
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

  /*
  Because "Object has been destroyed" error does not always occur,
  you should try many times to get the error.
  If you want to try to make the error automatically,
  remove the comments below and run a "run.sh".
  */
  // setTimeout(() => {
  //   const window = BrowserWindow.getFocusedWindow();
  //   if (!window) {
  //     return;
  //   }

  //   window.webContents.downloadURL(url);
  // }, 500);

  // setTimeout(() => {
  //   const window = BrowserWindow.getFocusedWindow();
  //   if (!window) {
  //     return;
  //   }

  //   window.destroy();
  // }, 3_000);
})();
