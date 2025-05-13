FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_PUBLIC_PRODUCT_API_URL=https://product-api.onrender.com
ENV NEXT_PUBLIC_USER_API_URL=https://user-api.onrender.com
ENV PORT=3000

COPY package.json package-lock.json* ./
RUN npm ci

# ✅ Copy jsconfig.json และ source code
COPY . .

# ✅ Run build (alias `@` จะใช้ได้ถ้า jsconfig/webpack ถูกต้อง)
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
