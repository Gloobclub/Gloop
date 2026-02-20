import { Link } from "wouter";
import { Twitter, Instagram, Disc as Discord, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40 backdrop-blur-xl pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-display font-bold text-2xl tracking-widest text-white mb-6 block">
              GLOOP<span className="text-primary">CLUB</span>
            </Link>
            <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
              Digital fashion collectibles existing entirely on-chain. 
              Join the revolution of wearable NFT art.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/submit" className="text-muted-foreground hover:text-primary transition-colors">Submit Art</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Roadmap</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Whitepaper</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Community</h4>
            <div className="flex gap-4">
              <a 
                href="https://x.com/gloopclubs?s=21" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/gloopclub/" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://discord.com/invite/gloop" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#5865F2] hover:text-white transition-all hover:scale-110"
              >
                <Discord className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 Gloop Club. All rights reserved.</p>
          <div className="flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> on-chain
          </div>
        </div>
      </div>
    </footer>
  );
}
