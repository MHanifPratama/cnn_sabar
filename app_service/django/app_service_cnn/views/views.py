from django.http import HttpResponse
from django.shortcuts import render
 


def hello(request):
    # return HttpResponse("Hello world ! ")
    # return render(request, 'form.html')
    context = {
        'greeting': 'Halo, selamat datang di situs web Django saya!'
    }
    return render(request, 'home.html', context)
