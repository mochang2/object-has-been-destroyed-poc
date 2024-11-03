#!/bin/bash

for i in {1..10}
do
  echo "Running npm start, attempt $i"
  npm run start
done