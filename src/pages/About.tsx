import { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase-client";
import { SEO } from "@/components/SEO";

const About = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    if (location.state?.scrollToContact) {
      document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", { body: formData });
      if (error) throw error;
      toast({ title: "Message sent!", description: "I'll get back to you as soon as possible." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <SEO
        title="About CPH Concerts"
        description="Learn about CPH Concerts - your guide to live music in Copenhagen. Contact us to suggest venues or provide feedback about Copenhagen's music scene."
        canonicalUrl="/about" />

      <div className="max-w-2xl mx-auto px-4 md:px-0 w-full">
        <Link
          to="/"
          className="text-text-secondary hover:text-primary transition-colors inline-flex items-center gap-2 text-sm font-medium mb-10">
          <ArrowLeft className="h-4 w-4" />
          Back to Concerts
        </Link>

        {/* Hero */}
        <div className="text-left space-y-3 mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">About</p>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-[1.05]">
            Live music in <span className="text-primary">Copenhagen</span>, in one place.
          </h1>
        </div>

        {/* Story */}
        <div className="space-y-5 text-text-secondary text-base md:text-lg leading-relaxed mb-14">
          <p>
            Hi, I'm <span className="text-text-primary font-medium">Igor</span>. I built ConcertsCPH to help anyone discover new music happening in Copenhagen — from intimate club nights to arena shows, all in one calm, scrollable place.
          </p>
          <p>
            Missing a venue? Spotted a bug? Want to say hi? Drop me a line below.
          </p>
        </div>

        {/* Contact card */}
        <div id="contact-form" className="rounded-2xl bg-card/60 backdrop-blur-md border border-border p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Send className="h-4 w-4 text-primary" />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-semibold text-text-primary leading-tight">Get in touch</h2>
              <p className="text-xs text-text-secondary">Suggestions, feedback, hellos — all welcome.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            <Input
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              maxLength={100}
              className="h-11 bg-background/40 border-border text-text-primary placeholder:text-text-secondary/70 rounded-xl focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30"
            />
            <Input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              maxLength={255}
              className="h-11 bg-background/40 border-border text-text-primary placeholder:text-text-secondary/70 rounded-xl focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30"
            />
            <Textarea
              placeholder="Your message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              maxLength={1000}
              className="bg-background/40 border-border text-text-primary placeholder:text-text-secondary/70 min-h-[140px] rounded-xl focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-semibold shadow-[0_0_24px_-6px_hsl(var(--primary)/0.6)]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send message"
              )}
            </Button>
          </form>
        </div>
      </div>
    </PageContainer>
  );
};

export default About;
