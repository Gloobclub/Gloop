import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Rocket } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/submit", label: "Submit Art" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
           <img 
             src="/images/20260218_060937_1771391580308.jpg" 
             alt="Gloop Logo" 
             className="w-10 h-10 rounded-full border border-white/10 group-hover:border-primary/50 transition-colors object-cover"
           />
           <span className="font-display font-bold text-xl tracking-[0.2em] text-white group-hover:text-primary transition-all duration-300">
             GLOOP<span className="text-primary italic">CLUB</span>
           </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-all hover:text-primary relative py-1",
                location === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
              {location === link.href && (
                <motion.div 
                  layoutId="underline"
                  className="absolute left-0 right-0 bottom-0 h-px bg-primary"
                />
              )}
            </Link>
          ))}
          <Button 
            variant="outline" 
            className="ml-4 border-primary/20 hover:border-primary hover:bg-primary/10 text-primary-foreground font-mono text-xs"
          >
            CONNECT WALLET
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-background"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
              {links.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-2xl font-display font-bold uppercase",
                    location === link.href ? "text-primary" : "text-white/60"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-bold">
                CONNECT WALLET
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
