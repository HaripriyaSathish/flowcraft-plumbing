from django.db import models
from django.core.exceptions import ValidationError


class SiteSettings(models.Model):
    """Singleton-style global settings. Only one row is used (the first)."""

    site_name = models.CharField(max_length=120, default="FlowCraft Plumbing")
    tagline = models.CharField(max_length=255, blank=True)
    logo = models.ImageField(upload_to="branding/", blank=True, null=True)
    favicon = models.ImageField(upload_to="branding/", blank=True, null=True)
    footer_description = models.TextField(
        blank=True,
        help_text="Short company description shown in the footer.",
    )
    is_maintenance_mode = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Site Setting"
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return self.site_name

    def save(self, *args, **kwargs):
        if not self.pk and SiteSettings.objects.exists():
            raise ValidationError("Only one SiteSettings instance is allowed. Edit the existing one.")
        return super().save(*args, **kwargs)


class CompanyInfo(models.Model):
    headline = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="company/", blank=True, null=True)
    image_url = models.URLField(blank=True, help_text="Fallback external image URL if no upload.")
    video = models.FileField(upload_to="company/videos/", blank=True, null=True)
    years_experience = models.PositiveIntegerField(default=15)
    jobs_completed = models.PositiveIntegerField(default=5000)
    happy_customers = models.PositiveIntegerField(default=3500)
    support_availability = models.CharField(max_length=50, default="24/7")
    service_areas_count = models.PositiveIntegerField(default=10)
    certified_technicians = models.PositiveIntegerField(default=20)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "About / Company Info"
        verbose_name_plural = "About / Company Info"

    def __str__(self):
        return self.headline or "Company Info"


class HeroSection(models.Model):
    heading = models.CharField(max_length=255, default="Reliable Plumbing. Done Right the First Time.")
    subheading = models.TextField(
        default="Professional plumbing solutions for homes, offices and commercial properties — available when you need us."
    )
    badge_text = models.CharField(max_length=120, blank=True, default="Licensed & Insured Plumbers")
    background_image = models.ImageField(upload_to="hero/", blank=True, null=True)
    background_image_url = models.URLField(blank=True)
    background_video = models.FileField(upload_to="hero/videos/", blank=True, null=True)
    background_video_url = models.URLField(blank=True, help_text="External video URL fallback (mp4).")
    cta_primary_text = models.CharField(max_length=60, default="Book a Plumber")
    cta_secondary_text = models.CharField(max_length=60, default="Call Now")
    show_emergency_badge = models.BooleanField(default=True)
    show_fast_response_badge = models.BooleanField(default=True)
    show_licensed_badge = models.BooleanField(default=True)
    show_transparent_pricing_badge = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Hero Section"
        verbose_name_plural = "Hero Section"

    def __str__(self):
        return self.heading


class EmergencyBanner(models.Model):
    heading = models.CharField(max_length=255, default="Plumbing Emergency? We're Ready to Help.")
    subtext = models.CharField(
        max_length=255,
        blank=True,
        default="24/7 emergency plumbing response across our service areas.",
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Emergency Banner"
        verbose_name_plural = "Emergency Banner"

    def __str__(self):
        return self.heading


class WhyChooseUsFeature(models.Model):
    icon_name = models.CharField(
        max_length=60,
        default="ShieldCheck",
        help_text="Lucide icon name, e.g. ShieldCheck, Clock, Wrench.",
    )
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Why Choose Us Feature"
        verbose_name_plural = "Why Choose Us Features"

    def __str__(self):
        return self.title


class HowItWorksStep(models.Model):
    step_number = models.PositiveIntegerField(default=1)
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=255, blank=True)
    icon_name = models.CharField(max_length=60, default="Phone")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "step_number"]
        verbose_name = "How It Works Step"
        verbose_name_plural = "How It Works Steps"

    def __str__(self):
        return f"{self.step_number:02d} — {self.title}"


