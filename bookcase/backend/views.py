
from .models import Bookcase
from .serializers import  BookcaseSerializer
from rest_framework import generics
from django.shortcuts import render, redirect
from django.contrib.gis.geos import Point
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
import json
from django.contrib.gis.db.models.functions import Distance
from django.contrib import messages
from django.contrib.gis.measure import D

class BookcaseList(generics.ListAPIView):
  queryset = Bookcase.objects.all()
  serializer_class = BookcaseSerializer
  name = 'Bookcase-list'


@csrf_protect



def addbookcase(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        address = data.get('address')
        coords = data.get('coords')
        nbook = data.get('nbook')
        select = data.get('select')

        #  validation checks
        if not address:
            return JsonResponse({'success': False, 'message': 'Address field is required.'}, status=400)
        if not coords or not isinstance(coords, list) or len(coords) != 2:
            return JsonResponse({'success': False, 'message': 'Invalid coordinates.'}, status=400)
        if not nbook or not isinstance(nbook, int) or nbook <= 0:
            return JsonResponse({'success': False, 'message': 'Number of books should be a positive integer.'}, status=400)
        if not select:
            return JsonResponse({'success': False, 'message': 'Select field is required.'}, status=400)

        # Create a Point object from the coordinates
        point = Point(coords[1], coords[0], srid=4326)
        point.transform(3857)  # Transform to Web Mercator
        # Check if there is a nearby bookcase
        nearby_bookcases = Bookcase.objects.annotate(distance=Distance('point', point)).filter(distance__lte=D(m=1000))
        if nearby_bookcases.exists():
            return JsonResponse({'success': False, 'message': 'There is a bookcase within 1000 meters. Please choose a different location.'}, status=400)
        # Save the bookcase to the database
        bookcase = Bookcase( address=address, num_books=nbook, book_type=select, point=point)
        bookcase.save()

        return JsonResponse({'success': True, 'message': 'Bookcase added successfully.'})

    # Handle GET request or other methods
    return JsonResponse({'success': False, 'message': 'Invalid request method.'}, status=405)


