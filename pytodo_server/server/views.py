import json
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Content
from django.utils import timezone

# def str_to_dict(str) :
#     keys = []
#     valeus = []
#     result = {}
#     save = False
#     is_key = True
#     word = ''
#     for i in range(len(str)) :        
#         if (save == True) & (is_key == True) & (str[i] == '\"') :            
#             keys.append(word)
#             word = ''
#             is_key = not is_key            
#         elif (save == True) & (is_key == False) & (str[i] == '\"') :            
#             valeus.append(word)
#             word = ''
#             is_key = not is_key
#         elif save == True :
#             word += str[i]        
#         if str[i] == '\"' :
#             save = not save
#     for i in range(len(keys)) :
#         result[keys[i]] = valeus[i]
#     return result

# 한글 입력 때문에  json.loads()사용하기

def getdays(request, username) : 
    year = request.GET['year']
    month = request.GET['month']

    target_user = User.objects.get(username = username)

    todolists = Content.objects.filter(user_id=target_user.id)
    days = set()

    for todo in todolists :
        if (todo.pub_date.month == int(month)) & (todo.pub_date.year == int(year)) :
            days.add(todo.pub_date.day)

    days = list(days)
    response = JsonResponse({ 'data' : days, 'message' : 'ok'})
    return response


def gettodos(request, username) :
    year = request.GET['year']
    month = request.GET['month']
    day = request.GET['day']

    target_user = User.objects.get(username = username)
    # print(target_user)

    todolists = Content.objects.filter(user_id = target_user.id)
    todos = []

    # print(user_id, day, todolists[0].pub_date.day)
    # print(todolists)
    # print(type(todolists[0].pub_date.day), type(day))

    for todo in todolists:
        if (todo.pub_date.year == int(year)) & (todo.pub_date.month == int(month)) & (todo.pub_date.day == int(day)) :
            todos.append({
                'content_id' : todo.id,
                'todo' : todo.todo,
                'pub_date' : todo.pub_date
                })

    response = JsonResponse({ 'data' : todos, 'message' : 'ok' })
    # response.status_code = 202
    return response

def double_check(request) :
    username = request.GET['username']
    target_user = User.objects.filter(username = username)
    
    response = JsonResponse({ 'message' : 'username available!'})
    if len(target_user) != 0 :
        response = JsonResponse({ 'message' : 'This id already exists.' })
    return response

def signup(request) :
    body = json.loads(request.body)

    username = body['username'] 
    password = body['password'] 

    new_user = User.objects.create_user(username, '', password)
    new_user.save()

    response = JsonResponse({ 'message' : 'ok'})
    return response

def login(request) :    
    body = json.loads(request.body)

    username = body['username']
    password = body['password']    

    target_user = authenticate(username = username, password = password)

    response = JsonResponse({ 'message' : 'Wrong username or password' })
    response.status_code = 404

    if target_user is not None :
        response = JsonResponse({ 'message' : 'ok' })        
        response.status_code = 200
    
    return response

def write(request) : 
    body = json.loads(request.body)
    print(body)
    todo = body['todo']
    username = body['username']
    now = timezone.now()

    target_user = User.objects.get(username = username)
    new_todo = Content(user_id = target_user.id, todo = todo, pub_date = now)
    # new_todo.user_id = target_user.id
    # new_todo.todo = todo
    new_todo.save()
    # print(new_todo.todo)
    todos = Content.objects.filter(user_id = target_user.id)
    todolists = []

    for todo in todos :
        if (todo.pub_date.year == now.year) & (todo.pub_date.month == now.month) & (todo.pub_date.day == now.day) :
            todolists.append({
                'content_id' : todo.id,
                'todo' : todo.todo,
                'pub_date' : todo.pub_date
                })
    
    response = JsonResponse({ 'data' : todolists ,'message' : 'ok' })

    return response

def delete(request) :
    # print(str(request.body))
    body = json.loads(request.body)

    username = body['username']
    content_id = body['content_id']

    target_user = User.objects.get(username = username)

    target_content = Content.objects.get(id = content_id)
    year = target_content.pub_date.year
    month = target_content.pub_date.month
    day = target_content.pub_date.day
    target_content.delete()

    todos = Content.objects.filter(user_id = target_user.id)
    todolists = []

    for todo in todos :
        if (todo.pub_date.year == year) & (todo.pub_date.month == month) & (todo.pub_date.day == day) :
            todolists.append({
                'content_id' : todo.id,
                'todo' : todo.todo,
                'pub_date' : todo.pub_date
                })

    response = JsonResponse({ 'data' : todolists, 'message' : 'ok'})
    
    return response


