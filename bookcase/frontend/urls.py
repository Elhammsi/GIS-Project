from django.urls import path
from . import views
app_name='frontend'
urlpatterns=[
    path('',views.bookcase),
    path('', views.add_bookcase, name='add_bookcase'),
]