#!/bin/bash
cd /home/kavia/workspace/code-generation/quickcalc-46637-32d90a9c/quickcalc
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

