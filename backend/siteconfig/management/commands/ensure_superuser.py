import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = (
        "Creates or updates a superuser from DJANGO_SUPERUSER_USERNAME/"
        "EMAIL/PASSWORD env vars, resetting the password to match those "
        "env vars on every run. Safe to run on every deploy/startup — "
        "used instead of the interactive createsuperuser/changepassword "
        "commands, which need a shell that free-tier Render web services "
        "don't have. Since the password is reset every run, changing it "
        "in the Render dashboard's env vars (and redeploying) is the way "
        "to change the live password; changing it by hand in /admin/ "
        "will be overwritten by the next deploy."
    )

    def handle(self, *args, **options):
        username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")

        if not username or not password:
            self.stdout.write(
                "DJANGO_SUPERUSER_USERNAME/PASSWORD not set — skipping superuser sync."
            )
            return

        User = get_user_model()
        user, created = User.objects.get_or_create(
            username=username,
            defaults={"email": email, "is_staff": True, "is_superuser": True},
        )
        user.email = email
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save()

        if created:
            self.stdout.write(self.style.SUCCESS(f"Created superuser '{username}'."))
        else:
            self.stdout.write(
                self.style.SUCCESS(f"Synced superuser '{username}' (password reset to env var value).")
            )