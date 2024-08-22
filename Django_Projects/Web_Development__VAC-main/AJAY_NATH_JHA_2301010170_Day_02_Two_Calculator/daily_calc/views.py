from django.shortcuts import render

def index(request):
  data = {}
  res = ''
  try:
    if request.method == "POST":
      a = eval(request.POST.get('numx'))
      op = request.POST.get('operator')
      b = eval(request.POST.get('numy'))
      if op == '%':
        res = (a % b)
      elif op == '+':
        res = (a + b)
      elif op == '-':
        res = (a - b)
      elif op == '*':
        res = (a * b)
      elif op == '^':
        res = pow(a,b)
      elif op == '/':
        if b == 0:
          res = "Division by Zero Error!"
        else:
          res = (a / b)
      else:
        res = "....."
      data = {
        'numa': a,
        'numb': b,
        'res': res
      }
  except ValueError:
    res = "Invalid Operation Perform ..."
  return render(request, "index.html", data) # , {'res' : res}
