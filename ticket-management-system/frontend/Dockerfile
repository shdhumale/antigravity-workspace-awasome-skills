# Stage 1: Build the Angular application
FROM node:18-alpine as build
WORKDIR /app

# Install dependencies strictly
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
# Copy the built site from the build stage
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copy a custom nginx proxy configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
