# Nginx Configuration

This repository contains an Nginx configuration file for a project with separate frontend and backend services.

## Overview

- **HTTP (port 80):**  
    - Requests to `/` are proxied to the frontend (`http://frontend:3000`).
    - Requests to `/api/` are proxied to the backend (`http://backend:8000`).

- **HTTPS (port 443):**  
    - SSL certificates are loaded from `/etc/nginx/ssl/localhost.crt` and `/etc/nginx/ssl/localhost.key`.
    - Requests to `/` and `/api/` are proxied similarly to the HTTP configuration.

## File Structure

- `nginx.conf` — Main Nginx configuration file.

## Proxy Headers

Both frontend and backend locations set the following headers:
- `Host`
- `X-Real-IP`
- `X-Forwarded-For`
- `X-Forwarded-Proto`

## Usage

1. Place your SSL certificates in `/etc/nginx/ssl/`.
2. Update service names (`frontend`, `backend`) if needed.
3. Start Nginx with this configuration.

## Example

```nginx
server {
        listen 80;
        server_name localhost;

        location / {
                proxy_pass http://frontend:3000;
                # ...headers...
        }

        location /api/ {
                proxy_pass http://backend:8000;
                # ...headers...
        }
}
```

## License

See repository for license details.