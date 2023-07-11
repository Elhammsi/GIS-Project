from .models import Bookcase
from rest_framework import serializers

class BookcaseSerializer(serializers.ModelSerializer):
  class Meta:
    model = Bookcase
    fields = '__all__'