class ServiceArea(models.Model):
    city = models.CharField(max_length=120)
    area = models.CharField(max_length=120, blank=True)
    description = models.CharField(max_length=255, blank=True)
    is_service_available = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "city", "area"]
        verbose_name = "Service Area"
        verbose_name_plural = "Service Areas"

    def __str__(self):
        return f"{self.area}, {self.city}" if self.area else self.city


class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"

    def __str__(self):
        return self.question


class ContactInfo(models.Model):
    phone = models.CharField(max_length=30, default="+91 90000 00000")
    emergency_phone = models.CharField(max_length=30, blank=True)
    email = models.EmailField(default="info@flowcraftplumbing.com")
    whatsapp_number = models.CharField(
        max_length=30,
        default="+919000000000",
        help_text="Include country code, digits only after '+', e.g. +919000000000",
    )
    whatsapp_default_message = models.CharField(
        max_length=255,
        default="Hi, I need plumbing service. Please share the available options and pricing.",
    )
    address_line = models.CharField(max_length=255, default="")
    city = models.CharField(max_length=120, default="")
    state = models.CharField(max_length=120, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    emergency_availability_text = models.CharField(max_length=120, default="24/7 Emergency Service Available")

    class Meta:
        verbose_name = "Contact Info"
        verbose_name_plural = "Contact Info"

    def __str__(self):
        return self.phone


class BusinessHours(models.Model):
    DAY_CHOICES = [
        ("monday", "Monday"),
        ("tuesday", "Tuesday"),
        ("wednesday", "Wednesday"),
        ("thursday", "Thursday"),
        ("friday", "Friday"),
        ("saturday", "Saturday"),
        ("sunday", "Sunday"),
    ]
    day = models.CharField(max_length=10, choices=DAY_CHOICES, unique=True)
    opening_time = models.TimeField(null=True, blank=True)
    closing_time = models.TimeField(null=True, blank=True)
    is_closed = models.BooleanField(default=False)
    is_24_hours = models.BooleanField(default=False)

    class Meta:
        ordering = ["id"]
        verbose_name = "Business Hours"
        verbose_name_plural = "Business Hours"

    def __str__(self):
        return self.get_day_display()


class SocialMediaLink(models.Model):
    PLATFORM_CHOICES = [
        ("facebook", "Facebook"),
        ("instagram", "Instagram"),
        ("youtube", "YouTube"),
        ("linkedin", "LinkedIn"),
        ("twitter", "Twitter / X"),
    ]
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    url = models.URLField()
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Social Media Link"
        verbose_name_plural = "Social Media Links"

    def __str__(self):
        return self.get_platform_display()


class GoogleMapSettings(models.Model):
    embed_url = models.TextField(
        blank=True, help_text="Google Maps embed <iframe> src URL."
    )
    directions_url = models.URLField(blank=True)
    latitude = models.DecimalField(max_digits=10, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=10, decimal_places=6, null=True, blank=True)

    class Meta:
        verbose_name = "Google Map Settings"
        verbose_name_plural = "Google Map Settings"

    def __str__(self):
        return "Google Map Settings"


class SEOSettings(models.Model):
    page_title = models.CharField(max_length=255, default="FlowCraft Plumbing | Reliable Plumbing Services")
    meta_description = models.CharField(max_length=300, blank=True)
    keywords = models.CharField(max_length=500, blank=True, help_text="Comma-separated keywords.")
    og_title = models.CharField(max_length=255, blank=True)
    og_description = models.CharField(max_length=300, blank=True)
    og_image = models.ImageField(upload_to="seo/", blank=True, null=True)
    favicon = models.ImageField(upload_to="seo/", blank=True, null=True)
    business_name = models.CharField(max_length=120, default="FlowCraft Plumbing")
    location = models.CharField(max_length=120, blank=True)

    class Meta:
        verbose_name = "SEO Setting"
        verbose_name_plural = "SEO Settings"

    def __str__(self):
        return self.page_title
