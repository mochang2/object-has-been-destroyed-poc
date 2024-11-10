const EventEmitter = require("node:events");

const emitter = new EventEmitter();

let isDestroyed = false;

emitter.on("A", async () => {
  const sleep = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("take 3 seconds");
      }, 3_000);
    });
  };
  console.log(await sleep());
});

setTimeout(() => {
  isDestroyed = true;
  emitter.removeAllListeners();
  console.log("event listener is removed");
}, 5_000);

const interval = setInterval(() => {
  if (!isDestroyed) {
    emitter.emit("A");
    console.log("add callback to queue");
  } else {
    clearInterval(interval);
  }
}, 1_000);
