from rest_framework import serializers

from config.media_utils import absolute_media_url

from .models import ProjectCategory, Project, Video, BeforeAfterProject, Testimonial


class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields = ["id", "name", "slug", "order"]


class ProjectSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    category_name = serializers.CharField(source="category.name", read_only=True)
    category_slug = serializers.CharField(source="category.slug", read_only=True)

    class Meta:
        model = Project
        fields = [
            "id", "title", "category", "category_name", "category_slug",
            "image", "description", "location", "is_featured", "order",
        ]

    def get_image(self, obj):
        if obj.image:
            return absolute_media_url(self.context.get("request"), obj.image)
        return obj.image_url or None


class VideoSerializer(serializers.ModelSerializer):
    video = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = ["id", "title", "description", "video", "thumbnail", "is_featured", "order"]

    def get_video(self, obj):
        if obj.video_file:
            return absolute_media_url(self.context.get("request"), obj.video_file)
        return obj.video_url or None

    def get_thumbnail(self, obj):
        if obj.thumbnail:
            return absolute_media_url(self.context.get("request"), obj.thumbnail)
        return obj.thumbnail_url or None


class BeforeAfterProjectSerializer(serializers.ModelSerializer):
    before_image = serializers.SerializerMethodField()
    after_image = serializers.SerializerMethodField()
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = BeforeAfterProject
        fields = [
            "id", "title", "category", "category_name", "before_image",
            "after_image", "description", "order",
        ]

    def get_before_image(self, obj):
        if obj.before_image:
            return absolute_media_url(self.context.get("request"), obj.before_image)
        return obj.before_image_url or None

    def get_after_image(self, obj):
        if obj.after_image:
            return absolute_media_url(self.context.get("request"), obj.after_image)
        return obj.after_image_url or None


class TestimonialSerializer(serializers.ModelSerializer):
    customer_image = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = [
            "id", "customer_name", "customer_image", "location", "rating",
            "review", "service_received", "is_featured", "order",
        ]

    def get_customer_image(self, obj):
        if obj.customer_image:
            return absolute_media_url(self.context.get("request"), obj.customer_image)
        return obj.customer_image_url or None
