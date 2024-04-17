# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# COPY package*.json ./
COPY . /app

# Install Python and necessary build tools
# RUN apk add --no-cache python3 make g++
# Install dependencies
RUN npm install --force


# Bundle app source
# COPY . .

# Define environment variables
#ENV NODE_ENV=production
ENV PORT=3000

# Expose the port your app runs on
EXPOSE 3000

# Run the application
CMD ["npm", "start"]