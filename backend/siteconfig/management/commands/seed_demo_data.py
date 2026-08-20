from datetime import time
from pathlib import Path

from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand

from siteconfig.models import (
    SiteSettings, CompanyInfo, HeroSection, EmergencyBanner,
    WhyChooseUsFeature, HowItWorksStep, ServiceArea, FAQ, ContactInfo,
    BusinessHours, SocialMediaLink, GoogleMapSettings, SEOSettings,
)
from services.models import ServiceCategory, Service, ServicePackage, Technician
from gallery.models import ProjectCategory, Project, Video, BeforeAfterProject, Testimonial

SEED_ASSETS_DIR = Path(__file__).resolve().parents[3] / "seed_assets"


def local_image(filename):
    """
    Load a demo photo from backend/seed_assets/ as a real uploaded file
    (not a hotlinked URL), so it works fully offline and is manageable
    like any other admin upload. Returns None if the file is missing so
    seeding never hard-fails on a missing asset.
    """
    path = SEED_ASSETS_DIR / filename
    if not path.exists():
        return None
    return ContentFile(path.read_bytes(), name=filename)


class Command(BaseCommand):
    help = "Seed FlowCraft Plumbing with realistic demo content."

    def handle(self, *args, **options):
        self.stdout.write("Seeding FlowCraft Plumbing demo data...")

        SiteSettings.objects.get_or_create(
            site_name="FlowCraft Plumbing",
            defaults=dict(
                tagline="Premium Plumbing. Precision Craft.",
                footer_description=(
                    "FlowCraft Plumbing delivers licensed, insured and highly rated plumbing "
                    "services for homes, offices and commercial properties — combining "
                    "master craftsmanship with modern, transparent service."
                ),
            ),
        )

        CompanyInfo.objects.get_or_create(
            headline="Craftsmanship you can trust, service you can rely on.",
            defaults=dict(
                description=(
                    "For over 15 years, FlowCraft Plumbing has been the trusted plumbing partner "
                    "for homeowners and businesses alike. Our licensed technicians combine "
                    "modern diagnostic tools with old-fashioned craftsmanship to deliver lasting "
                    "repairs, clean installations and honest, transparent pricing — every single time."
                ),
                image=local_image("about-1.jpg"),
                years_experience=15,
                jobs_completed=5000,
                happy_customers=3500,
                support_availability="24/7",
                service_areas_count=12,
                certified_technicians=22,
            ),
        )

        HeroSection.objects.get_or_create(
            heading="Reliable Plumbing. Done Right the First Time.",
            defaults=dict(
                subheading=(
                    "Professional plumbing solutions for homes, offices and commercial "
                    "properties — available when you need us."
                ),
                badge_text="Licensed & Insured Master Plumbers",
                background_image=local_image("hero-2.jpg"),
                cta_primary_text="Book a Plumber",
                cta_secondary_text="Call Now",
            ),
        )

        EmergencyBanner.objects.get_or_create(
            heading="Plumbing Emergency? We're Ready to Help.",
            defaults=dict(subtext="24/7 emergency plumbing response across every FlowCraft service area."),
        )

        why_us = [
            ("Users", "Experienced Professionals", "15+ years of licensed plumbing craftsmanship."),
            ("Zap", "Fast Response", "On-site within the hour for urgent plumbing issues."),
            ("Receipt", "Transparent Pricing", "Upfront quotes — no hidden fees, ever."),
            ("Hammer", "Quality Workmanship", "Premium parts and meticulous attention to detail."),
            ("ShieldCheck", "Licensed Technicians", "Fully licensed, insured and background-checked."),
            ("PhoneCall", "24/7 Emergency Service", "Round-the-clock support for burst pipes and leaks."),
            ("ThumbsUp", "Reliable Service", "On-time appointments, every time."),
            ("Award", "Satisfaction Guarantee", "We don't leave until the job is done right."),
        ]
        for i, (icon, title, desc) in enumerate(why_us):
            WhyChooseUsFeature.objects.get_or_create(title=title, defaults=dict(icon_name=icon, description=desc, order=i))

        steps = [
            (1, "Contact Us", "Call, WhatsApp or submit the booking form.", "Phone"),
            (2, "Describe the Problem", "Tell us what plumbing service you need.", "MessageSquare"),
            (3, "Professional Inspection", "Our plumber visits and evaluates the issue.", "Search"),
            (4, "Problem Solved", "We complete the repair professionally.", "CheckCircle2"),
        ]
        for num, title, desc, icon in steps:
            HowItWorksStep.objects.get_or_create(step_number=num, defaults=dict(title=title, description=desc, icon_name=icon, order=num))

        areas = [
            ("Chennai", "Chennai Central", "Full residential & commercial coverage."),
            ("Chennai", "Tambaram", "Rapid emergency response available."),
            ("Chennai", "Velachery", "Residential & apartment plumbing specialists."),
            ("Chennai", "Adyar", "Premium bathroom & kitchen installations."),
            ("Chennai", "Anna Nagar", "Full residential & commercial coverage."),
            ("Chennai", "Porur", "24/7 emergency plumbing available."),
            ("Chennai", "Sholinganallur", "IT corridor commercial plumbing specialists."),
        ]
        for i, (city, area, desc) in enumerate(areas):
            ServiceArea.objects.get_or_create(city=city, area=area, defaults=dict(description=desc, order=i))

        faqs = [
            ("Do you provide emergency plumbing services?", "Yes, our licensed technicians are available 24/7 for burst pipes, major leaks and other plumbing emergencies."),
            ("How quickly can a plumber arrive?", "In most service areas we can have a technician on-site within 60 minutes for emergency calls."),
            ("Do you provide plumbing services for commercial properties?", "Yes, we service offices, retail stores, apartments and commercial buildings of all sizes."),
            ("Do you provide estimates before starting work?", "Absolutely. We always provide a transparent, upfront quote before any work begins."),
            ("Do you repair water heaters?", "Yes, we install, repair and maintain both tank and tankless water heaters."),
            ("Which areas do you cover?", "We currently service Chennai and surrounding areas — see our Service Areas section for the full list."),
            ("Can I book a plumber through WhatsApp?", "Yes, just tap the WhatsApp button anywhere on the site to message us directly."),
            ("Do you provide maintenance services?", "Yes, we offer scheduled maintenance plans to help prevent plumbing issues before they start."),
        ]
        for i, (q, a) in enumerate(faqs):
            FAQ.objects.get_or_create(question=q, defaults=dict(answer=a, order=i))

        ContactInfo.objects.get_or_create(
            defaults=dict(
                phone="+91 90000 12345",
                emergency_phone="+91 90000 99999",
                email="info@flowcraftplumbing.com",
                whatsapp_number="+919000012345",
                whatsapp_default_message="Hi, I need plumbing service. Please share the available options and pricing.",
                address_line="12 Craftsman Avenue, Alwarpet",
                city="Chennai",
                state="Tamil Nadu",
                postal_code="600018",
                emergency_availability_text="24/7 Emergency Service Available",
            )
        )

        hours = [
            ("monday", time(8, 0), time(20, 0)),
            ("tuesday", time(8, 0), time(20, 0)),
            ("wednesday", time(8, 0), time(20, 0)),
            ("thursday", time(8, 0), time(20, 0)),
            ("friday", time(8, 0), time(20, 0)),
            ("saturday", time(9, 0), time(18, 0)),
        ]
        for day, op, cl in hours:
            BusinessHours.objects.get_or_create(day=day, defaults=dict(opening_time=op, closing_time=cl))
        BusinessHours.objects.get_or_create(day="sunday", defaults=dict(is_24_hours=True))

        socials = [
            ("facebook", "https://facebook.com/flowcraftplumbing"),
            ("instagram", "https://instagram.com/flowcraftplumbing"),
            ("youtube", "https://youtube.com/@flowcraftplumbing"),
            ("linkedin", "https://linkedin.com/company/flowcraftplumbing"),
        ]
        for i, (platform, url) in enumerate(socials):
            SocialMediaLink.objects.get_or_create(platform=platform, defaults=dict(url=url, order=i))

        GoogleMapSettings.objects.get_or_create(
            defaults=dict(
                embed_url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d80.2707!3d13.0339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAyJzAyLjAiTiA4MMKwMTYnMTQuNSJF!5e0!3m2!1sen!2sin!4v1650000000000",
                directions_url="https://maps.google.com/?q=13.0339,80.2707",
                latitude=13.0339,
                longitude=80.2707,
            )
        )

        SEOSettings.objects.get_or_create(
            defaults=dict(
                page_title="FlowCraft Plumbing | Reliable Plumbing Services in Chennai",
                meta_description="Licensed, insured plumbing experts for residential and commercial properties. 24/7 emergency service, transparent pricing, guaranteed workmanship.",
                keywords="plumber, plumbing services, emergency plumber, drain cleaning, pipe repair, Chennai plumber",
                og_title="FlowCraft Plumbing — Reliable Plumbing. Done Right.",
                og_description="Book a licensed plumber for residential, commercial and emergency plumbing services.",
                business_name="FlowCraft Plumbing",
                location="Chennai, Tamil Nadu",
            )
        )

        # --- Services ---
        cat_names = ["Residential", "Commercial", "Emergency", "Maintenance"]
        cats = {}
        for i, name in enumerate(cat_names):
            cats[name], _ = ServiceCategory.objects.get_or_create(name=name, defaults=dict(slug=name.lower(), order=i))

        service_photos = ["service-1.jpg", "service-2.jpg", "service-3.jpg", "hero-1.jpg", "hero-2.jpg", "about-2.jpg"]

        services = [
            ("Residential Plumbing", "Residential", "Complete plumbing solutions for homes.", "Home", 799, True),
            ("Emergency Plumbing", "Emergency", "Rapid response for urgent plumbing problems.", "Siren", 1499, True),
            ("Pipe Repair", "Maintenance", "Leak detection, damaged pipe repair and replacement.", "Wrench", 699, True),
            ("Drain Cleaning", "Maintenance", "Professional blockage removal and drain maintenance.", "Droplets", 599, False),
            ("Water Heater Services", "Residential", "Installation, repair and maintenance of water heaters.", "Flame", 1299, True),
            ("Bathroom Plumbing", "Residential", "Complete bathroom plumbing installation and repair.", "ShowerHead", 1999, False),
            ("Kitchen Plumbing", "Residential", "Sink, faucet, pipe and drainage solutions.", "CookingPot", 899, False),
            ("Leak Detection", "Maintenance", "Advanced inspection and leak detection services.", "Search", 799, False),
            ("Toilet Repair", "Residential", "Toilet installation, repair and replacement.", "Wrench", 599, False),
            ("Tap & Faucet Repair", "Maintenance", "Fix leaking, damaged or malfunctioning faucets.", "Droplet", 399, False),
            ("Sewer Line Services", "Commercial", "Professional sewer line inspection and repair.", "GitBranch", 2499, False),
            ("Commercial Plumbing", "Commercial", "Plumbing services for offices, shops, apartments and commercial buildings.", "Building2", 1999, True),
        ]
        for i, (name, cat, desc, icon, price, featured) in enumerate(services):
            slug = name.lower().replace(" & ", "-").replace(" ", "-")
            Service.objects.get_or_create(
                slug=slug,
                defaults=dict(
                    category=cats[cat],
                    name=name,
                    short_description=desc,
                    description=f"{desc} Our licensed FlowCraft technicians handle every job with precision, premium parts and a full workmanship guarantee.",
                    icon_name=icon,
                    image=local_image(service_photos[i % len(service_photos)]),
                    starting_price=price,
                    is_featured=featured,
                    order=i,
                ),
            )

        packages = [
            ("Basic Service", 499, ["Inspection", "Minor repair", "Basic maintenance"], False),
            ("Standard Service", 999, ["Inspection", "Repair", "Replacement", "Maintenance"], True),
            ("Emergency Service", 1999, ["Priority response", "Emergency inspection", "Immediate repair"], False),
        ]
        for i, (name, price, features, popular) in enumerate(packages):
            ServicePackage.objects.get_or_create(
                name=name,
                defaults=dict(price=price, description=f"{name} plan for common plumbing needs.", features=features, is_popular=popular, order=i),
            )

        technicians = [
            ("Arun Kumar", "Master Plumbing Technician", "Pipe fitting & leak detection", 18, "Licensed Master Plumber", "team-3.jpg"),
            ("Ravi Shankar", "Senior Plumbing Technician", "Water heater installation", 12, "Certified Plumbing Technician", "team-1.jpg"),
            ("Divya Krishnan", "Plumbing Technician", "Bathroom & kitchen plumbing", 8, "Certified Plumbing Technician", "team-2.jpg"),
            ("Meera Iyer", "Commercial Plumbing Specialist", "Sewer line & commercial systems", 14, "Licensed Commercial Plumber", "team-4.jpg"),
        ]
        for i, (name, desig, spec, years, cert, photo) in enumerate(technicians):
            Technician.objects.get_or_create(
                name=name,
                defaults=dict(
                    designation=desig, specialization=spec, years_experience=years,
                    certifications=cert, bio=f"{name} has {years}+ years of hands-on plumbing experience across residential and commercial projects.",
                    photo=local_image(photo), order=i,
                ),
            )

        # --- Gallery ---
        gallery_cats = ["Residential", "Commercial", "Bathroom", "Kitchen", "Pipe Repair", "Water Heater", "Emergency Work"]
        gcats = {}
        for i, name in enumerate(gallery_cats):
            gcats[name], _ = ProjectCategory.objects.get_or_create(name=name, defaults=dict(slug=name.lower().replace(" ", "-"), order=i))

        gallery_photos = ["hero-1.jpg", "hero-2.jpg", "about-1.jpg", "about-2.jpg", "service-1.jpg", "service-2.jpg", "service-3.jpg", "team-1.jpg"]

        for i in range(14):
            cat_name = gallery_cats[i % len(gallery_cats)]
            Project.objects.get_or_create(
                title=f"{cat_name} Project #{i + 1}",
                defaults=dict(
                    category=gcats[cat_name],
                    image=local_image(gallery_photos[i % len(gallery_photos)]),
                    description=f"Completed {cat_name.lower()} plumbing work by the FlowCraft team.",
                    location="Chennai",
                    is_featured=(i < 4),
                    order=i,
                ),
            )

        videos = [
            ("Precision Pipe Repair in Action", "Watch our technicians repair a damaged pipe with zero mess.", "service-1.jpg"),
            ("Modern Bathroom Installation", "A full bathroom plumbing installation, start to finish.", "hero-1.jpg"),
            ("Professional Drain Cleaning", "Deep drain cleaning using advanced hydro-jetting equipment.", "service-3.jpg"),
        ]
        for i, (title, desc, photo) in enumerate(videos):
            Video.objects.get_or_create(
                title=title,
                defaults=dict(description=desc, thumbnail=local_image(photo), order=i),
            )

        # Before/after keeps an illustrated (icon) treatment rather than
        # real photos on purpose — the demo photo set has no genuine
        # matched "before repair" / "after repair" pairs for the same
        # job, and faking one from unrelated stock photos would
        # misrepresent real results.
        before_after = [
            ("Broken Pipe → Repaired Pipe", "Pipe Repair"),
            ("Blocked Drain → Clean Drain", "Pipe Repair"),
            ("Old Bathroom → New Installation", "Bathroom"),
            ("Damaged Faucet → New Faucet", "Kitchen"),
        ]
        for i, (title, cat_name) in enumerate(before_after):
            BeforeAfterProject.objects.get_or_create(
                title=title,
                defaults=dict(
                    category=gcats.get(cat_name),
                    description=f"{title} — completed by FlowCraft Plumbing.",
                    order=i,
                ),
            )

        testimonials = [
            ("Priya Menon", "Adyar, Chennai", 5, "Fast response, professional work and very reasonable pricing. The plumber arrived on time and fixed the leak quickly.", "Pipe Repair", "testimonial-1.jpg"),
            ("Vikram Iyer", "Velachery, Chennai", 5, "Excellent bathroom plumbing installation. Clean work, on schedule and great communication throughout.", "Bathroom Plumbing", "testimonial-2.jpg"),
            ("Deepa Raghavan", "Anna Nagar, Chennai", 5, "Called them for an emergency burst pipe at midnight and they showed up within the hour. Lifesavers!", "Emergency Plumbing", "testimonial-4.jpg"),
            ("Mohammed Faizal", "Porur, Chennai", 4, "Very transparent pricing and the technician explained everything clearly before starting work.", "Water Heater Service", "testimonial-3.jpg"),
            ("Anjali Nair", "Tambaram, Chennai", 5, "Our office plumbing issues were sorted out quickly with minimal disruption to work. Highly recommend.", "Commercial Plumbing", "testimonial-1.jpg"),
        ]
        for i, (name, loc, rating, review, service, photo) in enumerate(testimonials):
            Testimonial.objects.get_or_create(
                customer_name=name,
                defaults=dict(
                    customer_image=local_image(photo),
                    location=loc, rating=rating, review=review, service_received=service,
                    is_featured=(i < 3), order=i,
                ),
            )

        self.stdout.write(self.style.SUCCESS("Demo data seeded successfully."))
