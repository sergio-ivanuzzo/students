from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver

    
class Group(models.Model):
    name = models.CharField(max_length=5)
    
    class Meta:
        db_table = "groups"
    
class Student(models.Model):
    
    name = models.CharField(max_length=200)
    birth_date = models.DateField()
    card_code = models.CharField(max_length=50)
    captain = models.BooleanField()
    group = models.ForeignKey(Group)
    
    class Meta:
        db_table = "students"
        
class Journal(models.Model):
    
    event = models.CharField(max_length=200)
    
    class Meta:
        db_table = "journal"

########### signals ##########################
        
@receiver(pre_save, sender=Group)
def change_group(sender, **kwargs):
    events = Journal()
    events.event = "The group was changed"
    events.save()
    
@receiver(pre_save, sender=Student)
def change_student(sender, **kwargs):
    events = Journal()
    events.event = "The Student.pk was changed"
    events.save()