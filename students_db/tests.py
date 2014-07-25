from django.test import TestCase
from students_db.models import Student, Group

class GroupTest(TestCase):
    
    def test_login(self):
        pass
    
    def test_group_create(self):
        group_name = "t1"
        group = Group(name=group_name)
        print group.name
        group.save()
        
        stud_name = "django"
        stud_birth = "2013-02-14"
        group = Group.objects.get(name=group_name)
        student = Student.objects.create(group=group, name=stud_name, 
                                         birth_date=stud_birth, captain=False)
        student.save()
        