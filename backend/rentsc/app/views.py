import firebase_admin
from django.shortcuts import render
from django.http import HttpResponse
from firebase_admin import auth
from firebase_admin import firestore
from django.http import JsonResponse


# Backend code belongs here
default_app = firebase_admin.initialize_app()
db = firestore.client()

def index(request):
    # return HttpResponse("Hello, world. You're at the polls index.")

    res = []
    users_ref = db.collection(u'user')
    docs = users_ref.stream()

    for doc in docs:
        res.append((f'{doc.id} => {doc.to_dict()}'))
    return JsonResponse(res, safe=False)    
# Create your views here.
