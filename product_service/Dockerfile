# Dockerfile
FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# ติดตั้ง dependencies ที่จำเป็นสำหรับการ build
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        gcc \
        libpq-dev \
        libjpeg-dev \
        zlib1g-dev \
        python3-dev \
    && rm -rf /var/lib/apt/lists/*

# ติดตั้ง Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# คัดลอก source code
COPY . .

# รวบรวม static files
RUN python manage.py collectstatic --noinput || true

# เปิดพอร์ต 8000
EXPOSE 8000

# เริ่ม Gunicorn
CMD ["gunicorn", "product_service.wsgi:application", "--bind", "0.0.0.0:8000"]
