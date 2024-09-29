const addElements = () => {
  const downloadButton = document.createElement("button");
  downloadButton.innerText = "download item";
  downloadButton.id = "download";
  document.body.appendChild(downloadButton);

  const exitButton = document.createElement("button");
  exitButton.innerHTML = "exit";
  exitButton.id = "exit";
  document.body.appendChild(exitButton);
};

const addListeners = () => {
  const downloadButton = document.getElementById("download");
  downloadButton?.addEventListener("click", () => {
    window.ipcRenderer.download();
  });

  const exitButton = document.getElementById("exit");
  exitButton?.addEventListener("click", () => {
    window.ipcRenderer.exit();
  });
};

const initialize = () => {
  addElements();
  addListeners();
};

initialize();
