# Use Node.js base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose the app port
EXPOSE 7010

# Start the application
CMD ["npm", "start"]
