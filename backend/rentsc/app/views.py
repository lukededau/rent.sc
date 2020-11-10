import firebase_admin
from django.shortcuts import render
from django.http import HttpResponse
from firebase_admin import auth
from firebase_admin import firestore
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
# Backend code belongs here
if not firebase_admin._apps:
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

# Creates a basic user profile
# A basic user profile contains the following:
#    0. Password
#    1. First Name
#    2. Last Name
#    3. email
@csrf_exempt
def createUser(request):
    body = json.loads(request.body.decode('utf-8'))
    print(body)
    print(request.body)
    print(body.keys())
    fullName = "{} {}".format(body['firstName'], body['lastName']) 
    auth.create_user(email=body['email'], display_name=fullName, 
        password=body['password'], uid=body['email'])
    return HttpResponse("WOoHoO")

def getAllListings(request):
    res = []
    listings_ref = db.collection(u'listing')
    docs = listings_ref.stream()

    for doc in docs:
        res.append(doc.to_dict())
    response = JsonResponse(res, safe=False)
  
    response['Access-Control-Allow-Origin'] = '*'
    response["Access-Control-Allow-Methods"] = '*'
    response["Access-Control-Allow-Headers"] = '*'
    return response