FROM node:18-alpine

WORKDIR /app

# Set environment variables BEFORE build
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_PUBLIC_PRODUCT_API_URL=https://product-api.onrender.com
ENV NEXT_PUBLIC_USER_API_URL=https://user-api.onrender.com

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Build application (can now access env vars)
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
