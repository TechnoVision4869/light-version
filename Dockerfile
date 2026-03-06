# Step 1: Build the React/Vite app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Use a tiny Nginx to serve the files
FROM nginx:alpine
# Copy the built files from the 'builder' stage
COPY --from=builder /app/dist /usr/share/nginx/html

# This part tells the MINI Nginx how to handle the React files
# so that the VPS Nginx can talk to it properly.
RUN echo "server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files \$uri \$uri/ /index.html; \
    } \
}" > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
