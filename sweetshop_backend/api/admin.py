from django.contrib import admin
from .models import User, Sweet, Purchase

# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'email', 'role', 'created_at']
    list_filter = ['role', 'created_at']
    search_fields = ['name', 'email']
    ordering = ['-created_at']

@admin.register(Sweet)
class SweetAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description', 'category', 'price', 'quantity', 'image_preview', 'created_at']
    list_filter = ['category', 'created_at']
    search_fields = ['name', 'description']
    ordering = ['-created_at']
    
    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" width="50" height="50" />'
        return 'No Image'
    image_preview.short_description = 'Image'
    image_preview.allow_tags = True

@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'sweet', 'quantity', 'total_price', 'status', 'purchase_date']
    list_filter = ['status', 'purchase_date']
    search_fields = ['user__name', 'sweet__name']
    ordering = ['-purchase_date']
