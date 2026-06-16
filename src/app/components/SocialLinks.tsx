import { ExternalLink } from "lucide-react";

const socials = [
  {
    name: "Instagram",
    handle: "@maya.chen.art",
    url: "#",
    color: "#E1306C",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@mayachenpaints",
    url: "#",
    color: "#ffffff",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    handle: "Maya Chen Art",
    url: "#",
    color: "#E60023",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    name: "Behance",
    handle: "Maya Chen",
    url: "#",
    color: "#0057ff",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
      </svg>
    ),
  },
  {
    name: "Etsy",
    handle: "MayaChenOriginals",
    url: "#",
    color: "#F16521",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.001 0C4.533 0 .062 4.471.062 9.938c0 5.466 4.47 9.937 9.938 9.937 5.467 0 9.937-4.47 9.937-9.937C19.937 4.47 15.467 0 10 0zm4.062 14.75H8.813v-.875h.75c.208 0 .312-.104.312-.313V6.063c0-.208-.104-.313-.313-.313H8.75V4.876h5.188v1.875H12.75v-.875H11v2.687h1.688V9.25H11v3.688h1.75v-.875h1.313v2.687z" />
      </svg>
    ),
  },
];

export function SocialLinks() {
  return (
    <div className="max-w-[935px] mx-auto px-4 py-12 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="flex flex-col items-center gap-2 mb-8">
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "22px",
            fontWeight: 400,
            color: "var(--foreground)",
          }}
        >
          Find me everywhere
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--border))" }} />
          <span className="gradient-text" style={{ fontSize: "12px", fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>connect & collect</span>
          <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, var(--border), transparent)" }} />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {socials.map(({ name, handle, url, color, icon }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 group hover:scale-[1.02] hover:shadow-lg"
            style={{
              background: "var(--secondary)",
              border: "1px solid var(--border)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = color;
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 24px ${color}20`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            <span style={{ color }} className="transition-transform duration-300 group-hover:scale-110">{icon}</span>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "13px", color: "var(--foreground)", lineHeight: 1.2 }}>
                {name}
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "var(--muted-foreground)", lineHeight: 1.2 }}>
                {handle}
              </p>
            </div>
            <ExternalLink size={14} style={{ color: "var(--muted-foreground)", marginLeft: "4px" }} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ))}
      </div>
    </div>
  );
}
