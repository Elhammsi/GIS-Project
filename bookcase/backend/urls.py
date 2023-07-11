
from django.urls import path
from .import views

urlpatterns = [
    # ... other URL patterns ...
    path('bookcase/all', views.BookcaseList.as_view(), name=views.BookcaseList.name),
    path('addbookcase/', views.addbookcase, name='add_bookcase'),
   
   
]
   # path('bookcase/add', add_bookcase, name='add_bookcase'),
    
