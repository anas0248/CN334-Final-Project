FROM node:18-alpine

WORKDIR /app

# Set environment variables before build
ENV NODE_ENV=production
ENV NEXT_PUBLIC_PRODUCT_API_URL=https://product-api.onrender.com
ENV NEXT_PUBLIC_USER_API_URL=https://user-api.onrender.com
ENV PORT=3000

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Add jsconfig.json if needed for alias `@`
# COPY jsconfig.json ./   ← ตรวจให้แน่ใจว่ามีใน repo

# Build app (uses env vars)
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
