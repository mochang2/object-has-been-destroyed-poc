const addElements = () => {
  const button = document.createElement("button") as HTMLButtonElement;
  button.innerText = "download item";
  button.id = "button";

  document.body.appendChild(button);
};

const addListeners = () => {
  const button = document.getElementById("button");
  button?.addEventListener("click", () => {
    window.ipcRenderer.download();
  });
};

const initialize = () => {
  addElements();
  addListeners();
};

initialize();
