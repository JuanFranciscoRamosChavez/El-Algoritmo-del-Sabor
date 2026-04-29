# 🚀 Guía de Despliegue a Producción

## Frontend - El Algoritmo del Sabor

### Opciones de Hosting

#### 1️⃣ **Vercel** (Recomendado para Next.js/Vite)

```bash
# Instalación de Vercel CLI
npm i -g vercel

# Deploy
vercel

# Setup automático
# - Conecta tu repositorio GitHub
# - Configura variables de entorno en Vercel Dashboard
# - Deploy automático en cada push a main
```

**Configuración en Vercel Dashboard:**
- Environment: `VITE_API_URL=https://api.tudominio.com`
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

#### 2️⃣ **Netlify**

```bash
# Instalación de Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Conectar repositorio
netlify connect
```

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[dev]
  command = "npm run dev"
  port = 3000

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[env.production]]
  VITE_API_URL = "https://api.tudominio.com"

[[env.preview]]
  VITE_API_URL = "https://api-preview.tudominio.com"
```

#### 3️⃣ **AWS S3 + CloudFront**

```bash
# 1. Crear bucket S3
aws s3 mb s3://el-algoritmo-del-sabor

# 2. Construir
npm run build

# 3. Subir archivos
aws s3 sync dist/ s3://el-algoritmo-del-sabor --delete

# 4. Invalidar CloudFront
aws cloudfront create-invalidation --distribution-id E123ABC --paths "/*"
```

**Política de Bucket S3:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::el-algoritmo-del-sabor/*"
    }
  ]
}
```

#### 4️⃣ **Cloudflare Pages**

```bash
# Crear wrangler.toml
name = "el-algoritmo-del-sabor"
type = "javascript"
account_id = "tu_account_id"
workers_dev = true
route = "tudominio.com/*"
zone_id = "tu_zone_id"

[env.production]
route = "https://tudominio.com/*"
zone_id = "tu_zone_id"

# Deploy
npm run build
npx wrangler deploy
```

---

## Backend - Django REST Framework

### Opciones de Hosting

#### 1️⃣ **Heroku** (Más fácil, pero con cambios recientes)

**Procfile:**
```
web: gunicorn config.wsgi --log-file -
release: python manage.py migrate
```

**requirements.txt:**
```
Django==4.2.0
djangorestframework==3.14.0
django-cors-headers==4.0.0
gunicorn==20.1.0
psycopg2-binary==2.9.6
python-dotenv==1.0.0
```

```bash
# Deploy
git push heroku main

# Migraciones
heroku run python manage.py migrate

# Crear superusuario
heroku run python manage.py createsuperuser

# Ver logs
heroku logs --tail
```

#### 2️⃣ **Railway**

```bash
# Instalar CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up

# Variables de entorno en Railway Dashboard:
# DATABASE_URL (automático con PostgreSQL)
# SECRET_KEY
# DEBUG=False
# ALLOWED_HOSTS=tuapp.railway.app
# CORS_ALLOWED_ORIGINS=https://tudominio.com
```

#### 3️⃣ **DigitalOcean App Platform**

**app.yaml:**
```yaml
name: el-algoritmo-del-sabor
services:
- name: web
  github:
    branch: main
    repo: tu_usuario/tu_repo
  build_command: pip install -r requirements.txt && python manage.py migrate
  run_command: gunicorn config.wsgi:application
  http_port: 8080
  envs:
  - key: SECRET_KEY
    scope: RUN_AND_BUILD_TIME
    value: ${SECRET_KEY}
  - key: DEBUG
    value: "False"
  - key: ALLOWED_HOSTS
    value: tuapp.ondigitalocean.app
  health_check:
    http_path: /api/health/

databases:
- name: db
  engine: PG
  version: "14"
```

#### 4️⃣ **AWS EC2 con Gunicorn + Nginx**

```bash
# En tu instancia EC2:

# 1. Actualizar sistema
sudo apt update && sudo apt upgrade -y

# 2. Instalar dependencias
sudo apt install python3-pip python3-venv postgresql postgresql-contrib nginx -y

# 3. Clonar repositorio
git clone https://github.com/tu_usuario/tu_repo.git
cd tu_repo

# 4. Crear virtualenv
python3 -m venv venv
source venv/bin/activate

# 5. Instalar dependencias
pip install -r requirements.txt

# 6. Crear .env
echo "SECRET_KEY=$(python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')" > .env
echo "DEBUG=False" >> .env
echo "ALLOWED_HOSTS=tudominio.com" >> .env

# 7. Migraciones
python manage.py migrate
python manage.py collectstatic --noinput

# 8. Crear usuario superusuario
python manage.py createsuperuser

# 9. Configurar Gunicorn (systemd service)
sudo nano /etc/systemd/system/gunicorn.service
```

**gunicorn.service:**
```ini
[Unit]
Description=Gunicorn daemon for El Algoritmo del Sabor
After=network.target

[Service]
User=ubuntu
Group=ubuntu
WorkingDirectory=/home/ubuntu/tu_repo
ExecStart=/home/ubuntu/tu_repo/venv/bin/gunicorn \
          --workers 4 \
          --bind unix:/run/gunicorn.sock \
          config.wsgi:application

[Install]
WantedBy=multi-user.target
```

```bash
# Habilitar servicio
sudo systemctl enable gunicorn
sudo systemctl start gunicorn

# Configurar Nginx
sudo nano /etc/nginx/sites-available/default
```

