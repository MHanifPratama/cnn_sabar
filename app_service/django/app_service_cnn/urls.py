"""
URL configuration for app_service_cnn project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import views,predict,rest_api

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.hello, name='hello'),
    path('upload/', predict.predict_image, name='upload_form'),
    path('camera/', rest_api.camera_page, name='camera_page'),
    path('api/predict/', rest_api.predict_image_api, name='predict_image_api'),
    path('api/predict_loop/', rest_api.predict_image_api_loop, name='predict_image_api_loop')
]
