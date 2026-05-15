# Multi-stage build for Portfolio Application with Nginx
# Stage 1: Build React Frontend
FROM node:18-alpine AS frontend-builder

# Set working directory for frontend
WORKDIR /app/frontend

# Copy package files
COPY front_end/package*.json ./

# Install dependencies (including devDependencies for build)
RUN npm install

# Copy public directory for static assets like robots.txt and sitemap.xml
COPY front_end/public ./public/

# Copy frontend source code
COPY front_end/ ./

# Ensure lib directory is copied explicitly
COPY front_end/src/lib ./src/lib/

# Verify lib directory is copied
RUN ls -la ./src/lib/

# Build the React application
RUN npm run build

# Stage 2: Nginx
FROM nginx:alpine

# Copy built frontend to nginx html directory
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# Copy config.yml to make it accessible to the frontend
COPY front_end/src/config.yml /usr/share/nginx/html/static/src/config.yml

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create a non-root user for security
RUN adduser -D -s /bin/sh app

# Create nginx cache directories and set permissions
RUN mkdir -p /var/cache/nginx/client_temp \
    /var/cache/nginx/proxy_temp \
    /var/cache/nginx/fastcgi_temp \
    /var/cache/nginx/uwsgi_temp \
    /var/cache/nginx/scgi_temp \
    /var/log/nginx \
    /run \
    && chown -R app:app /var/cache/nginx \
    && chown -R app:app /var/log/nginx \
    && chown -R app:app /run \
    && chown -R app:app /usr/share/nginx/html \
    && chown -R app:app /etc/nginx/nginx.conf \
    && touch /run/nginx.pid \
    && chown -R app:app /run/nginx.pid

# Switch to non-root user
USER app

# Expose the port that Cloud Run expects
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:8080/health || exit 1

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]