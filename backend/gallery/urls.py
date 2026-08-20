from rest_framework.routers import DefaultRouter
from django.urls import path, include

from . import views

router = DefaultRouter()
router.register("project-categories", views.ProjectCategoryViewSet, basename="project-categories")
router.register("projects", views.ProjectViewSet, basename="projects")
router.register("videos", views.VideoViewSet, basename="videos")
router.register("before-after", views.BeforeAfterProjectViewSet, basename="before-after")
router.register("testimonials", views.TestimonialViewSet, basename="testimonials")

urlpatterns = [
    path("", include(router.urls)),
]
