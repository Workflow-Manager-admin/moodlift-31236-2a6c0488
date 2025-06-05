#!/bin/bash
cd /home/kavia/workspace/code-generation/moodlift-31236-2a6c0488/moodlift_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

