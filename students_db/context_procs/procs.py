from students_db import settings

def settings_proc(request):
    # adds django.settings to template context
    return {
            "django_settings": settings
            }