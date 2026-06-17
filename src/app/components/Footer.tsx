import { Instagram, Facebook, Twitter, Linkedin, Youtube, Globe } from "lucide-react";
import { type SiteData, type SocialLink } from "../hooks/useSheetData";

function getSocialIcon(iconName: string) {
  const map: Record<string, any> = {
    instagram: Instagram,
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube,
    globe: Globe,
  };
  return map[iconName.toLowerCase()] || null;
}

interface FooterProps {
  site: SiteData;
  socials: SocialLink[];
}

export function Footer({ site, socials }: FooterProps) {
  return (
    <footer className="py-12 px-6 bg-[#0a0806] border-t border-[rgba(201,169,110,0.08)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-['Playfair_Display'] text-[#9c8e7e] text-sm tracking-widest">
          {site.brandName}
        </p>
        <p className="font-['DM_Mono'] text-[#9c8e7e]/40 text-xs tracking-wider text-center">
          {site.copyright}
        </p>
        <div className="flex items-center gap-5">
          {socials.map((link) => {
            const IconComponent = getSocialIcon(link.icon);
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9c8e7e] hover:text-[#c9a96e] transition-colors duration-300"
                aria-label={link.name}
              >
                {IconComponent ? (
                  <IconComponent size={16} />
                ) : (
                  <span className="font-['DM_Mono'] text-xs">{link.name.slice(0, 2)}</span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
