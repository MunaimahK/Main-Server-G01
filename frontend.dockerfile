# node image pulled from Docker
FROM node:20-alpine

# Create an application directory
RUN mkdir -p /app

# This is the main application directory
WORKDIR /app

# Copy the frontend package and package-lock.json file
COPY main/package*.json ./

# Install node packages
RUN npm install

# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY main/ .

# Build the app
RUN npm run build

EXPOSE 3000

# Set host to localhost / the docker image
ENV NUXT_HOST=0.0.0.0

# Set app port
ENV NUXT_PORT=3000

# Set the base url
ENV PROXY_API="http://localhost:3001"

# Set the browser base url
ENV PROXY_LOGIN="http://localhost:3000"

CMD ["npm", "start"]

