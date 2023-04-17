# Use the official Node.js base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install -g npm@latest

# Copy the entire Expo project to the working directory
COPY . .

# Expose the port that Expo uses (default is 19000)
EXPOSE 19006

# Start the Expo project
CMD ["expo", "start", "--web"]