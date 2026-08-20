from django.contrib import admin
from django.utils.html import format_html

from .models import (
    SiteSettings,
    CompanyInfo,
    HeroSection,
    EmergencyBanner,
    WhyChooseUsFeature,
    HowItWorksStep,
    ServiceArea,
    FAQ,
    ContactInfo,
    BusinessHours,
    SocialMediaLink,
    GoogleMapSettings,
    SEOSettings,
)


def image_preview(obj, field_name="image"):
    file = getattr(obj, field_name, None)
    if file:
        return format_html('<img src="{}" style="height:50px;border-radius:6px;" />', file.url)
    return "—"


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ("site_name", "tagline", "is_maintenance_mode")

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()


@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
    list_display = ("headline", "years_experience", "jobs_completed", "happy_customers", "is_active", "preview")
    list_editable = ("is_active",)

    def preview(self, obj):
        return image_preview(obj)


@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ("heading", "cta_primary_text", "cta_secondary_text", "is_active", "preview")
    list_editable = ("is_active",)

    def preview(self, obj):
        return image_preview(obj, "background_image")


@admin.register(EmergencyBanner)
class EmergencyBannerAdmin(admin.ModelAdmin):
    list_display = ("heading", "subtext", "is_active")
    list_editable = ("is_active",)


@admin.register(WhyChooseUsFeature)
class WhyChooseUsFeatureAdmin(admin.ModelAdmin):
    list_display = ("title", "icon_name", "order", "is_active")
    list_editable = ("order", "is_active")
    ordering = ("order",)


@admin.register(HowItWorksStep)
class HowItWorksStepAdmin(admin.ModelAdmin):
    list_display = ("step_number", "title", "icon_name", "order", "is_active")
    list_editable = ("order", "is_active")
    ordering = ("order",)


@admin.register(ServiceArea)
class ServiceAreaAdmin(admin.ModelAdmin):
    list_display = ("city", "area", "is_service_available", "order")
    list_editable = ("order", "is_service_available")
    search_fields = ("city", "area")
    list_filter = ("is_service_available", "city")


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("question", "order", "is_active")
    list_editable = ("order", "is_active")
    search_fields = ("question", "answer")
    list_filter = ("is_active",)


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ("phone", "emergency_phone", "email", "whatsapp_number")

    def has_add_permission(self, request):
        return not ContactInfo.objects.exists()


@admin.register(BusinessHours)
class BusinessHoursAdmin(admin.ModelAdmin):
    list_display = ("day", "opening_time", "closing_time", "is_closed", "is_24_hours")
    list_editable = ("opening_time", "closing_time", "is_closed", "is_24_hours")


@admin.register(SocialMediaLink)
class SocialMediaLinkAdmin(admin.ModelAdmin):
    list_display = ("platform", "url", "order", "is_active")
    list_editable = ("order", "is_active")


@admin.register(GoogleMapSettings)
class GoogleMapSettingsAdmin(admin.ModelAdmin):
    list_display = ("directions_url", "latitude", "longitude")

    def has_add_permission(self, request):
        return not GoogleMapSettings.objects.exists()


@admin.register(SEOSettings)
class SEOSettingsAdmin(admin.ModelAdmin):
    list_display = ("page_title", "business_name", "location")

    def has_add_permission(self, request):
        return not SEOSettings.objects.exists()
