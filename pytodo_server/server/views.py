import json
from django.http import HttpResponse, JsonResponse

from django.contrib.auth.models import User
from .models import Content

def getdays(request, user_id) : 
    month = request.GET['month']

    todolists = Content.objects.filter(user_id=user_id)
    days = set()

    for todo in todolists :
        if(todo.pub_date.month == int(month)) :
            days.add(todo.pub_date.day)

    days = list(days)
    response = JsonResponse({ 'data' : days, 'message' : 'ok'})
    return response


def gettodos(request, user_id) :
    day = request.GET['day']

    todolists = Content.objects.filter(user_id=user_id)
    todos = []

    # print(user_id, day, todolists[0].pub_date.day)
    # print(todolists)
    # print(type(todolists[0].pub_date.day), type(day))

    for todo in todolists:
        if todo.pub_date.day == int(day):
            todos.append({
                'todo' : todo.todo,
                'pub_date' : todo.pub_date
                })

    response = JsonResponse({ 'data' : todos, 'message' : 'ok' })
    # response.status_code = 202
    return response

def double_check(request) :
    username = request.GET['username']
    double = User.objects.filter(username=username)
    print(len(double))
    response = JsonResponse({ 'message' : 'username available!'})
    if len(double) != 0 :
        response = JsonResponse({ 'message' : 'This id already exists.' })
    return response

def signup(request) :
    body = json.loads(str(request.body)[2:-1])

    username = body['username']
    password = body['password']    

    new_user = User(username = username, password = password)
    new_user.save()

    response = JsonResponse({ 'message' : 'ok'})
    return response