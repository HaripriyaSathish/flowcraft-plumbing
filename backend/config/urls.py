from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.static import serve as serve_static

from .frontend_views import serve_frontend

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("siteconfig.urls")),
    path("api/", include("services.urls")),
    path("api/", include("gallery.urls")),
]

# Served unconditionally (not just when DEBUG=True — Django's static()
# shortcut no-ops once DEBUG=False, so this uses the underlying view
# directly): this project has no separate media host (S3/Cloudinary
# etc.), so Django itself must serve admin-uploaded images/videos in
# production too. Fine for this site's traffic level; see README
# "Deployment" for the persistent-disk note — without one, Render's
# ephemeral filesystem loses uploads on redeploy.
urlpatterns += [
    re_path(r"^media/(?P<path>.*)$", serve_static, {"document_root": settings.MEDIA_ROOT}),
]

# Serve the built React frontend for the root and any other route not
# claimed above (SPA fallback) — keep this LAST so it never shadows
# admin/, api/ or media/. Only matters once frontend/dist exists
# (production build); in local dev the frontend runs on its own Vite
# server instead.
urlpatterns += [
    re_path(r"^(?!admin/|api/|media/|static/).*$", serve_frontend),
]

admin.site.site_header = "FlowCraft Plumbing Admin"
admin.site.site_title = "FlowCraft Plumbing Admin"
admin.site.index_title = "Manage Website Content"
