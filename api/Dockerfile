# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
# COPY package*.json ./
COPY . /usr/src/app

# Install Python and necessary build tools
RUN apk add --no-cache python3 make g++
RUN npm rebuild bcrypt --build-from-source
# Install dependencies
RUN npm install


# Bundle app source
# COPY . .
ENV PORT=3001
# Expose the port your app runs on
EXPOSE 3001

CMD node server.js
# Define environment variables
#ENV NODE_ENV=production
#ENV PORT=3000

# Run the application
#CMD ["npm", "start"]