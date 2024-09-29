import { channel, type Context } from "./preload";

declare global {
  interface Window {
    [channel]: {
      [K in keyof typeof Context]: () => void;
    };
  }
}
