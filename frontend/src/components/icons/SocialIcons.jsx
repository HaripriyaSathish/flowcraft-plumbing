const base = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

export function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

export function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...props}>
      <path d="M22 4.01c-.9.4-1.8.7-2.8.9A4.9 4.9 0 0 0 21.4 2.4a9.9 9.9 0 0 1-3.1 1.2 4.86 4.86 0 0 0-8.3 4.4A13.8 13.8 0 0 1 1.6 3a4.86 4.86 0 0 0 1.5 6.5 4.8 4.8 0 0 1-2.2-.6v.06a4.87 4.87 0 0 0 3.9 4.77 4.9 4.9 0 0 1-2.2.08 4.87 4.87 0 0 0 4.55 3.38A9.76 9.76 0 0 1 0 19.54a13.79 13.79 0 0 0 7.48 2.19c8.97 0 13.88-7.43 13.88-13.88 0-.21 0-.42-.02-.63A9.9 9.9 0 0 0 22 4.01z" />
    </svg>
  );
}

export const socialIconMap = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
};
