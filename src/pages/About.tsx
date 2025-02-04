import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const handleContact = () => {
    window.location.href = "mailto:your-email@example.com?subject=Suggestion for Concert Site";
  };

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto text-center space-y-8 px-4 md:px-0">
        <Link 
          to="/"
          className="text-white hover:text-orange-500 transition-colors inline-flex items-center gap-2 text-lg mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Concerts
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">About CPH Concerts</h1>
        
        <div className="space-y-6 text-white/90">
          <p className="text-lg leading-relaxed">
            Welcome to CPH Concerts, your ultimate guide to live music events in Copenhagen. 
            We're passionate about connecting music lovers with amazing live performances 
            across the city.
          </p>
          
          <p className="text-lg leading-relaxed">
            Our platform helps you discover and keep track of concerts from various venues 
            throughout Copenhagen, making it easier than ever to experience live music in 
            the city.
          </p>

          <div className="bg-white/5 rounded-xl p-6 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">Features</h2>
            <ul className="space-y-3 text-left">
              <li className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span>Search and filter concerts by venue, date, and more</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span>Save your favorite concerts for quick access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500">•</span>
                <span>Get direct links to ticket sales</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleContact}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8"
          >
            <Mail className="mr-2 h-5 w-5" />
            Contact Us
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default About;