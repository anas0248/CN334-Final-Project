FROM node:18-alpine AS builder
WORKDIR /app

# 1. ติดตั้ง system dependencies
RUN apk add --no-cache python3 make g++ && npm config set cache /tmp --global

# 2. ตั้งค่า build arguments
ARG NEXT_PUBLIC_PRODUCT_API_URL
ARG NEXT_PUBLIC_USER_API_URL

# 3. ติดตั้ง dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# 4. คัดลอก source code
COPY . .

# 5. Build application
RUN NEXT_PUBLIC_PRODUCT_API_URL=${NEXT_PUBLIC_PRODUCT_API_URL} \
    NEXT_PUBLIC_USER_API_URL=${NEXT_PUBLIC_USER_API_URL} \
    npm run build || (cat /app/.next/build-stats.json && exit 1)

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