# Django Blockchain API

## Overview

This project is a Django-based REST API for blockchain analytics, monitoring, and management. It provides endpoints for interacting with blockchain data, supports modular connectors, and is containerized for easy deployment.

## Features

- **RESTful API:** Built with Django and Django REST Framework.
- **Modular Design:** `api` app for blockchain-related models, views, and serializers.
- **Database Support:** Uses PostgreSQL (via `psycopg2-binary`).
- **CORS & Filtering:** Supports cross-origin requests and query filtering.
- **Production Ready:** Dockerfile for multi-stage builds and Gunicorn for serving.
- **Easy Management:** Standard Django admin and management commands.

## Project Structure

```
django/
├── api/           # Django app for blockchain API endpoints
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   └── ...
├── ethAPI/        # Django project settings and WSGI/ASGI entrypoints
│   ├── settings.py
│   ├── urls.py
│   └── ...
├── manage.py      # Django management script
├── requirements.txt
├── Dockerfile
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.13
- Docker (recommended)
- PostgreSQL database

### Local Development

1. **Install dependencies:**
  ```bash
  pip install -r requirements.txt
  ```
2. **Configure database in `ethAPI/settings.py`.**
3. **Run migrations:**
  ```bash
  python manage.py migrate
  ```
4. **Start development server:**
  ```bash
  python manage.py runserver
  ```

### Docker Deployment

1. **Build the image:**
  ```bash
  docker build -t django-blockchain-api .
  ```
2. **Run the container:**
  ```bash
  docker run -p 8000:8000 django-blockchain-api
  ```
  The app will be served via Gunicorn at `http://localhost:8000`.

## API Endpoints

- Defined in `api/urls.py` and registered in `ethAPI/urls.py`.
- Customize models, serializers, and views in the `api` app.

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License

MIT License.
