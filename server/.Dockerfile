# Use the official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY src ./src
COPY tsconfig.json ./

# Build the TypeScript code
RUN npm i typescript

# Build the TypeScript code
RUN npx tsc -b

# Expose the port the app runs on
EXPOSE 5007

# Command to run the app
CMD ["node", "dist/index.js"]