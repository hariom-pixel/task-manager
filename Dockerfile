# Use Node LTS
FROM node:18

# App directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install deps
RUN npm install

# Copy code
COPY . .

# Expose port
EXPOSE 3001

# Start server
CMD ["node", "src/server.js"]