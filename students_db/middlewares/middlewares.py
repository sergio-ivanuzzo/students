from django.http import HttpResponse
from django.db import connection
import time

class MyMiddleware(object):
    
    def process_request(self, request):
        self.start = time.time()
        
    def process_response(self, request, response):
        
        if "text/plain" in request.META["CONTENT_TYPE"] :
            _time = time.time() - self.start
            queries_count = str(len(connection.queries)) + " queries was processed, executing: " + str(_time)
            response.content = response.content.replace('</body>', queries_count+"</body>")
            
        return response