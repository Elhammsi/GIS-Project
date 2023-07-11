from django.contrib.gis import admin

# Register your models here.
# admin.py


from .models import Bookcase

#admin.site.register(Bookcase)

class CustomGeoadmin(admin.GISModelAdmin):
    gis_widget_kwargs={
        'attrs':{
            'default_zoom':11,
            'default_lon':13.36,
            'default_lat':52.53,
        }
    }
@admin.register(Bookcase)
class BookcaseAdmin(CustomGeoadmin):
    pass