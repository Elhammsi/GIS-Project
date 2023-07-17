# forms.py
from django import forms

class BookForm(forms.Form):
    address = forms.CharField(max_length=100)
    number_of_books = forms.IntegerField()
    bookcase_type = forms.CharField(max_length=50)

