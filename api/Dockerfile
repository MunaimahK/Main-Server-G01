# Use Node.js for backend
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Copy Environment Variables -- not recommended ; do so in docker-compose as a runtime variable
#COPY .env .env

# Expose the port your backend will run on (3001)
EXPOSE 3001

# Start the backend app with node server.js
CMD ["node", "server.js"]
