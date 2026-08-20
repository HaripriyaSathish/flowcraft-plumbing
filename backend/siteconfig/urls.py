from rest_framework.routers import DefaultRouter
from django.urls import path, include

from . import views

router = DefaultRouter()
router.register("why-choose-us", views.WhyChooseUsFeatureViewSet, basename="why-choose-us")
router.register("how-it-works", views.HowItWorksStepViewSet, basename="how-it-works")
router.register("service-areas", views.ServiceAreaViewSet, basename="service-areas")
router.register("faqs", views.FAQViewSet, basename="faqs")
router.register("business-hours", views.BusinessHoursViewSet, basename="business-hours")
router.register("social-links", views.SocialMediaLinkViewSet, basename="social-links")

urlpatterns = [
    path("site-settings/", views.SiteSettingsView.as_view(), name="site-settings"),
    path("company-info/", views.CompanyInfoView.as_view(), name="company-info"),
    path("hero/", views.HeroSectionView.as_view(), name="hero"),
    path("emergency-banner/", views.EmergencyBannerView.as_view(), name="emergency-banner"),
    path("contact-info/", views.ContactInfoView.as_view(), name="contact-info"),
    path("map-settings/", views.GoogleMapSettingsView.as_view(), name="map-settings"),
    path("seo-settings/", views.SEOSettingsView.as_view(), name="seo-settings"),
    path("", include(router.urls)),
]
