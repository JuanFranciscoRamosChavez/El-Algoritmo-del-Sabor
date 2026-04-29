# ⚡ Quick Start & Troubleshooting

## 🚀 Instalación en 5 Minutos

### Paso 1: Clonar y Setup Frontend

```bash
# Ir a la carpeta del proyecto
cd "Algoritmo de sabor"

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

✅ Frontend listo en: `http://localhost:5173`

---

### Paso 2: Setup Django Backend

```bash
# Crear carpeta para Django (una sola vez)
mkdir django_backend
cd django_backend

# Crear y activar virtual environment
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Crear requirements.txt
cat > requirements.txt << EOF
Django==4.2.0
djangorestframework==3.14.0
django-cors-headers==4.0.0
gunicorn==20.1.0
psycopg2-binary==2.9.6
python-dotenv==1.0.0
EOF

# Instalar dependencias
pip install -r requirements.txt

# Crear proyecto Django
django-admin startproject config .
django-admin startapp tacos

# Crear .env
cat > .env << EOF
SECRET_KEY=django-insecure-ejemplo-key-cambiar-en-produccion
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=db.sqlite3
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
EOF
```

✅ Backend ready en: `http://localhost:8000`

---

## 🔧 Configuración Rápida

### Django settings.py

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'tacos',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

---

## 📱 Vista Previa Interactiva

Abre `PREVIEW.html` en tu navegador para ver una demostración interactiva de la interfaz sin necesidad de instalar nada.

```bash
# En Windows
start PREVIEW.html

# En Mac
open PREVIEW.html

# En Linux
xdg-open PREVIEW.html
```

---

## 🐛 Troubleshooting

### ❌ Error: CORS policy blocked

**Problema:** En browser: `Access to XMLHttpRequest at 'http://localhost:8000...' has been blocked by CORS policy`

**Solución:**
```python
# Django settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Verifica puerto correcto
    "http://127.0.0.1:5173",
]

# Reinicia Django
python manage.py runserver
```

---

### ❌ Error: Module not found

**Problema:** `ModuleNotFoundError: No module named 'react'`

**Solución:**
```bash
# Instala dependencias correctamente
npm install

# Limpia cache
rm -rf node_modules
npm install
```

---

### ❌ Error: Port already in use

**Problema:** `Port 5173 is already in use`

**Solución:**
```bash
# Opción 1: Matar proceso en el puerto
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5173
kill -9 <PID>

# Opción 2: Usar otro puerto
npm run dev -- --port 5174
```

---

### ❌ Error: npm command not found

**Problema:** `npm: command not found`

**Solución:** Instala Node.js desde https://nodejs.org

```bash
# Verifica instalación
node --version
npm --version
```

---

### ❌ Error: Django migrations failed

**Problema:** `No such table: tacos_taco`

**Solución:**
```bash
# Crea migraciones
python manage.py makemigrations

# Aplica migraciones
python manage.py migrate

# Verifica
python manage.py showmigrations
```

---

### ❌ Error: venv activation failed

**Problema:** `venv\Scripts\activate: No such file or directory`

**Solución:**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate

# Verifica que esté activo (debe mostrar (venv) en terminal)
```

---

## 📝 Comandos Útiles

### Frontend

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Previsualizar build
npm run preview

# Lint (verificar errores)
npm run lint

# Formatear código
npm run format
```

### Backend

```bash
# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Ejecutar servidor
python manage.py runserver

# Shell interactivo de Django
python manage.py shell

# Crear datos de ejemplo
python manage.py populate_tacos

# Recolectar archivos estáticos
python manage.py collectstatic
```

---

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests con cobertura
npm test -- --coverage

# Tests en modo watch
npm test -- --watch
```

---

## 📊 Verificar Instalación

### Checklist

```bash
# 1. Node.js instalado
node --version  # Debe ser 16+

# 2. npm instalado
npm --version   # Debe ser 8+

# 3. Python instalado
python --version  # Debe ser 3.8+

# 4. Dependencias React instaladas
npm list react  # Debe estar listado

# 5. Dependencias Django instaladas
pip list | grep Django  # Debe estar listado

# 6. Puerto 5173 disponible
netstat -ano | findstr :5173  # No debe mostrar nada

# 7. Puerto 8000 disponible
netstat -ano | findstr :8000  # No debe mostrar nada
```

---

## 🎯 Estructura de Carpetas Mínima para Empezar

```
Algoritmo de sabor/
├── src/
│   ├── TacoPicker.jsx      ✅ Ya creado
│   ├── App.jsx             ✅ Ya creado
│   └── main.jsx            (crear)
│
├── tailwind.config.js       ✅ Ya creado
├── package.json            ✅ Ya creado
├── .env.example            ✅ Ya creado
│
└── django_backend/         (crear)
    ├── manage.py           (crear)
    ├── requirements.txt    (crear)
    ├── config/
    │   ├── settings.py     (crear)
    │   └── urls.py         (crear)
    └── tacos/
        ├── models.py       (crear)
        ├── views.py        (crear)
        └── urls.py         (crear)
```

---

## 📞 Recursos de Ayuda

- **React Docs:** https://react.dev
- **Tailwind Docs:** https://tailwindcss.com/docs
- **Django Docs:** https://docs.djangoproject.com
- **Vite Docs:** https://vitejs.dev

---

## ✅ Checklist de Verificación

### Frontend Funcionando

- [ ] `npm run dev` sin errores
- [ ] Browser abre automáticamente en http://localhost:5173
- [ ] Pantalla home visible con botón "Descubrir mi taco ideal"
- [ ] Estilos coloridos (rojo, naranja) visibles
- [ ] Click en botón no da error (esperará API)

### Backend Funcionando

- [ ] `python manage.py runserver` sin errores
- [ ] http://localhost:8000/admin/ accesible
- [ ] http://localhost:8000/api/recommend-taco/ retorna error 405 (normal sin POST)

### Integración Funcionando

- [ ] Responder preguntas en frontend
- [ ] Ver spinner de carga
- [ ] Recibir recomendación del backend
- [ ] Mostrar resultado con taco

---

## 🔐 Seguridad Pre-Producción

**¡IMPORTANTE! Antes de ir a producción:**

```bash
# 1. Cambiar SECRET_KEY
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'

# 2. DEBUG = False
echo "DEBUG=False" >> .env

# 3. ALLOWED_HOSTS configurado
echo "ALLOWED_HOSTS=tudominio.com,www.tudominio.com" >> .env

# 4. CSRF token en requests
# (automático con Django)

# 5. HTTPS habilitado
# (configurar en hosting)
```

---

## 🎓 Próximos Pasos

1. **Lee:** `README.md`
2. **Código:** `TacoPicker.jsx`
3. **Backend:** `DJANGO_BACKEND.md`
4. **Testing:** `TESTING.md`
5. **Deploy:** `DESPLIEGUE.md`

---

**¡Estás listo para empezar! 🚀**

*Si tienes dudas, consulta la documentación completa o los archivos de ejemplo.*
