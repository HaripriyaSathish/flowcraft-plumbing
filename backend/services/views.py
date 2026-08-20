from django.conf import settings
from django.core.mail import send_mail
from rest_framework import viewsets, generics

from .models import ServiceCategory, Service, ServicePackage, Technician, ServiceRequest
from .serializers import (
    ServiceCategorySerializer,
    ServiceListSerializer,
    ServiceDetailSerializer,
    ServicePackageSerializer,
    TechnicianSerializer,
    ServiceRequestSerializer,
)


class ServiceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceCategory.objects.filter(is_active=True)
    serializer_class = ServiceCategorySerializer
    pagination_class = None


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceListSerializer
    pagination_class = None
    lookup_field = "slug"
    filterset_fields = ["category", "is_featured"]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ServiceDetailSerializer
        return ServiceListSerializer


class ServicePackageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServicePackage.objects.filter(is_active=True)
    serializer_class = ServicePackageSerializer
    pagination_class = None


class TechnicianViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Technician.objects.filter(is_active=True)
    serializer_class = TechnicianSerializer
    pagination_class = None


class ServiceRequestCreateView(generics.CreateAPIView):
    queryset = ServiceRequest.objects.all()
    serializer_class = ServiceRequestSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        self._notify(instance)
        return instance

    def _notify(self, instance):
        company_message = (
            f"New service request from {instance.name}\n\n"
            f"Phone: {instance.phone}\n"
            f"Email: {instance.email or '-'}\n"
            f"Service: {instance.service_display}\n"
            f"Preferred date: {instance.preferred_date or '-'}\n"
            f"Preferred time: {instance.preferred_time or '-'}\n"
            f"Address: {instance.address or '-'}\n\n"
            f"Problem description:\n{instance.problem_description or '-'}\n"
        )
        try:
            send_mail(
                subject=f"New Booking: {instance.service_display} — {instance.name}",
                message=company_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.COMPANY_NOTIFICATION_EMAIL],
                fail_silently=True,
            )
        except Exception:
            pass

        if settings.SEND_CUSTOMER_CONFIRMATION_EMAIL and instance.email:
            customer_message = (
                f"Hi {instance.name},\n\n"
                f"Thank you for booking with FlowCraft Plumbing. We've received your request for "
                f"'{instance.service_display}' and our team will contact you shortly at {instance.phone} "
                f"to confirm your appointment.\n\n"
                f"— FlowCraft Plumbing"
            )
            try:
                send_mail(
                    subject="We've received your booking — FlowCraft Plumbing",
                    message=customer_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[instance.email],
                    fail_silently=True,
                )
            except Exception:
                pass
