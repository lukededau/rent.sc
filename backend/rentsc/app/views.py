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

@csrf_exempt
def createRooms(request):
    body = json.loads(request.body.decode('utf-8'))
    newRoomRef = db.collection(u'rooms').document()
    newRoomRef.set(body)

    print(newRoomRef)
    newUsertoRoom = db.collection(u'userToRoom').document()
    newUsertoRoom.set({
        u'room_id': newRoomRef.id,
        u'user_id': body['sender']
    })
    newUsertoRoom1 = db.collection(u'userToRoom').document()
    newUsertoRoom1.set({
        u'room_id': newRoomRef.id,
        u'user_id': body['receiver']
    })
    return HttpResponse("Created Room Successfully")

@csrf_exempt
def createMessage(request):

    body = json.loads(request.body.decode('utf-8'))  
    data = {
        u'sender': body['sender'],
        u'msg': body['msg'],
        u'time': body['time']
    }
    newMsgRef = db.collection(u'rooms').document(body['room_id'])
    message_ref = newMsgRef.collection(u'messages').document().set(data)

    return HttpResponse("Created Msg Successfully")

def getAllRooms(request):
    body = json.loads(request.body.decode('utf-8'))
    if body['user_id'] is None:
        return  HttpResponse("No user ID")
    print(body)
    res = []
    room_ref = db.collection(u'userToRoom')
    user_id = body['user_id']

    query_ref = room_ref.where(u'user_id', u'==', user_id)
    docs = query_ref.stream()

        
    for doc in docs:
        query_ref1 = room_ref.where(u'room_id', u'==', doc.to_dict()['room_id'])
        docs1 = query_ref1.stream()
        for doc1 in docs1:
            if doc1.to_dict()['user_id'] != user_id:
                dic = {"doc_id": doc1.id}
                dic.update(doc1.to_dict())
                res.append(dic)

    response = JsonResponse(res, safe=False)
    response['Access-Control-Allow-Origin'] = '*'
    response["Access-Control-Allow-Methods"] = '*'
    response["Access-Control-Allow-Headers"] = '*'
    return response

@csrf_exempt
def getMessages(request):
    body = json.loads(request.body.decode('utf-8'))
    res = []
    room_a_ref = db.collection(u'rooms').document(body['room_id'])
    message_ref = room_a_ref.collection(u'messages')
    docs = message_ref.stream()

        
    for doc in docs:
        res.append(doc.to_dict())
    res.sort(key = lambda x : x["time"])
    response = JsonResponse(res, safe=False)
    response["Access-Control-Allow-Origin"] = '*'
    response["Access-Control-Allow-Credentials"] = 'True'
    response["Access-Control-Allow-Methods"] = '*'
    response["Access-Control-Allow-Headers"] = '*'
    return response