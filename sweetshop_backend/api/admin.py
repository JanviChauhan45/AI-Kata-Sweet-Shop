from django.contrib import admin
from .models import User, Sweet

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'role', 'created_at')
    list_filter = ('role', 'created_at')
    search_fields = ('name', 'email')
    readonly_fields = ('id', 'created_at')

@admin.register(Sweet)
class SweetAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock', 'unit', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('name', 'description')
    readonly_fields = ('id', 'created_at', 'updated_at')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'category', 'description')
        }),
        ('Pricing & Stock', {
            'fields': ('price', 'stock', 'unit')
        }),
        ('Image', {
            'fields': ('image',),
            'classes': ('collapse',)
        }),
        ('System Information', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

