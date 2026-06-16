import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = ["Work", "About", "Process", "Contact"];

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (section: string) => {
    onNavigate(section);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-4 backdrop-blur-md bg-[#0f0d0b]/80 border-b border-[rgba(201,169,110,0.1)]" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => handleNav("hero")}
            className="font-['Playfair_Display'] text-[#f0ebe3] tracking-widest text-sm uppercase hover:text-[#c9a96e] transition-colors duration-300"
          >
            Elena Vasquez
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNav(item.toLowerCase())}
                className={`font-['DM_Sans'] text-sm tracking-widest uppercase transition-colors duration-300 relative group ${
                  activeSection === item.toLowerCase() ? "text-[#c9a96e]" : "text-[#9c8e7e] hover:text-[#f0ebe3]"
                }`}
              >
                {item}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#c9a96e] transition-all duration-300 ${
                    activeSection === item.toLowerCase() ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#f0ebe3] hover:text-[#c9a96e] transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0f0d0b] flex flex-col items-center justify-center gap-10"
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNav(item.toLowerCase())}
                className="font-['Playfair_Display'] text-4xl text-[#f0ebe3] hover:text-[#c9a96e] transition-colors duration-300 tracking-wide"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
