#!/bin/sh
if [ -z "$1" ]
then
  echo Usage: $0 "<remote>"
  exit 1
fi
gulp build &&
git add . &&
git commit -m "deploy to $1" &&
git push $1 master
