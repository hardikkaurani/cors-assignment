# Stage 1: Build stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
# This layer is cached and only rebuilds if these files change
COPY package.json package-lock.json ./

# Use npm ci (clean install) instead of npm install for production
# npm ci respects exact versions in package-lock.json
RUN npm ci --only=production

# Copy the entire application source code
COPY . .

# Expose the port the server listens on
EXPOSE 5000

# Health check (optional but recommended)
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/test', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the application
CMD ["node", "server.js"]
