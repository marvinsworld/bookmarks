import platform

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

__author__ = 'Eason'


@csrf_exempt
def sync(request):
    content = request.POST.get("bookmarks")

    if content is None:
        return HttpResponse("none")

    file_path = ""
    sysstr = platform.system()
    if sysstr == "Windows":
        file_path = "E:\\360CloudUI\\Cache\\30730947\\bookmarks\\bookmarks.txt"
    elif sysstr == "Linux":
        print("Call Linux tasks")
    else:
        file_path = "/Users/bao/Downloads/bookmarks.txt"

    file_object = open(file_path, 'w', encoding="utf-8")
    file_object.write(content)
    file_object.close()
    return HttpResponse("success")
