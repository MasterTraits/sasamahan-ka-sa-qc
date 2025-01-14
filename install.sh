#!/bin/bash

echo "Adding upstream to your fork..."
git remote add upstream https://github.com/MasterTraits/sasamahan-ka-sa-qc.git

# 
#   ONLY UNCOMMENT THIS IF YOU ARE USING PYTHON
#
# echo "Creating virtual environment..."
# cd backend
# py -m venv .venv

# echo "Activating virtual environment..."
# if source .venv/Scripts/activate
# then
#     echo "Virtual environment activated."
# else
#     .venv/Scripts/activate
# fi

# echo "Installing dependencies..."
# pip install -r requirements.txt
# cd ..

# Install frontend dependencies
cd client
npm install 

cd .. 
