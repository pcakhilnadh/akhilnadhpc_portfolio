# Multi-stage build for Portfolio Application with Nginx
# Stage 1: Build React Frontend
FROM node:18-alpine AS frontend-builder

# Set working directory for frontend
WORKDIR /app/frontend

# Copy package files
COPY front_end/package*.json ./

# Install dependencies (including devDependencies for build)
RUN npm install

# Copy frontend source code
COPY front_end/ ./

# Build the React application
RUN npm run build

# Stage 2: Nginx + Python Backend
FROM nginx:alpine

# Install Python and required packages
RUN apk add --no-cache \
    python3 \
    py3-pip \
    bash \
    curl \
    && ln -sf python3 /usr/bin/python

# Set working directory for backend
WORKDIR /app

# Create virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy backend requirements and install Python dependencies
COPY back_end/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY back_end/ ./

# Copy built frontend to nginx html directory
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# Copy config.yml to make it accessible to the frontend
COPY front_end/src/config.yml /usr/share/nginx/html/static/src/config.yml

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy startup script
COPY start.sh /start.sh
RUN sed -i 's/\r$//' /start.sh && chmod +x /start.sh

# Create a non-root user for security
RUN adduser -D -s /bin/bash app

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
    && chown -R app:app /app \
    && chown -R app:app /usr/share/nginx/html \
    && chown -R app:app /etc/nginx/nginx.conf \
    && chown app:app /start.sh

# Switch to non-root user
USER app

# Expose the port that Cloud Run expects
EXPOSE 8080

# Set environment variables for production
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV HOST=127.0.0.1
ENV PORT=8000
ENV RELOAD=false
ENV PATH="/opt/venv/bin:$PATH"

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Command to run the application
CMD ["/start.sh"] 