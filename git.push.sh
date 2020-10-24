#!/bin/sh

git add .

git commit -m "autopush: $*"

git push -u origin master
