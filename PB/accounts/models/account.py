from django.db import models
from django.contrib.auth.models import AbstractUser


class Account(AbstractUser):
    phoneNumber = models.TextField()

    class Meta:
        abstract = True
