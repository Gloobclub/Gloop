import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubmissionSchema } from "@shared/schema";
import { useCreateSubmission } from "@/hooks/use-submissions";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { z } from "zod";
import { Loader2, UploadCloud } from "lucide-react";
import { useState } from "react";

// Add validation to the schema for the form
const formSchema = insertSubmissionSchema.extend({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z.string().url("Must be a valid URL"),
  walletAddress: z.string().min(20, "Invalid wallet address"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Submit() {
  const { mutate, isPending } = useCreateSubmission();
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      walletAddress: "",
      twitterHandle: "",
      discordHandle: "",
    },
  });

  function onSubmit(data: FormValues) {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        setPreview(null);
      },
    });
  }

  // Watch image URL to show preview
  const imageUrl = form.watch("imageUrl");
  if (imageUrl && imageUrl !== preview) {
    setPreview(imageUrl);
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 container mx-auto px-4 max-w-5xl">
        <SectionHeading 
          title="Submit Your Creation" 
          subtitle="Join the Gloop Club Collection" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card/50 backdrop-blur-md border border-white/5 rounded-2xl p-8"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Artwork Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Cyber Punk #2077" className="bg-black/40 border-white/10 focus:border-primary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us the story behind this piece..." className="bg-black/40 border-white/10 focus:border-primary min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." className="bg-black/40 border-white/10 focus:border-primary" {...field} />
                      </FormControl>
                      <p className="text-xs text-muted-foreground">Paste a direct link to your image (hosted on IPFS, Arweave, or cloud).</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="twitterHandle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Twitter Handle</FormLabel>
                        <FormControl>
                          <Input placeholder="@username" className="bg-black/40 border-white/10 focus:border-primary" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discordHandle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Discord User</FormLabel>
                        <FormControl>
                          <Input placeholder="user#1234" className="bg-black/40 border-white/10 focus:border-primary" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="walletAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Wallet Address (ETH)</FormLabel>
                      <FormControl>
                        <Input placeholder="0x..." className="bg-black/40 border-white/10 focus:border-primary font-mono text-xs" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold h-12 rounded-xl mt-4 hover:shadow-lg hover:shadow-primary/25 transition-all"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>

          {/* Preview Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-card rounded-2xl border border-dashed border-white/20 h-[500px] flex items-center justify-center relative overflow-hidden group">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" onError={() => setPreview(null)} />
              ) : (
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <UploadCloud className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Preview Your Art</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter an image URL to see how your collectible will look in the gallery.
                  </p>
                </div>
              )}
              
              {/* Overlay effect on preview */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            <div className="p-6 bg-primary/10 rounded-xl border border-primary/20">
              <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Submission Guidelines
              </h4>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Original artwork only. No copyright infringement.</li>
                <li>High resolution recommended (min 2000x2000px).</li>
                <li>Supported formats: JPG, PNG, GIF, WEBP.</li>
                <li>Inappropriate content will be rejected.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
