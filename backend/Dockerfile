FROM python:3.11-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Collect static files (for production)
# RUN python manage.py collectstatic --noinput

# Run migrations on startup (development only)
# CMD python manage.py migrate && python manage.py runserver 0.0.0.0:8000

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]