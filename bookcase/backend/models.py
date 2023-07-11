from django.db import models

# Create your models here.
from django.contrib.gis.db import models



class Bookcase(models.Model):
    address = models.CharField(max_length=255)
    book_type = models.CharField(max_length=100)
    num_books = models.PositiveIntegerField()
    point = models.PointField()
    def __str__(self):
        return self.address
class Meta:
        db_table = 'backend_bookcase'  # Custom table name