**Nginx config:**
```nginx
server {
    listen 80;
    server_name tudominio.com;
    client_max_body_size 20M;

    location = /favicon.ico { 
        access_log off; 
        log_not_found off; 
    }

    location /static/ {
        root /home/ubuntu/tu_repo;
    }

    location /media/ {
        root /home/ubuntu/tu_repo;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;
    }
}
```

```bash
# Habilitar Nginx
sudo systemctl restart nginx

# SSL con Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d tudominio.com
```

#### 5️⃣ **Docker + Docker Compose**

**Dockerfile:**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Instalar dependencias Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY . .

# Crear usuario no-root
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

# Colectar archivos estáticos
RUN python manage.py collectstatic --noinput

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD python -c "import requests; requests.get('http://localhost:8000/api/health/')"

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi:application"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  web:
    build: .
    command: >
      sh -c "python manage.py migrate &&
             python manage.py collectstatic --noinput &&
             gunicorn --bind 0.0.0.0:8000 config.wsgi:application"
    volumes:
      - .:/app
      - static_volume:/app/staticfiles
      - media_volume:/app/media
    ports:
      - "8000:8000"
    environment:
      - DEBUG=False
      - SECRET_KEY=${SECRET_KEY}
      - DB_ENGINE=django.db.backends.postgresql
      - DB_NAME=${DB_NAME}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - DB_HOST=db
      - DB_PORT=5432
      - ALLOWED_HOSTS=localhost,127.0.0.1,tudominio.com
      - CORS_ALLOWED_ORIGINS=https://tudominio.com,https://www.tudominio.com
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/api/health/"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - static_volume:/app/staticfiles:ro
      - media_volume:/app/media:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - web

volumes:
  postgres_data:
  static_volume:
  media_volume:
```

```bash
# Deploy
docker-compose up -d

# Migraciones
docker-compose exec web python manage.py migrate

# Crear superusuario
docker-compose exec web python manage.py createsuperuser
```

---

## Variables de Entorno - Production

**Django (.env):**
```env
# Seguridad
SECRET_KEY=tu_secret_key_aqui
DEBUG=False
ALLOWED_HOSTS=tudominio.com,www.tudominio.com

# Base de datos
DB_ENGINE=django.db.backends.postgresql
DB_NAME=el_algoritmo_sabor
DB_USER=db_user
DB_PASSWORD=db_password
DB_HOST=db.tudominio.com
DB_PORT=5432

# CORS
CORS_ALLOWED_ORIGINS=https://app.tudominio.com,https://www.tudominio.com

# Email (para notificaciones)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=tu_email@gmail.com
EMAIL_HOST_PASSWORD=tu_password

# AWS/Storage
USE_S3=True
AWS_ACCESS_KEY_ID=tu_key
AWS_SECRET_ACCESS_KEY=tu_secret
AWS_STORAGE_BUCKET_NAME=tu_bucket
AWS_S3_REGION_NAME=us-east-1
```

**React (.env.production):**
```env
VITE_API_URL=https://api.tudominio.com
VITE_ENV=production
VITE_ENABLE_LOGGING=false
VITE_API_TIMEOUT=10000
```

---

## Checklist Pre-Producción

### Frontend
- [ ] Builds sin warnings
- [ ] Tests pasando
- [ ] Environment variables configuradas
- [ ] CORS policies validadas
- [ ] Error boundaries implementados
- [ ] Analytics configurado
- [ ] Sitemaps generado
- [ ] PWA manifest actualizado
- [ ] Lighthouse score >90
- [ ] Mobile friendly validado

### Backend
- [ ] DEBUG=False
- [ ] SECURE settings habilitados
- [ ] Database migrations aplicadas
- [ ] Static files colectados
- [ ] Environment variables seguras
- [ ] CORS correctamente configurado
- [ ] Rate limiting activado
- [ ] Logging configurado
- [ ] Backups automáticos
- [ ] Health checks funcionando

---

## Monitoreo Post-Producción

### Frontend
```javascript
// Sentry Error Tracking
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://key@sentry.io/project",
  environment: "production",
  tracesSampleRate: 0.1,
});
```

### Backend
```python
# Django Error Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': '/var/log/django/errors.log',
        },
        'sentry': {
            'level': 'ERROR',
            'class': 'sentry_sdk.integrations.logging.EventHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file', 'sentry'],
            'level': 'ERROR',
            'propagate': True,
        },
    },
}
```

### Monitoreo
- [ ] Uptime monitoring (Ping Todo/UptimeRobot)
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (New Relic/DataDog)
- [ ] Logs centralizados (ELK/Papertrail)
- [ ] Alertas configuradas

---

## Comandos Útiles

```bash
# Ver logs en tiempo real
tail -f /var/log/django/errors.log

# Backup de base de datos
pg_dump el_algoritmo_sabor > backup_$(date +%Y%m%d).sql

# Restaurar backup
psql el_algoritmo_sabor < backup_20240429.sql

# SSH a servidor
ssh -i key.pem ubuntu@tuservidor.com

# Copiar archivos
scp -i key.pem -r dist/ ubuntu@tuservidor.com:/var/www/

# Reiniciar servicios
sudo systemctl restart gunicorn nginx

# Ver estado
sudo systemctl status gunicorn nginx
```

---

**¡Tu aplicación está lista para producción! 🎉**
