# Django Backend - Configuración para "El Algoritmo del Sabor"

## ============================================================
## 1. settings.py
## ============================================================

# Agregar estas configuraciones a tu settings.py de Django

# CORS Configuration
INSTALLED_APPS = [
    # ... otras apps
    'corsheaders',
    'rest_framework',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Debe estar al inicio
    'django.middleware.common.CommonMiddleware',
    # ... otros middleware
]

# Permitir solicitudes desde el frontend
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    # Agregar URLs de producción aquí
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE']

# Django REST Framework
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ],
}


## ============================================================
## 2. models.py
## ============================================================

from django.db import models

class Taco(models.Model):
    SPICINESS_CHOICES = [
        ('mild', 'Suave'),
        ('medium', 'Medio'),
        ('hot', 'Picoso'),
    ]
    
    SIZE_CHOICES = [
        ('light', 'Aperitivo'),
        ('normal', 'Normal'),
        ('heavy', 'Mucha Hambre'),
    ]
    
    PROTEIN_CHOICES = [
        ('chicken', 'Pollo'),
        ('beef', 'Res'),
        ('pork', 'Cerdo'),
    ]

    # Información básica
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    
    # Características
    spiciness = models.CharField(max_length=10, choices=SPICINESS_CHOICES)
    size = models.CharField(max_length=10, choices=SIZE_CHOICES)
    protein = models.CharField(max_length=10, choices=PROTEIN_CHOICES)
    
    # Datos adicionales
    ingredients = models.JSONField(default=list)  # Lista de ingredientes
    calories = models.IntegerField(default=0)
    prep_time = models.IntegerField(default=10)  # En minutos
    rating = models.FloatField(default=0.0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-rating']
        indexes = [
            models.Index(fields=['spiciness', 'protein']),
            models.Index(fields=['is_active']),
        ]

    def __str__(self):
        return self.name


## ============================================================
## 3. serializers.py
## ============================================================

from rest_framework import serializers
from .models import Taco

class TacoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taco
        fields = [
            'id', 'name', 'description', 'price',
            'spiciness', 'size', 'protein',
            'ingredients', 'calories', 'prep_time', 'rating'
        ]


class TacoRecommendationSerializer(serializers.Serializer):
    """Serializer para la solicitud de recomendación"""
    spiciness = serializers.ChoiceField(choices=['mild', 'medium', 'hot'])
    hunger = serializers.ChoiceField(choices=['light', 'normal', 'heavy'])
    preference = serializers.ChoiceField(choices=['chicken', 'beef', 'pork'])

    def validate(self, data):
        if not all([data.get('spiciness'), data.get('hunger'), data.get('preference')]):
            raise serializers.ValidationError("Todos los campos son requeridos")
        return data


## ============================================================
## 4. views.py
## ============================================================

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .models import Taco
from .serializers import TacoSerializer, TacoRecommendationSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def recommend_taco(request):
    """
    Endpoint para obtener recomendación de taco
    
    POST /api/recommend-taco/
    {
        "spiciness": "hot" | "medium" | "mild",
        "hunger": "heavy" | "normal" | "light",
        "preference": "beef" | "chicken" | "pork"
    }
    """
    serializer = TacoRecommendationSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    spiciness = serializer.validated_data['spiciness']
    hunger = serializer.validated_data['hunger']
    preference = serializer.validated_data['preference']

    try:
        # Mapeo de hunger a size de taco
        size_map = {
            'light': 'light',
            'normal': 'normal',
            'heavy': 'heavy'
        }
        size = size_map.get(hunger, 'normal')

        # Buscar taco que coincida con criterios
        taco = Taco.objects.filter(
            spiciness=spiciness,
            size=size,
            protein=preference,
            is_active=True
        ).order_by('-rating').first()

        # Si no hay coincidencia exacta, buscar por proteína y picante
        if not taco:
            taco = Taco.objects.filter(
                spiciness=spiciness,
                protein=preference,
                is_active=True
            ).order_by('-rating').first()

        # Si aún no hay taco, buscar por proteína únicamente
        if not taco:
            taco = Taco.objects.filter(
                protein=preference,
                is_active=True
            ).order_by('-rating').first()

        # Fallback: taco más popular
        if not taco:
            taco = Taco.objects.filter(
                is_active=True
            ).order_by('-rating').first()

        if not taco:
            return Response(
                {'error': 'No hay tacos disponibles en este momento'},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = TacoSerializer(taco)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


## ============================================================
## 5. urls.py
## ============================================================

from django.urls import path
from . import views

app_name = 'tacos'

urlpatterns = [
    path('api/recommend-taco/', views.recommend_taco, name='recommend_taco'),
    # Agregar más endpoints aquí según necesites
]


## ============================================================
## 6. admin.py
## ============================================================

from django.contrib import admin
from .models import Taco

@admin.register(Taco)
class TacoAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'spiciness', 'protein', 'rating', 'is_active']
    list_filter = ['spiciness', 'protein', 'size', 'is_active', 'created_at']
    search_fields = ['name', 'description']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Información Básica', {
            'fields': ('name', 'description', 'price')
        }),
        ('Características', {
            'fields': ('spiciness', 'size', 'protein')
        }),
        ('Detalles', {
            'fields': ('ingredients', 'calories', 'prep_time', 'rating')
        }),
        ('Estado', {
            'fields': ('is_active', 'created_at', 'updated_at')
        }),
    )


