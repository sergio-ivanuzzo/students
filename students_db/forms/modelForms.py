from students_db.models import *
from django.forms import ModelForm
from django.forms import extras
from django import forms

class StudentForm(ModelForm):
    class Meta:
        model = Student
        widgets = {'birth_date' :  extras.SelectDateWidget(years=range(1950, 2012))}
        
class GroupForm(ModelForm):
    class Meta:
        model = Group