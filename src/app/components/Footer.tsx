import { Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-[#0a0806] border-t border-[rgba(201,169,110,0.08)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-['Playfair_Display'] text-[#9c8e7e] text-sm tracking-widest">
          Elena Vasquez
        </p>
        <p className="font-['DM_Mono'] text-[#9c8e7e]/40 text-xs tracking-wider text-center">
          © 2024 Elena Vasquez. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9c8e7e] hover:text-[#c9a96e] transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9c8e7e] hover:text-[#c9a96e] transition-colors duration-300"
            aria-label="Facebook"
          >
            <Facebook size={16} />
          </a>
          <a
            href="https://behance.net"
            target="_blank"
            rel="noopener noreferrer"
            className="font-['DM_Mono'] text-[#9c8e7e] hover:text-[#c9a96e] transition-colors duration-300 text-xs"
            aria-label="Behance"
          >
            Be
          </a>
        </div>
      </div>
    </footer>
  );
}
