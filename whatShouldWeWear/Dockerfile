# Base image
FROM node:14

# Set working directory
WORKDIR /app

# Install Expo CLI
RUN npm install -g expo-cli

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory to work directory
COPY . .

# Expose the default port for Expo web (19006)
EXPOSE 19006

# Start the Expo web server
CMD ["expo", "start",  "--web"]