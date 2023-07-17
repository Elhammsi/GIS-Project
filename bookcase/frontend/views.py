from django.shortcuts import render



def add_bookcase(request):
    return render(request, 'add_bookcase.html')



# Create your views here.
def bookcase(request):
    return render(request, 'frontend/bookcase.html')