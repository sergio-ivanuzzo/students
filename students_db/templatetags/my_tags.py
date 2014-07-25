from django import template
from django.contrib.contenttypes.models import ContentType
from django.core.urlresolvers import reverse

register = template.Library()

@register.simple_tag
def editor(value, *args):
    #import ipdb; ipdb.set_trace()
    app = value._meta.app_label
    module = value.__class__.__name__.lower()
    #import ipdb; ipdb.set_trace()
    return reverse('admin:%s_%s_change' % (app, module), args=args)