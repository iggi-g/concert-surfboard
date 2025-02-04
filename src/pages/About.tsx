import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase-client";

const About = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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
      <div className="max-w-2xl mx-auto text-center space-y-6 px-4 md:px-0">
        <Link
          to="/"
          className="text-white hover:text-orange-500 transition-colors inline-flex items-center gap-2 text-lg"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Concerts
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white">
          About CPH Concerts
        </h1>

        <div className="space-y-4 text-white/90">
          <p className="text-lg leading-relaxed">
            Welcome to ConcertsCPH, your ultimate guide to live music events in Copenhagen.
            We're passionate about connecting music lovers with amazing live performances across the city.
          </p>

          <p className="text-lg leading-relaxed">
            Our platform helps you discover and keep track of concerts from various venues throughout Copenhagen,
            making it easier than ever to experience the vibrant and diverse world of live music in the Danish capital.
          </p>

          <p className="text-lg leading-relaxed">
            Concerts in Copenhagen are a celebration of culture, creativity, and community. Whether you are
            seeking intimate gigs in cozy jazz clubs or large-scale concerts featuring international stars,
            Copenhagen offers an eclectic mix that appeals to all music enthusiasts.
          </p>
          <p className="text-lg leading-relaxed">
            Experience the best of live music in Copenhagen—from rock and pop to classical and electronic genres.
            Our comprehensive guide ensures you are always updated on upcoming events, exclusive festivals,
            and hidden musical gems that make the city a top destination for live entertainment.
          </p>
          <p className="text-lg leading-relaxed">
            Dive into the world of Copenhagen concerts and immerse yourself in the local music scene.
            Discover concert venues that blend modern design with historical charm, and enjoy curated
            experiences that showcase the rich musical heritage of this vibrant city.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
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