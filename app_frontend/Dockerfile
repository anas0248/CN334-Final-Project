FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Environment variables
ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_PUBLIC_PRODUCT_API_URL=https://product-api.onrender.com
ENV NEXT_PUBLIC_USER_API_URL=https://user-api.onrender.com

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]