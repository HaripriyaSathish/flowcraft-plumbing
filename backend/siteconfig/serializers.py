from rest_framework import serializers

from config.media_utils import absolute_media_url

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


class SiteSettingsSerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()
    favicon = serializers.SerializerMethodField()

    class Meta:
        model = SiteSettings
        fields = ["id", "site_name", "tagline", "logo", "favicon", "footer_description"]

    def get_logo(self, obj):
        return absolute_media_url(self.context.get("request"), obj.logo)

    def get_favicon(self, obj):
        return absolute_media_url(self.context.get("request"), obj.favicon)


class CompanyInfoSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    video = serializers.SerializerMethodField()

    class Meta:
        model = CompanyInfo
        fields = [
            "id", "headline", "description", "image", "video",
            "years_experience", "jobs_completed", "happy_customers",
            "support_availability", "service_areas_count", "certified_technicians",
        ]

    def get_image(self, obj):
        if obj.image:
            return absolute_media_url(self.context.get("request"), obj.image)
        return obj.image_url or None

    def get_video(self, obj):
        return absolute_media_url(self.context.get("request"), obj.video)


class HeroSectionSerializer(serializers.ModelSerializer):
    background_image = serializers.SerializerMethodField()
    background_video = serializers.SerializerMethodField()

    class Meta:
        model = HeroSection
        fields = [
            "id", "heading", "subheading", "badge_text",
            "background_image", "background_video",
            "cta_primary_text", "cta_secondary_text",
            "show_emergency_badge", "show_fast_response_badge",
            "show_licensed_badge", "show_transparent_pricing_badge",
        ]

    def get_background_image(self, obj):
        if obj.background_image:
            return absolute_media_url(self.context.get("request"), obj.background_image)
        return obj.background_image_url or None

    def get_background_video(self, obj):
        if obj.background_video:
            return absolute_media_url(self.context.get("request"), obj.background_video)
        return obj.background_video_url or None


class EmergencyBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyBanner
        fields = ["id", "heading", "subtext"]


class WhyChooseUsFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyChooseUsFeature
        fields = ["id", "icon_name", "title", "description", "order"]


class HowItWorksStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = HowItWorksStep
        fields = ["id", "step_number", "title", "description", "icon_name", "order"]


class ServiceAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceArea
        fields = ["id", "city", "area", "description", "is_service_available", "order"]


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ["id", "question", "answer", "order"]


class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = [
            "id", "phone", "emergency_phone", "email", "whatsapp_number",
            "whatsapp_default_message", "address_line", "city", "state",
            "postal_code", "emergency_availability_text",
        ]


class BusinessHoursSerializer(serializers.ModelSerializer):
    day_display = serializers.CharField(source="get_day_display", read_only=True)

    class Meta:
        model = BusinessHours
        fields = ["id", "day", "day_display", "opening_time", "closing_time", "is_closed", "is_24_hours"]


class SocialMediaLinkSerializer(serializers.ModelSerializer):
    platform_display = serializers.CharField(source="get_platform_display", read_only=True)

    class Meta:
        model = SocialMediaLink
        fields = ["id", "platform", "platform_display", "url", "order"]


class GoogleMapSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoogleMapSettings
        fields = ["id", "embed_url", "directions_url", "latitude", "longitude"]


class SEOSettingsSerializer(serializers.ModelSerializer):
    og_image = serializers.SerializerMethodField()
    favicon = serializers.SerializerMethodField()

    class Meta:
        model = SEOSettings
        fields = [
            "id", "page_title", "meta_description", "keywords",
            "og_title", "og_description", "og_image", "favicon",
            "business_name", "location",
        ]

    def get_og_image(self, obj):
        return absolute_media_url(self.context.get("request"), obj.og_image)

    def get_favicon(self, obj):
        return absolute_media_url(self.context.get("request"), obj.favicon)
