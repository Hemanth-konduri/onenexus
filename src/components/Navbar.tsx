import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Set translucent background trigger
      setIsScrolled(currentScrollY > 20);

      // 2. Hide on scroll down, show on scroll up
      if (currentScrollY <= 40) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 4) {
        setIsVisible(false); // Hide when scrolling down
      } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 4) {
        setIsVisible(true);  // Show when scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "ABOUT", href: "#about" },
    { name: "SERVICES", href: "#services" },
    { name: "WORK", href: "#work" },
    { name: "CONTACT", href: "/contact", isExternal: true },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-[#EFECE6]/85 backdrop-blur-md border-b border-black/[0.08] py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Chameleon Adaptive Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative overflow-hidden rounded-[4px] p-0.5 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(37,84,232,0.4)]">
              <img
                src="/onenexus-logo-bckgr.png"
                alt="oneNexus Studio"
                className="h-8 sm:h-9 w-auto object-contain transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
              />
            </div>
            <span className="font-sans font-black tracking-tight text-xl text-[#111827] group-hover:text-[#2554E8] transition-colors duration-300">
              one<span className="text-[#2554E8] group-hover:text-[#111827]">Nexus</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-9 font-mono text-xs tracking-[0.2em] uppercase font-bold text-[#111827]">
            {navLinks.map((link) =>
              link.isExternal ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-[#2554E8] transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-[#2554E8] transition-colors"
                >
                  {link.name}
                </a>
              )
            )}
          </nav>

          {/* Right CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111827] hover:bg-[#2554E8] text-white font-mono text-xs tracking-widest uppercase font-bold rounded-[2px] transition-all duration-300 shadow-md hover:shadow-[0_4px_20px_rgba(37,84,232,0.35)] hover:-translate-y-0.5"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#111827] hover:text-[#2554E8] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 bg-[#EFECE6] border border-black/10 rounded-none p-6 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest">
              {navLinks.map((link) =>
                link.isExternal ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 border-b border-black/10 text-[#111827] font-bold flex items-center justify-between hover:text-[#2554E8]"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight size={14} className="text-[#2554E8]" />
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 border-b border-black/10 text-[#111827] font-bold flex items-center justify-between hover:text-[#2554E8]"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight size={14} className="text-[#2554E8]" />
                  </a>
                )
              )}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 w-full py-4 bg-[#2554E8] text-white font-mono text-xs uppercase tracking-widest font-bold text-center rounded-[2px] transition-colors block shadow-lg"
              >
                START A PROJECT ↗
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
