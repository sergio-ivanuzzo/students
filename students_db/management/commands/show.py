from django.core.management.base import AppCommand
from optparse import make_option

class Command( AppCommand ):
    option_list = AppCommand.option_list + (
                        make_option("--groups", action="store", 
                        dest="count", default=False,
                        help="groups and stud list"),
                )
    help = "Display groups and students list"
    
    def handle_app(self, app, **options):
        
        from students_db.models import Group, Student
        
        output = []
        groups = Group.objects.all()
        
        for group in groups :
            students = Student.objects.filter(group=group)
            stud = [s.name for s in students]
            result = "\nGROUP="+group.name+":\n\tSTUDENTS:\n\t\t"+"\n\t\t".join(stud)
            output.append(result)
            
        return "\t".join(output)