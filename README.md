# FlowCraft Plumbing

A premium, full-stack landing website for a professional plumbing services company.

- **Frontend:** React 19 + Vite + Tailwind CSS v4 + Framer Motion + lucide-react + Axios + React Router
- **Backend:** Django 5 + Django REST Framework + PostgreSQL + Django Admin

Every piece of business content — hero copy, services, pricing, technicians, gallery, testimonials, FAQs, service areas, contact details, WhatsApp/phone numbers, business hours, map, SEO — is stored in the database and managed entirely from the Django Admin. The React frontend renders nothing hardcoded; it fetches everything from the REST API.

## Project Structure

```
flowcraft-plumbing/
├── backend/          Django + DRF API and admin
│   ├── config/        Project settings, root URLconf
│   ├── siteconfig/     Site settings, hero, about, contact, hours, social, map, SEO, service areas, FAQs
│   ├── services/       Service categories, services, packages, technicians, service requests (bookings)
│   └── gallery/        Projects/gallery, videos, before/after, testimonials
└── frontend/         React + Vite single-page app
    └── src/
        ├── api/         Axios client + endpoint map
        ├── components/  layout/, sections/, ui/, icons/
        ├── context/     Booking modal state
        └── hooks/       useFetch data-fetching hook
```

## Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
# Edit .env with your PostgreSQL credentials, or set USE_SQLITE=True for quick local testing

python manage.py migrate
python manage.py createsuperuser
python manage.py seed_demo_data   # populates realistic demo content (optional but recommended)
python manage.py runserver
```

API available at `http://localhost:8000/api/`, admin at `http://localhost:8000/admin/`.

### Email

By default emails print to the console (`EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend`). To send real emails, set SMTP credentials in `.env` (e.g. Gmail app password) and change `EMAIL_BACKEND` to `django.core.mail.backends.smtp.EmailBackend`. Every booking sends a notification to `COMPANY_NOTIFICATION_EMAIL` and, if the customer provided an email, a confirmation to them.

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_BASE_URL, defaults to http://localhost:8000/api
npm run dev
```

App available at `http://localhost:5173/`.

## Demo Photography

`seed_demo_data` populates real (not stock-icon) plumbing photography sourced from the free "Plumberz" HTML template by HTML Codex / ThemeWagon (`backend/seed_assets/`, see `ATTRIBUTION.txt` there). That license requires keeping the attribution credit in the footer unless a Credit Removal License is purchased from HTML Codex. Treat these as placeholder/demo photos — swap them for real company photography any time via the Django Admin's image upload fields (Services, Technicians, Testimonials, About, Hero, Gallery, Videos), with no code changes needed.

## Managing Content

Everything below is editable from Django Admin (`/admin/`) with no code changes required:

- Site Settings, Company Info (About section + animated stats), Hero Section, Emergency Banner
- Services, Service Categories, Service Packages (pricing), Technicians, Service Requests (bookings — with status workflow: New → Contacted → Scheduled → In Progress → Completed / Cancelled)
- Projects/Gallery, Videos, Before & After Projects, Testimonials
- Why Choose Us features, How It Works steps, Service Areas, FAQs
- Contact Info, Business Hours, Social Media Links, Google Map Settings, SEO Settings

Image fields support direct file upload; most also accept a fallback external image URL (useful for quickly linking stock photography before real photos are uploaded).

## Production Architecture

In production, Django serves **both** the API and the built React app from one process, so the whole site lives at a single URL — no separate frontend host, no CORS to configure.

- `frontend/dist/assets/*` (JS/CSS/images from `npm run build`) are served directly by WhiteNoise via `WHITENOISE_ROOT`.
- `frontend/dist/index.html` is served for `/` and any other route not claimed by `/admin/`, `/api/` or `/media/` (see `backend/config/frontend_views.py` + `backend/config/urls.py`).
- The frontend is built with `VITE_API_BASE_URL=/api` (a relative path) so it calls the API on the same origin, wherever that origin ends up being.

## Deployment (Render)

This repo includes a `Dockerfile` and `render.yaml` that deploy the whole app — frontend, backend and a managed Postgres database — as a **single Render Web Service with one URL**.

### Push the code to GitHub first

```bash
git init
git add -A
git commit -m "Initial commit"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

(Skip `git init`/`git commit` if this folder is already a git repo with commits — just add the remote and push.)

### Deploy on Render

1. Go to [render.com](https://render.com) → **New +** → **Blueprint**
2. Connect your GitHub account and select this repository
3. Render reads `render.yaml` and shows a plan: one **Web Service** (`flowcraft-plumbing`, Docker-based) + one **Postgres database** (`flowcraft-plumbing-db`, free tier)
4. Click **Apply** — Render builds the Docker image (installs Node, builds the frontend, installs Python deps, runs `collectstatic`) and starts the service, wiring `DATABASE_URL` and a generated `SECRET_KEY` in automatically
5. Wait for the build to finish (first build takes several minutes — it's compiling the whole frontend and backend)
6. Your site is live at `https://flowcraft-plumbing-XXXX.onrender.com` (or whatever name you gave it) — one URL for everything

### After the first deploy

Open the service's **Shell** tab in the Render dashboard and run:

```bash
python manage.py createsuperuser
python manage.py seed_demo_data
```

Then visit `https://<your-app>.onrender.com/admin/` to manage content, and `https://<your-app>.onrender.com/` for the live site.

### No `render.yaml`? Manual setup

If you'd rather configure it by hand instead of using the Blueprint: create a Postgres instance, then a Web Service with **Runtime: Docker**, and set these environment variables — `SECRET_KEY` (any long random string), `DEBUG=False`, `DATABASE_URL` (from your Postgres instance's "Internal Connection String"), `EMAIL_BACKEND`, `COMPANY_NOTIFICATION_EMAIL`. The `Dockerfile` handles the build and start commands, so nothing else needs setting.

### Known limitation: media persistence

Render's default web service disk is **ephemeral** — anything uploaded through the Django Admin (technician photos, new gallery images, etc.) is wiped on the next deploy or restart. For a demo this is usually fine; for real ongoing use, either:
- Add a [Render Disk](https://render.com/docs/disks) mounted at `/app/backend/media` (available on paid instance types), or
- Swap `MEDIA` storage for S3/Cloudinary via `django-storages` (not included here, but a small addition to `settings.py`).

## Local Production Notes

- Static files are served via WhiteNoise (`collectstatic` before deploy).
- Set `DEBUG=False`, a real `SECRET_KEY`, and proper `ALLOWED_HOSTS` in any non-Render deployment.
