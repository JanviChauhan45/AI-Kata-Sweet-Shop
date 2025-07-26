from django.contrib import admin
from .models import User , Sweet 
# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id','name','email','password_hash','role','created_at']

@admin.register(Sweet)
class SweetAdmin(admin.ModelAdmin):
    list_display = ['id','name','category','price','quantity','description','image_url','created_at','updated_at']

