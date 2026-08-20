from rest_framework import generics, viewsets
from rest_framework.response import Response

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
from .serializers import (
    SiteSettingsSerializer,
    CompanyInfoSerializer,
    HeroSectionSerializer,
    EmergencyBannerSerializer,
    WhyChooseUsFeatureSerializer,
    HowItWorksStepSerializer,
    ServiceAreaSerializer,
    FAQSerializer,
    ContactInfoSerializer,
    BusinessHoursSerializer,
    SocialMediaLinkSerializer,
    GoogleMapSettingsSerializer,
    SEOSettingsSerializer,
)


class SingletonAPIView(generics.GenericAPIView):
    """Returns the first (and only) active row of a singleton-style model as JSON."""

    queryset = None
    serializer_class = None
    active_filter = {}

    def get(self, request, *args, **kwargs):
        qs = self.get_queryset()
        if self.active_filter:
            qs = qs.filter(**self.active_filter)
        instance = qs.first()
        if not instance:
            return Response({})
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class SiteSettingsView(SingletonAPIView):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer


class CompanyInfoView(SingletonAPIView):
    queryset = CompanyInfo.objects.all()
    serializer_class = CompanyInfoSerializer
    active_filter = {"is_active": True}


class HeroSectionView(SingletonAPIView):
    queryset = HeroSection.objects.all()
    serializer_class = HeroSectionSerializer
    active_filter = {"is_active": True}


class EmergencyBannerView(SingletonAPIView):
    queryset = EmergencyBanner.objects.all()
    serializer_class = EmergencyBannerSerializer
    active_filter = {"is_active": True}


class ContactInfoView(SingletonAPIView):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer


class GoogleMapSettingsView(SingletonAPIView):
    queryset = GoogleMapSettings.objects.all()
    serializer_class = GoogleMapSettingsSerializer


class SEOSettingsView(SingletonAPIView):
    queryset = SEOSettings.objects.all()
    serializer_class = SEOSettingsSerializer


class WhyChooseUsFeatureViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = WhyChooseUsFeature.objects.filter(is_active=True)
    serializer_class = WhyChooseUsFeatureSerializer
    pagination_class = None


class HowItWorksStepViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HowItWorksStep.objects.filter(is_active=True)
    serializer_class = HowItWorksStepSerializer
    pagination_class = None


class ServiceAreaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceArea.objects.filter(is_service_available=True)
    serializer_class = ServiceAreaSerializer
    pagination_class = None


class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FAQ.objects.filter(is_active=True)
    serializer_class = FAQSerializer
    pagination_class = None


class BusinessHoursViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BusinessHours.objects.all()
    serializer_class = BusinessHoursSerializer
    pagination_class = None


class SocialMediaLinkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SocialMediaLink.objects.filter(is_active=True)
    serializer_class = SocialMediaLinkSerializer
    pagination_class = None
