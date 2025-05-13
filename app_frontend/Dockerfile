FROM node:18-alpine AS builder
WORKDIR /app

# 1. ติดตั้ง system dependencies
RUN apk add --no-cache python3 make g++

# 2. รับ build-time arguments
ARG NEXT_PUBLIC_PRODUCT_API_URL
ARG NEXT_PUBLIC_USER_API_URL

# 3. คัดลอกและติดตั้ง dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# 4. คัดลอก source code ทั้งหมด
COPY . .

# 5. Build ด้วย environment variables
RUN NEXT_PUBLIC_PRODUCT_API_URL=$NEXT_PUBLIC_PRODUCT_API_URL \
    NEXT_PUBLIC_USER_API_URL=$NEXT_PUBLIC_USER_API_URL \
    npm run build

# Runtime stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["npm", "start"]