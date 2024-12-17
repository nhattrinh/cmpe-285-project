# Step 1: Use Node.js image to build the app
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the React app
RUN npm run build

# Step 2: Use a lightweight web server to serve the built app
FROM nginx:stable-alpine

# Copy build output from the previous stage to the Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx is listening on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
