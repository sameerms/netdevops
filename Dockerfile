# Base Image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy application code
COPY . /app


# Expose port
EXPOSE 8000

# Run the app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
