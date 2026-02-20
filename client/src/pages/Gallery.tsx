import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { useSubmissions } from "@/hooks/use-submissions";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Fallback images if API has no data yet
const PLACEHOLDERS = [
  { id: 101, title: "Floating Dreams", imageUrl: "/images/IMG-20260217-WA0012_1771391580443.jpg", twitterHandle: "@artist_one" },
  { id: 102, title: "Neon Swing", imageUrl: "/images/IMG-20260217-WA0013_1771391580391.jpg", twitterHandle: "@cyber_punk" },
  { id: 103, title: "Workspace Zen", imageUrl: "/images/IMG-20260217-WA0014_1771391580488.jpg", twitterHandle: "@lofi_beats" },
  { id: 104, title: "Fast Food Future", imageUrl: "/images/IMG-20260217-WA0015_1771391580529.jpg", twitterHandle: "@mc_future" },
  { id: 105, title: "Glow Stare", imageUrl: "/images/IMG-20260217-WA0016_1771391580361.jpg", twitterHandle: "@neon_gaze" },
];

export default function Gallery() {
  const { data: submissions, isLoading } = useSubmissions();

  const items = (submissions && submissions.length > 0) ? submissions : PLACEHOLDERS;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 container mx-auto px-4">
        <SectionHeading 
          title="Community Gallery" 
          subtitle="Curated submissions from the Gloop Club" 
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="group relative rounded-2xl overflow-hidden bg-card border border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20">
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-0">
                        #GLOOP
                      </Badge>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-display font-bold text-xl text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-primary font-mono">{item.twitterHandle || "Anonymous"}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
