import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Layers, Box, Twitter, Send, Loader2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const twitterFormSchema = z.object({
  twitterHandle: z.string().min(1, "X username is required"),
  quoteContent: z.string().min(1, "Quote/Thread content is required"),
});

type TwitterFormValues = z.infer<typeof twitterFormSchema>;

const FEATURED_IMAGES = [
  "/images/IMG-20260217-WA0012.jpg",
  "/images/IMG-20260217-WA0016.jpg",
  "/images/IMG-20260217-WA0015.jpg"
];

export default function Home() {
  const { toast } = useToast();
  const form = useForm<TwitterFormValues>({
    resolver: zodResolver(twitterFormSchema),
    defaultValues: {
      twitterHandle: "",
      quoteContent: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: TwitterFormValues) => {
      await apiRequest("POST", "/api/twitter-submissions", values);
    },
    onSuccess: () => {
      toast({
        title: "Submission Sent",
        description: "Your X submission has been received.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send submission. Please try again.",
      });
    },
  });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(124,58,237,0.15),transparent_70%)]" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_50%_50%,_rgba(6,182,212,0.1),transparent_70%)]" />
        </div>

        <div className="container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-6 backdrop-blur-sm">
              ✨ GENESIS COLLECTION LIVE
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none tracking-tighter mb-6">
              DIGITAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-primary/50">FASHION</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light mb-8 max-w-lg">
              Collectibles that exist entirely on-chain. <br />
              <span className="text-white font-medium">Own it. Wear it. Trade it.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/gallery">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-gray-200 transition-all hover:scale-105">
                  Explore Gallery
                </Button>
              </Link>
              <Link href="/submit">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/20 hover:bg-white/10 hover:border-white text-white backdrop-blur-sm transition-all hover:scale-105">
                  Submit Art <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="relative h-[600px] hidden lg:block perspective-1000">
            <motion.div 
              style={{ y: y1 }}
              className="absolute top-0 right-10 w-72 h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-20"
            >
              <img src={FEATURED_IMAGES[0]} alt="Hero Art 1" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            
            <motion.div 
              style={{ y: y2 }}
              className="absolute bottom-20 left-10 w-80 h-[450px] rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_50px_rgba(124,58,237,0.3)] z-10"
            >
              <img src={FEATURED_IMAGES[1]} alt="Hero Art 2" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div className="font-mono text-sm">
                  <p className="text-primary">FEATURED</p>
                  <p className="text-white text-lg font-bold">CYBER SNEAKER #042</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <div className="border-y border-white/5 bg-white/5 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/20 text-primary">
                <Box className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">100% On-Chain</h3>
                <p className="text-sm text-muted-foreground">Assets stored directly on blockchain</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-secondary/20 text-secondary">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Interoperable</h3>
                <p className="text-sm text-muted-foreground">Use across multiple metaverses</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/20 text-accent">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Verified Rarity</h3>
                <p className="text-sm text-muted-foreground">Provable scarcity and ownership</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* X Submission Form Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Twitter className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">X Submissions</h2>
              </div>
              
              <p className="text-muted-foreground mb-8">
                Submit your X username and quote tweets or threads below. We'll receive your submission instantly via email.
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit((v) => mutation.mutate(v))} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="twitterHandle"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">@</span>
                            <Input 
                              placeholder="username" 
                              className="bg-black/40 border-white/10 h-14 pl-10 focus:border-primary transition-all rounded-xl" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="quoteContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Paste your quote tweet link or thread content here..." 
                            className="bg-black/40 border-white/10 min-h-[120px] focus:border-primary transition-all rounded-xl p-4" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all group overflow-hidden"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send Submission <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
        
        {/* Abstract background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10" />
      </section>

      <Footer />
    </div>
  );
}
