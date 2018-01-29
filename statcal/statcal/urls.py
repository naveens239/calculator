from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
import signify.views

urlpatterns = [
    url(r'^$', signify.views.home, name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^calculateSignify/',signify.views.calculateSignify, name ='calculateSignify'),
]+static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)

if settings.DEBUG:
     urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)
