############################################################################

from django.http import HttpResponseRedirect

from django.shortcuts import render_to_response, render

from django.views.generic import TemplateView
from django.views.generic import CreateView, UpdateView, DeleteView
from django.core.urlresolvers import reverse, reverse_lazy
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.views import logout_then_login
from django.contrib.auth.decorators import login_required

from django.utils.decorators import method_decorator



from students_db.models import *
from students_db.forms import modelForms

from rest_framework import viewsets

from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status

from students_db.serializers import UserSerializer, GroupSerializer, \
JournalSerializer
from students_db import settings
from django.template import RequestContext

class StudentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    serializer_class = UserSerializer
    model = Student
    
    def get_queryset(self):

        group_id = self.request.GET.get('group', None)

        if not group_id :
            queryset = Student.objects.all()
        else :
            group = Group.objects.get(id=group_id)
            queryset = Student.objects.filter(group=group)
            
        return queryset
    
    #@method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(StudentViewSet, self).dispatch(*args, **kwargs)


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    #import ipdb; ipdb.set_trace()
    
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    
    #@method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(GroupViewSet, self).dispatch(*args, **kwargs)
    
class JournalViewSet(viewsets.ModelViewSet):
    
    serializer_class = JournalSerializer
    queryset = Journal.objects.all()
    
    #@method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(JournalViewSet, self).dispatch(*args, **kwargs)
    
class GroupsList(TemplateView):

    template_name = "groups.htm"
    
    #@method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(GroupsList, self).dispatch(*args, **kwargs)
    
    #queryset = Group.objects.all()
    serializer_class = GroupSerializer
