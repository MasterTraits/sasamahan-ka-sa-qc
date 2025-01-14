#!/bin/bash

# Update main branch
git pull origin main

# Update sub module
cd frontend 
npm install

cd .. 