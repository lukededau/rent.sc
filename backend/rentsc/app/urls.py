from django.urls import path

from . import views
# This is the path for app/hello and it calls the index function

urlpatterns = [
    path('hello', views.index, name='index'),
    path('createUser', views.createUser, name='createUser'),
    path('getAllListings', views.getAllListings, name='getAllListings')
]