## ============================================================
## 7. management/commands/populate_tacos.py
## ============================================================
## (Crear archivo: tacos/management/commands/populate_tacos.py)

from django.core.management.base import BaseCommand
from tacos.models import Taco

class Command(BaseCommand):
    help = 'Popula la BD con tacos de ejemplo'

    def handle(self, *args, **options):
        tacos_data = [
            {
                'name': 'El Fuego Absoluto',
                'description': 'Explosión de sabor con carne asada marinada en chipotle',
                'price': '8.99',
                'spiciness': 'hot',
                'size': 'heavy',
                'protein': 'beef',
                'ingredients': ['carne asada', 'chipotle', 'cebolla', 'cilantro', 'lima'],
                'calories': 450,
                'prep_time': 12,
                'rating': 4.8,
            },
            {
                'name': 'Pollo Suave y Tierno',
                'description': 'Pollo marinado con limón y hierbas, toque de crema',
                'price': '7.99',
                'spiciness': 'mild',
                'size': 'normal',
                'protein': 'chicken',
                'ingredients': ['pollo', 'limón', 'crema', 'cilantro', 'cebolla'],
                'calories': 380,
                'prep_time': 10,
                'rating': 4.6,
            },
            {
                'name': 'Cerdo Acaramelado',
                'description': 'Cerdo marinado en naranja y especias, caramelizado al comal',
                'price': '8.49',
                'spiciness': 'medium',
                'size': 'normal',
                'protein': 'pork',
                'ingredients': ['cerdo', 'naranja', 'especias', 'cebolla', 'cilantro'],
                'calories': 420,
                'prep_time': 15,
                'rating': 4.7,
            },
            {
                'name': 'Res Infernal',
                'description': 'Carne de res picante con habanero y chipotle',
                'price': '9.49',
                'spiciness': 'hot',
                'size': 'heavy',
                'protein': 'beef',
                'ingredients': ['res', 'habanero', 'chipotle', 'cebolla roja', 'cilantro'],
                'calories': 480,
                'prep_time': 14,
                'rating': 4.9,
            },
            {
                'name': 'Pollo Ligero',
                'description': 'Pollo a la parrilla, perfecto para aperitivo',
                'price': '6.99',
                'spiciness': 'mild',
                'size': 'light',
                'protein': 'chicken',
                'ingredients': ['pollo', 'limón', 'cilantro', 'cebolla'],
                'calories': 280,
                'prep_time': 8,
                'rating': 4.5,
            },
        ]

        for taco_data in tacos_data:
            taco, created = Taco.objects.get_or_create(
                name=taco_data['name'],
                defaults=taco_data
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'✓ Creado: {taco.name}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'⊘ Ya existe: {taco.name}')
                )

## ============================================================
## EJECUTAR SETUP
## ============================================================

# En tu terminal, ejecuta:
# 1. python manage.py makemigrations
# 2. python manage.py migrate
# 3. python manage.py populate_tacos
# 4. python manage.py runserver

