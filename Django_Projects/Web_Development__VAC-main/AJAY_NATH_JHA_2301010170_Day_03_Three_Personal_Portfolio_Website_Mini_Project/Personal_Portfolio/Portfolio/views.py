from django.shortcuts import render

def portfolio(request):
  """Renders the single-page portfolio website."""  
  return render(request, 'index.html') # portfolio/