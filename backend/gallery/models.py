from django.db import models


class ProjectCategory(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Project Category"
        verbose_name_plural = "Project Categories"

    def __str__(self):
        return self.name


class Project(models.Model):
    """A completed work item shown in the gallery / portfolio grid."""

    title = models.CharField(max_length=150)
    category = models.ForeignKey(
        ProjectCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name="projects"
    )
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    image_url = models.URLField(blank=True)
    description = models.CharField(max_length=255, blank=True)
    location = models.CharField(max_length=120, blank=True)
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Project"
        verbose_name_plural = "Projects / Gallery"

    def __str__(self):
        return self.title


class Video(models.Model):
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=255, blank=True)
    video_file = models.FileField(upload_to="videos/", blank=True, null=True)
    video_url = models.URLField(blank=True, help_text="External/CDN video URL if not uploading a file.")
    thumbnail = models.ImageField(upload_to="videos/thumbnails/", blank=True, null=True)
    thumbnail_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-id"]
        verbose_name = "Video"
        verbose_name_plural = "Videos"

    def __str__(self):
        return self.title


class BeforeAfterProject(models.Model):
    title = models.CharField(max_length=150)
    category = models.ForeignKey(
        ProjectCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name="before_after_projects"
    )
    before_image = models.ImageField(upload_to="before_after/before/", blank=True, null=True)
    before_image_url = models.URLField(blank=True)
    after_image = models.ImageField(upload_to="before_after/after/", blank=True, null=True)
    after_image_url = models.URLField(blank=True)
    description = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Before & After Project"
        verbose_name_plural = "Before & After Projects"

    def __str__(self):
        return self.title


class Testimonial(models.Model):
    RATING_CHOICES = [(i, str(i)) for i in range(1, 6)]

    customer_name = models.CharField(max_length=120)
    customer_image = models.ImageField(upload_to="testimonials/", blank=True, null=True)
    customer_image_url = models.URLField(blank=True)
    location = models.CharField(max_length=120, blank=True)
    rating = models.PositiveSmallIntegerField(choices=RATING_CHOICES, default=5)
    review = models.TextField()
    service_received = models.CharField(max_length=150, blank=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Testimonial"
        verbose_name_plural = "Testimonials"

    def __str__(self):
        return f"{self.customer_name} ({self.rating}★)"
