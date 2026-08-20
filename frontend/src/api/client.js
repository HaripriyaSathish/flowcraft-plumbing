import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

const unwrap = (promise) =>
  promise.then((res) => {
    const data = res.data;
    return Array.isArray(data) ? data : data?.results ?? data;
  });

export const endpoints = {
  siteSettings: () => unwrap(api.get("/site-settings/")),
  companyInfo: () => unwrap(api.get("/company-info/")),
  hero: () => unwrap(api.get("/hero/")),
  emergencyBanner: () => unwrap(api.get("/emergency-banner/")),
  contactInfo: () => unwrap(api.get("/contact-info/")),
  mapSettings: () => unwrap(api.get("/map-settings/")),
  seoSettings: () => unwrap(api.get("/seo-settings/")),
  whyChooseUs: () => unwrap(api.get("/why-choose-us/")),
  howItWorks: () => unwrap(api.get("/how-it-works/")),
  serviceAreas: () => unwrap(api.get("/service-areas/")),
  faqs: () => unwrap(api.get("/faqs/")),
  businessHours: () => unwrap(api.get("/business-hours/")),
  socialLinks: () => unwrap(api.get("/social-links/")),

  serviceCategories: () => unwrap(api.get("/service-categories/")),
  services: () => unwrap(api.get("/services/")),
  packages: () => unwrap(api.get("/packages/")),
  technicians: () => unwrap(api.get("/technicians/")),
  createServiceRequest: (payload) => api.post("/service-requests/", payload),

  projectCategories: () => unwrap(api.get("/project-categories/")),
  projects: () => unwrap(api.get("/projects/")),
  videos: () => unwrap(api.get("/videos/")),
  beforeAfter: () => unwrap(api.get("/before-after/")),
  testimonials: () => unwrap(api.get("/testimonials/")),
};
