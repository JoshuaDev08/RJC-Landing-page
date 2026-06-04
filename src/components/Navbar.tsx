import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/Logo.jpg";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Build", href: "#builder" },
  { name: "Projects", href: "#projects" },
  { name: "Materials", href: "#material" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navY, setNavY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 0);

      const builderSection = document.querySelector("#builder");

      if (builderSection) {
        const builderTop = builderSection.getBoundingClientRect().top;

        const reachedBuilder = builderTop <= 100;

        if (reachedBuilder) {
          const scrollDiff = currentScrollY - lastScrollY;

          setNavY((prev) => {
            let next = prev - scrollDiff;

            // 👇 allow it to recover when scrolling UP
            if (scrollDiff < 0) {
              next = Math.min(0, prev - scrollDiff); // scroll up → show
            }

            // keep hidden limit when scrolling down
            if (scrollDiff > 0) {
              next = Math.max(-120, prev - scrollDiff);
            }

            return next;
          });
        } else {
          setNavY(0);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    const targetElement = document.querySelector(href);

    if (targetElement) {
      const offset = 0;
      const elementPosition = targetElement.getBoundingClientRect().top;

      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: navY,
          opacity: 1,
        }}
        transition={{
          duration: 0.1,
          ease: "linear",
        }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "pt-2 px-2 sm:px-4" : "px-0 pt-0"
        }`}
      >
        <div
          className={`navbar transition-all duration-300  ${
            isScrolled
              ? "bg-zinc-900/80 backdrop-blur-md border-white/10 border shadow rounded-2xl"
              : "bg-transparent border-transparent"
          }`}
        >
          <div className="navbar-start">
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer lg:ml-1">
              <img
                src={Logo}
                alt="RJC Aluminum Logo"
                className="w-10 h-10 rounded-box object-cover"
              />

              <div className="leading-tight">
                <h1 className="text-sm sm:text-base lg:text-xl font-bold text-white whitespace-nowrap">
                  RJC Aluminum
                </h1>

                <span className="text-[10px] sm:text-xs lg:text-sm text-warning font-normal block whitespace-nowrap">
                  Glass and Wood Works
                </span>
              </div>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                id={`nav-link-${index}`}
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.href)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -1 }}
                className="text-zinc-300 hover:text-warning transition-colors relative group cursor-pointer"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-warning group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </div>
          <div className="navbar-end">
            <div className="hidden lg:block ">
              <a className="btn btn-soft rounded-box btn-warning lg:mr-1">
                Get Quote
              </a>
            </div>
          </div>

          <button
            className="lg:hidden w-12 h-10 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-50 w-full sm:w-80 bg-base-300 backdrop-blur-xl border-l border-white/10 lg:hidden"
          >
            <div className="flex flex-col h-full p-8">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="self-end w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-8"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="flex flex-col gap-6 mb-8">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                    className="text-sm text-zinc-300 hover:text-warning cursor-pointer transition-colors cursor-pointer"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto space-y-4">
                <button className="w-full btn btn-warning">Get Quote</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
