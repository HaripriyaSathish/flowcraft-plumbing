from django.contrib import admin
from django.utils.html import format_html

from .models import ProjectCategory, Project, Video, BeforeAfterProject, Testimonial


def image_preview(obj, field_name="image"):
    file = getattr(obj, field_name, None)
    if file:
        return format_html('<img src="{}" style="height:50px;border-radius:6px;" />', file.url)
    return "—"


@admin.register(ProjectCategory)
class ProjectCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "order")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "location", "is_featured", "order", "preview")
    list_editable = ("is_featured", "order")
    list_filter = ("category", "is_featured")
    search_fields = ("title", "description", "location")

    def preview(self, obj):
        return image_preview(obj)


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ("title", "is_featured", "is_active", "order", "preview")
    list_editable = ("is_featured", "is_active", "order")

    def preview(self, obj):
        return image_preview(obj, "thumbnail")


@admin.register(BeforeAfterProject)
class BeforeAfterProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "is_active", "order", "before_preview", "after_preview")
    list_editable = ("is_active", "order")
    list_filter = ("category", "is_active")

    def before_preview(self, obj):
        return image_preview(obj, "before_image")

    def after_preview(self, obj):
        return image_preview(obj, "after_image")


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("customer_name", "location", "rating", "service_received", "is_featured", "is_active", "order")
    list_editable = ("is_featured", "is_active", "order")
    list_filter = ("rating", "is_featured", "is_active")
    search_fields = ("customer_name", "review", "service_received")
