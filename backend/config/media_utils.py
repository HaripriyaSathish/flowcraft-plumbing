def absolute_media_url(request, file_field):
    """
    Build a fully-qualified media URL (http://host:port/media/...) from a
    FileField/ImageField, using the current request so it resolves
    correctly no matter what origin the frontend is served from.
    """
    if not file_field:
        return None
    url = file_field.url
    if request is not None:
        return request.build_absolute_uri(url)
    return url
