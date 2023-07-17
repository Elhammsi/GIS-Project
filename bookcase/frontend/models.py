from django.db import models

class Bookcase(models.Model):
    address = models.CharField(max_length=100)
    num_books = models.IntegerField()
    book_type = models.CharField(max_length=50)
