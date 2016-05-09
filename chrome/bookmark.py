from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

__author__ = 'Eason'

@csrf_exempt
def sync(request):
    content = request.POST.get("bookmarks")
    file_object = open('/Users/bao/Downloads/bookmarks.txt', 'w')
    file_object.write(content)
    file_object.close()
    return HttpResponse("aa")