import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

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
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "SERVICES", href: "/services" },
    { name: "FAQ", href: "/faq" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-[#EFECE6]/90 backdrop-blur-md border-b border-black/[0.08] py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo with consistent blue styling for OneNexus */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative overflow-hidden rounded-[4px] p-0.5 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(37,84,232,0.4)]">
              <img
                src="/onenexus-logo-bckgr.png"
                alt="OneNexus"
                className="h-8 sm:h-9 w-auto object-contain transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black tracking-tight text-xl sm:text-2xl text-[#2554E8] group-hover:opacity-90 transition-opacity">
                OneNexus
              </span>
              <span className="font-mono text-[9px] tracking-widest text-[#475569] uppercase font-semibold hidden sm:block -mt-1">
                Your Digital Growth Partner
              </span>
            </div>
          </Link>

          {/* Navigation Links: Home | About | Services | FAQ | Contact */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-[0.2em] uppercase font-bold text-[#111827]">
            {navLinks.map((link) => {
              const isActive = router.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-colors py-1 border-b-2 ${
                    isActive
                      ? "text-[#2554E8] border-[#2554E8]"
                      : "border-transparent hover:text-[#2554E8]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111827] hover:bg-[#2554E8] text-white font-mono text-xs tracking-widest uppercase font-bold rounded-[2px] transition-all duration-300 shadow-md hover:shadow-[0_4px_20px_rgba(37,84,232,0.35)] hover:-translate-y-0.5"
            >
              <span>GET IN TOUCH</span>
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
              {navLinks.map((link) => {
                const isActive = router.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-3 border-b border-black/10 font-bold flex items-center justify-between transition-colors ${
                      isActive ? "text-[#2554E8]" : "text-[#111827] hover:text-[#2554E8]"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight size={14} className="text-[#2554E8]" />
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 w-full py-4 bg-[#2554E8] text-white font-mono text-xs uppercase tracking-widest font-bold text-center rounded-[2px] transition-colors block shadow-lg"
              >
                START YOUR GROWTH JOURNEY ↗
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
