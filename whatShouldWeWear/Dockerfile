# Base image
FROM node:14

# Set working directory
WORKDIR /app

# Install Expo CLI
RUN yarn global add expo-cli

# Copy package.json and yarn.lock to work directory
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the entire project directory to work directory
COPY . .

# Expose the default port for Expo web (19006)
EXPOSE 19006

# Start the Expo web server
CMD ["expo", "start",  "--web"]