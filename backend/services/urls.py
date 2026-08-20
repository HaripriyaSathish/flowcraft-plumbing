from rest_framework.routers import DefaultRouter
from django.urls import path, include

from . import views

router = DefaultRouter()
router.register("service-categories", views.ServiceCategoryViewSet, basename="service-categories")
router.register("services", views.ServiceViewSet, basename="services")
router.register("packages", views.ServicePackageViewSet, basename="packages")
router.register("technicians", views.TechnicianViewSet, basename="technicians")

urlpatterns = [
    path("service-requests/", views.ServiceRequestCreateView.as_view(), name="service-request-create"),
    path("", include(router.urls)),
]
