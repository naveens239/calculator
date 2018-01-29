from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
import json, cmath, math
from math import *



# Create your views here.
def home(request):
    #title = "Sign Up Now"      
    return render(request, "home.html")

def calculateSignify(request):
  
    #add calculation formula here
    # get all the values from the URL
    ct_v = int(request.GET.get('c1c1'))
    ct_con = int(request.GET.get('c1c2'))
    var_v = int(request.GET.get('c2c1'))
    var_con = int(request.GET.get('c2c2'))
    # calculate z_score 
    z_score = calZScore(ct_v,var_v,ct_con, var_con)
    # calculate the normal distribution here
    p_value = normdist(z_score,0,1,1)
    if p_value<0.1 or p_value >0.9:
        signify='Yes!'
    else:
        signify='No'
    if z_score == 0:
        p_value='NaN'
    values = {'p_value':p_value,'signify':signify}
    return HttpResponse(json.dumps(values),content_type="application/json")

def calZScore(ct_v,var_v,ct_con, var_con):
    try:
        # control conversion rate
        p = float(ct_con)/float(ct_v)
        # standard error
        control_se = math.sqrt((p*(1-p))/float(ct_v))
        # variation conversion rate
        v = float(var_con)/float(var_v)
        # standard error
        variation_se = math.sqrt((v*(1-v))/float(var_v))
        z = (p - v)/(math.sqrt(math.pow(control_se,2)+math.pow(variation_se,2)))
    except Exception:
        z = 0
        return z
    return z


def normcdf(x, mu, sigma):
    t = x-mu;
    y = 0.5*erfcc(-t/(sigma*sqrt(2.0)));
    if y>1.0:
        y = 1.0;
    return y

def normpdf(x, mu, sigma):
    u = (x-mu)/abs(sigma)
    y = (1/(sqrt(2*pi)*abs(sigma)))*exp(-u*u/2)
    return y

def normdist(x, mu, sigma, f):
    if f:
        y = normcdf(x,mu,sigma)
    else:
        y = normpdf(x,mu,sigma)
    return y

def erfcc(x):
    z = abs(x)
    t = 1. / (1. + 0.5*z)
    r = t * exp(-z*z-1.26551223+t*(1.00002368+t*(.37409196+
        t*(.09678418+t*(-.18628806+t*(.27886807+
        t*(-1.13520398+t*(1.48851587+t*(-.82215223+
        t*.17087277)))))))))
    if (x >= 0.):
        return r
    else:
        return 2. - r