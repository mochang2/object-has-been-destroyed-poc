const { contextBridge, ipcRenderer } = require("electron");

export const channel = "ipcRenderer";
export enum Context {
  download = "download",
  exit = "exit",
}

contextBridge.exposeInMainWorld(channel, {
  [Context.download]: () => ipcRenderer.invoke(Context.download),
  [Context.exit]: () => ipcRenderer.invoke(Context.exit),
});
