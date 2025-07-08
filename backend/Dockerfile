FROM python:3.13.2-alpine

# Set working directory inside the container
WORKDIR /app

# Environment configs
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Upgrade pip
RUN pip install --upgrade pip

# ✅ Copy requirements.txt from backend/ into container
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r /app/requirements.txt

# ✅ Copy Django app code from backend/app/ into container /app/
COPY app/ /app/

# Make the start script executable
RUN chmod +x /app/start.sh

EXPOSE 8000

CMD ["sh", "/app/start.sh"]