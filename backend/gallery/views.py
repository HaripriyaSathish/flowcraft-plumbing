from rest_framework import viewsets

from .models import ProjectCategory, Project, Video, BeforeAfterProject, Testimonial
from .serializers import (
    ProjectCategorySerializer,
    ProjectSerializer,
    VideoSerializer,
    BeforeAfterProjectSerializer,
    TestimonialSerializer,
)


class ProjectCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProjectCategory.objects.all()
    serializer_class = ProjectCategorySerializer
    pagination_class = None


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = None
    filterset_fields = ["category", "is_featured"]


class VideoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Video.objects.filter(is_active=True)
    serializer_class = VideoSerializer
    pagination_class = None


class BeforeAfterProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BeforeAfterProject.objects.filter(is_active=True)
    serializer_class = BeforeAfterProjectSerializer
    pagination_class = None


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer
    pagination_class = None
