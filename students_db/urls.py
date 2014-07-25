from django.conf.urls import patterns, include, url
from students_db import views
from django.contrib.auth.decorators import login_required
from rest_framework import routers

from django.contrib import admin
admin.autodiscover()

router = routers.DefaultRouter()

router.register(r'students', views.StudentViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'journal', views.JournalViewSet)

urlpatterns = patterns('',
                       
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.GroupsList.as_view(), name="gr"),
    
    url(r'^login/$', 'django.contrib.auth.views.login', name="login"),
    url(r'^logout/$', 'django.contrib.auth.views.logout', \
        {'next_page': '/login/'}, name="logout"),

    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')))
