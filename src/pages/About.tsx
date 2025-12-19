import { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase-client";
import { SEO } from "@/components/SEO";

const About = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (location.state?.scrollToContact) {
      const contactForm = document.querySelector('#contact-form');
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <SEO 
        title="About CPH Concerts"
        description="Learn about CPH Concerts - your guide to live music in Copenhagen. Contact us to suggest venues or provide feedback about Copenhagen's music scene."
        canonicalUrl="/about"
      />
      <div className="max-w-2xl mx-auto text-center space-y-6 px-4 md:px-0">
        <Link
          to="/"
          className="text-white hover:text-orange-500 transition-colors inline-flex items-center gap-2 text-lg"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Concerts
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white">
          About ConcertsCPH
        </h1>

        <div className="space-y-4 text-white/90">
          <p className="text-lg leading-relaxed">
            Hi! I am Igor, and I made this website because I wanted to have a full overview of all the fantastic live music and concerts in Copenhagen.
            ConcertCPH is a non-profit website, made for everyone to enjoy. 
          </p>
        </div>

        <div id="contact-form" className="mt-8">
          <p className="text-lg text-white mb-2">
            Am I missing a venue that you want me to add? Or do you have any feedback? Write me here below!
          </p>
          <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="bg-white/10 border-white/10 text-white placeholder:text-white/50"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="bg-white/10 border-white/10 text-white placeholder:text-white/50"
              />
            </div>
            <div>
              <Textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                className="bg-white/10 border-white/10 text-white placeholder:text-white/50 min-h-[120px]"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </div>
      </div>
    </PageContainer>
  );
};

export default About;