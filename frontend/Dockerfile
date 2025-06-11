FROM node:18

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files and build the project
COPY . .
RUN npm run build

# Install 'serve' globally to serve the built files
RUN npm install -g serve

# Expose the port
EXPOSE 5173

# Serve the built files from 'dist' folder
CMD ["serve", "-s", "dist", "-l", "5173"]
