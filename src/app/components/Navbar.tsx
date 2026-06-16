import { Home, Search, PlusSquare, Heart, Mail } from "lucide-react";

interface NavbarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

export function Navbar({ activePage, onPageChange }: NavbarProps) {
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
        className="sticky top-0 z-40 hidden md:flex items-center justify-between px-6 h-14 border-b"
        style={{ background: "var(--background)", borderColor: "var(--border)" }}
      >
        <div
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "22px",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--foreground)",
            cursor: "pointer",
          }}
          onClick={() => onPageChange("home")}
        >
          maya.art
        </div>

        <div className="flex items-center gap-6">
          {items.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onPageChange(id)}
              title={label}
              style={{
                color: activePage === id ? "var(--foreground)" : "var(--muted-foreground)",
                transition: "color 0.15s",
              }}
            >
              <Icon size={24} strokeWidth={activePage === id ? 2.5 : 1.5} />
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden items-center justify-around h-14 border-t"
        style={{ background: "var(--background)", borderColor: "var(--border)" }}
      >
        {items.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onPageChange(id)}
            title={label}
            style={{
              color: activePage === id ? "var(--foreground)" : "var(--muted-foreground)",
            }}
          >
            <Icon size={24} strokeWidth={activePage === id ? 2.5 : 1.5} />
          </button>
        ))}
      </nav>
    </>
  );
}
