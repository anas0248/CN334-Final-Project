FROM node:18-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_PUBLIC_PRODUCT_API_URL=https://cn334-product-api.onrender.com
ENV NEXT_PUBLIC_USER_API_URL=https://cn334-user-api.onrender.com
ENV PORT=3000

# Debugging: Print environment variables
RUN echo "NEXT_PUBLIC_PRODUCT_API_URL=$NEXT_PUBLIC_PRODUCT_API_URL"
RUN echo "NEXT_PUBLIC_USER_API_URL=$NEXT_PUBLIC_USER_API_URL"

# Build app
RUN npm run build --verbose

EXPOSE 3000

CMD ["npm", "start"]