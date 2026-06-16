import { Home, Search, PlusSquare, Heart, Mail, Palette } from "lucide-react";
import { useSheetSingle, mapSite, DEFAULT_SITE, type SiteData } from "../hooks/useSheetData";

interface NavbarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

export function Navbar({ activePage, onPageChange }: NavbarProps) {
  const { data: site } = useSheetSingle<SiteData>("Site", mapSite, DEFAULT_SITE);

  const items = [
    { id: "home", icon: Home, label: "Home" },
    { id: "explore", icon: Search, label: "Explore" },
    { id: "contact", icon: Mail, label: "Contact" },
    { id: "notifications", icon: Heart, label: "Activity" },
  ];

  return (
    <>
      {/* Desktop top nav */}
      <nav
        className="sticky top-0 z-40 hidden md:flex items-center justify-between px-6 h-16 border-b backdrop-blur-md"
        style={{ background: "color-mix(in srgb, var(--background) 85%, transparent)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onPageChange("home")}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6)" }}>
            <Palette size={14} color="#fff" strokeWidth={2.5} />
          </div>
          <div
            className="gradient-text"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "22px",
              fontWeight: 400,
              fontStyle: "italic",
            }}
          >
            {site.brandSlug}
          </div>
        </div>

        <div className="flex items-center gap-6">
          {items.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onPageChange(id)}
              title={label}
              className="relative p-2 rounded-lg transition-all duration-200"
              style={{
                color: activePage === id ? "var(--foreground)" : "var(--muted-foreground)",
                background: activePage === id ? "var(--secondary)" : "transparent",
              }}
            >
              <Icon size={22} strokeWidth={activePage === id ? 2.5 : 1.5} />
              {activePage === id && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: "#f59e0b" }} />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden items-center justify-around h-14 border-t backdrop-blur-md"
        style={{ background: "color-mix(in srgb, var(--background) 90%, transparent)", borderColor: "var(--border)" }}
      >
        {items.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onPageChange(id)}
            title={label}
            className="relative p-2 rounded-lg transition-colors duration-200"
            style={{
              color: activePage === id ? "var(--foreground)" : "var(--muted-foreground)",
            }}
          >
            <Icon size={24} strokeWidth={activePage === id ? 2.5 : 1.5} />
            {activePage === id && (
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: "#f59e0b" }} />
            )}
          </button>
        ))}
      </nav>
    </>
  );
}
