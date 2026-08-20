from django.conf import settings
from django.http import HttpResponse, HttpResponseNotFound


def serve_frontend(request, *args, **kwargs):
    """
    Serves the built React app's index.html for the site root and any
    route the API/admin/media/static patterns didn't claim, so the SPA
    and its client-side anchor links work under one URL. Static assets
    referenced by index.html (JS/CSS/images) are served separately by
    WhiteNoise via WHITENOISE_ROOT, not by this view.
    """
    index_path = settings.FRONTEND_DIST / "index.html"
    if not index_path.exists():
        return HttpResponseNotFound(
            "Frontend build not found. Run `npm run build` in frontend/ "
            "and redeploy — see README 'Deployment'."
        )
    return HttpResponse(index_path.read_text(encoding="utf-8"))
