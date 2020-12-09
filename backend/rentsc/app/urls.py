from django.urls import path

from . import views
# This is the path for app/hello and it calls the index function

urlpatterns = [
    path('hello', views.index, name='index'),
    path('createUser', views.createUser, name='createUser'),
    path('getAllListings', views.getAllListings, name='getAllListings'),
    path('getOwnerReviews', views.getOwnerReviews, name='getOwnerReviews'),
    path('getAllRooms', views.getAllRooms, name='getAllRooms'),
    path('getMessages', views.getMessages, name='getMessages'),
    path('createRooms', views.createRooms, name='createRooms'),
    path('createMessage', views.createMessage, name='createMessage')

]
