# --- Stage 1: build the React frontend ---
FROM node:20-slim AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
# Same-origin deploy: frontend and API are served by the same Django
# process, so the API base is just a relative path, not a hostname.
ENV VITE_API_BASE_URL=/api
RUN npm run build

# --- Stage 2: Django + the built frontend ---
FROM python:3.11-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app/backend

RUN apt-get update && apt-get install -y --no-install-recommends libpq5 \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist

RUN python manage.py collectstatic --noinput

EXPOSE 8000
CMD python manage.py migrate --noinput && python manage.py ensure_superuser && python manage.py seed_demo_data && gunicorn config.wsgi:application --bind 0.0.0.0:${PORT:-8000}
