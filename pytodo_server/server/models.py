from django.db import models
from django.contrib.auth.models import User

from django.utils import timezone

# Create your models here.

class Content(models.Model) :
    todo = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pub_date = models.DateTimeField('date published')

