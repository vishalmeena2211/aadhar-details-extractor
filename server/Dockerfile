# Use the official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the source code
COPY src ./src
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Install TypeScript and build the code
RUN npm install typescript && npx tsc -b

# Expose the port the app runs on
EXPOSE 5007

# Command to run the app
CMD ["node", "dist/index.js"]