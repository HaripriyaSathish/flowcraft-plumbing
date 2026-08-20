from rest_framework import serializers

from config.media_utils import absolute_media_url

from .models import ServiceCategory, Service, ServicePackage, Technician, ServiceRequest


class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = ["id", "name", "slug", "order"]


class ServiceListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Service
        fields = [
            "id", "name", "slug", "short_description", "icon_name", "image",
            "starting_price", "price_unit", "category", "category_name",
            "is_featured", "order",
        ]

    def get_image(self, obj):
        if obj.image:
            return absolute_media_url(self.context.get("request"), obj.image)
        return obj.image_url or None


class ServiceDetailSerializer(ServiceListSerializer):
    class Meta(ServiceListSerializer.Meta):
        fields = ServiceListSerializer.Meta.fields + ["description"]


class ServicePackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicePackage
        fields = ["id", "name", "price", "price_unit", "description", "features", "is_popular", "cta_text", "order"]


class TechnicianSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()

    class Meta:
        model = Technician
        fields = [
            "id", "name", "designation", "specialization", "years_experience",
            "certifications", "bio", "photo", "order",
        ]

    def get_photo(self, obj):
        if obj.photo:
            return absolute_media_url(self.context.get("request"), obj.photo)
        return obj.photo_url or None


class ServiceRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRequest
        fields = [
            "id", "name", "phone", "email", "service", "service_name_text",
            "preferred_date", "preferred_time", "address", "problem_description",
            "status", "created_at",
        ]
        read_only_fields = ["id", "status", "created_at"]

    def validate(self, attrs):
        if not attrs.get("service") and not attrs.get("service_name_text"):
            raise serializers.ValidationError("Please select a service.")
        return attrs
