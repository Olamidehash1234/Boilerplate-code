#!/bin/bash

# Function to check if node_modules exists and install if missing
check_and_install() {
    if [ ! -d "node_modules" ]; then
        echo "node_modules not found in $(pwd), running npm install..."
        npm install
        if [ $? -ne 0 ]; then
            echo "npm install failed. Please check the error logs."
            exit 1
        fi
    else
        echo "node_modules found in $(pwd), skipping npm install."
    fi
}

# Check node_modules in the base directory
echo "Checking for node_modules in the base path..."
check_and_install

# Navigate to the UI directory
cd ui || { echo "UI directory not found"; exit 1; }

# Check node_modules in the UI directory
echo "Checking for node_modules in the UI path..."
check_and_install

# Run Nuxt.js generate command to build static files
echo "Generating Nuxt.js static files..."
npm run build

# Check if the build command was successful
if [ $? -eq 0 ]; then
    echo "Nuxt.js build successful!"
    
    # Move the contents of the dist folder to ../public
    echo "Moving generated files to the public directory..."
    rm -rf ../public/*     # Clear existing contents in the public folder
    mv dist/* ../public/   # Move all files from dist to the public folder

    # Return to the root directory and start the backend with nodemon
    cd .. || exit
    echo "Starting the backend with nodemon..."
    nodemon server.js
else
    echo "Nuxt.js build failed. Please check the error logs."
    exit 1
fi
