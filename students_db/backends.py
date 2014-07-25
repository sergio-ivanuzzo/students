from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.backends import ModelBackend


class EmailOrUsernameModelBackend(ModelBackend):
    
    def authenticate(self, username=None, password=None):
        #import pdb;pdb.set_trace()
        if '@' in username:
            kwargs = {'email': username}
        else:
            kwargs = {'username': username}
        try:
            user = User.objects.get(**kwargs)
            print user
            if user.check_password(password):
                print user
                return user
        except User.DoesNotExist:
            return None