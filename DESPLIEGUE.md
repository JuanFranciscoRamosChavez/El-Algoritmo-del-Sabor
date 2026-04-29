# 🚀 Guía de Despliegue a Producción

## Frontend - El Algoritmo del Sabor

# Guía de Despliegue

## Opción recomendada: Vercel

Este repositorio está preparado para publicarse como sitio estático en Vercel.

### Pasos

1. Sube el proyecto a GitHub.
2. En Vercel, importa el repositorio.
3. Confirma estos valores:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Despliega.

### Variables de entorno

Si en el futuro conectas un backend externo, agrega:

```env
VITE_API_URL=https://tu-backend-ejemplo.com
```

## Opción local para revisar el build

```bash
npm install
npm run build
```

El resultado se genera en `dist/`.

## Qué no forma parte de este repo

- No hay backend Django dentro de esta carpeta.
- No hay configuración de producción para Heroku, Railway o EC2 incluida aquí.
- No se requiere `vercel.json` para el despliegue básico.

## Problemas comunes

- Si Vercel falla, revisa que el proyecto esté usando [index.html](index.html) como entrada en la raíz.
- Si necesitas un API real, apunta `VITE_API_URL` al backend que despliegues por separado.
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
