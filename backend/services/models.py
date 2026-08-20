from django.db import models


class ServiceCategory(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Service Category"
        verbose_name_plural = "Service Categories"

    def __str__(self):
        return self.name


class Service(models.Model):
    category = models.ForeignKey(
        ServiceCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name="services"
    )
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=170, unique=True)
    short_description = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    icon_name = models.CharField(max_length=60, default="Wrench", help_text="Lucide icon name.")
    image = models.ImageField(upload_to="services/", blank=True, null=True)
    image_url = models.URLField(blank=True, help_text="Fallback external image URL if no upload.")
    starting_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    price_unit = models.CharField(max_length=40, blank=True, default="starting from")
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Service"
        verbose_name_plural = "Services"

    def __str__(self):
        return self.name


class ServicePackage(models.Model):
    name = models.CharField(max_length=120)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    price_unit = models.CharField(max_length=40, blank=True, default="/ visit")
    description = models.CharField(max_length=255, blank=True)
    features = models.JSONField(
        default=list,
        blank=True,
        help_text='List of feature strings, e.g. ["Inspection", "Minor repair"]',
    )
    is_popular = models.BooleanField(default=False)
    cta_text = models.CharField(max_length=60, default="Get Started")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "price"]
        verbose_name = "Service Package"
        verbose_name_plural = "Service Packages"

    def __str__(self):
        return self.name


class Technician(models.Model):
    name = models.CharField(max_length=120)
    designation = models.CharField(max_length=150, default="Certified Plumbing Technician")
    specialization = models.CharField(max_length=200, blank=True)
    years_experience = models.PositiveIntegerField(default=5)
    certifications = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to="technicians/", blank=True, null=True)
    photo_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Technician"
        verbose_name_plural = "Technicians"

    def __str__(self):
        return self.name


class ServiceRequest(models.Model):
    STATUS_CHOICES = [
        ("new", "New"),
        ("contacted", "Contacted"),
        ("scheduled", "Scheduled"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    name = models.CharField(max_length=120)
    phone = models.CharField(max_length=30)
    email = models.EmailField(blank=True)
    service = models.ForeignKey(
        Service, on_delete=models.SET_NULL, null=True, blank=True, related_name="requests"
    )
    service_name_text = models.CharField(
        max_length=150, blank=True, help_text="Free-text service name if not tied to a Service record."
    )
    preferred_date = models.DateField(null=True, blank=True)
    preferred_time = models.TimeField(null=True, blank=True)
    address = models.TextField(blank=True)
    problem_description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    staff_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Service Request"
        verbose_name_plural = "Service Requests"

    def __str__(self):
        return f"{self.name} — {self.service_display} ({self.get_status_display()})"

    @property
    def service_display(self):
        return self.service.name if self.service else (self.service_name_text or "General Enquiry")
