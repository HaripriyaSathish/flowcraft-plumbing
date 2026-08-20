from django.contrib import admin
from django.utils.html import format_html

from .models import ServiceCategory, Service, ServicePackage, Technician, ServiceRequest


def image_preview(obj, field_name="image"):
    file = getattr(obj, field_name, None)
    if file:
        return format_html('<img src="{}" style="height:50px;border-radius:6px;" />', file.url)
    return "—"


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "order", "is_active")
    list_editable = ("order", "is_active")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name",)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = (
        "name", "category", "starting_price", "is_featured", "is_active", "order", "preview",
    )
    list_editable = ("is_featured", "is_active", "order")
    list_filter = ("category", "is_featured", "is_active")
    search_fields = ("name", "short_description", "description")
    prepopulated_fields = {"slug": ("name",)}

    def preview(self, obj):
        return image_preview(obj)


@admin.register(ServicePackage)
class ServicePackageAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "price_unit", "is_popular", "is_active", "order")
    list_editable = ("is_popular", "is_active", "order")


@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    list_display = ("name", "designation", "years_experience", "is_active", "order", "preview")
    list_editable = ("is_active", "order")
    search_fields = ("name", "designation", "specialization")

    def preview(self, obj):
        return image_preview(obj, "photo")


@admin.register(ServiceRequest)
class ServiceRequestAdmin(admin.ModelAdmin):
    list_display = (
        "name", "phone", "service_display", "preferred_date", "preferred_time", "status", "created_at",
    )
    list_editable = ("status",)
    list_filter = ("status", "service", "preferred_date", "created_at")
    search_fields = ("name", "phone", "email", "address", "problem_description")
    date_hierarchy = "created_at"
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Customer", {"fields": ("name", "phone", "email", "address")}),
        ("Request Details", {"fields": ("service", "service_name_text", "preferred_date", "preferred_time", "problem_description")}),
        ("Office Use", {"fields": ("status", "staff_notes")}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )
