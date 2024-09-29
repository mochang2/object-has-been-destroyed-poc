const { contextBridge, ipcRenderer } = require("electron");

export const channel = "ipcRenderer";
export enum Context {
  download = "download",
}

contextBridge.exposeInMainWorld(channel, {
  [Context.download]: () => ipcRenderer.invoke(Context.download),
});
