FROM node:14 

# Set the working directory to the root of the project
WORKDIR /app

# Copy the package.json and yarn.lock (or package-lock.json) files to the container
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install

# Copy the rest of the project files to the container
COPY . .
# Start the Expo project
CMD ["expo", "start", "--web"]