# Stage 1: Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
# This layer is cached and only rebuilds if dependencies change
COPY package.json package-lock.json ./

# Use npm ci (clean install) for deterministic, reproducible builds
RUN npm ci

# Copy the entire application source code
COPY . .

# Build the Vite application
# This generates the optimized dist/ folder for production
RUN npm run build

# ============================================
# Stage 2: Production stage using Nginx
# ============================================
FROM nginx:alpine

# Copy nginx configuration for SPA routing and caching
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from build stage
# --from=build references the first stage's filesystem
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
