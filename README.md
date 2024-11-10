# object-has-been-destroyed-poc

## prerequisite

- node: v20.16
- npm: v10.8

`electron` does not have to be "32.1.2". I found that this error occurs from "22.3.8". All versions between 22.3.8 and 32.1.2 may have this potential error.

## how to start

1. `npm install`
2. `npm run start`
3. change "url" in `main.ts`

### more details

- images: a directory that contains an error screenshot
- test.js: a test file about how callbacks work after removing listeners. Even if the listeners are removed, the registered callbacks are executed.
