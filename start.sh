#!/bin/sh 
ts-node node_modules/tape/bin/tape -r tsconfig-paths/register index.ts $1

