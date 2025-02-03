import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const handleContact = () => {
    window.location.href = "mailto:your-email@example.com?subject=Suggestion for Concert Site";
  };

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <Link 
          to="/"
          className="text-white hover:text-orange-500 transition-colors inline-block mb-8"
        >
          ← Back to Concerts
        </Link>
        
        <h1 className="text-4xl font-bold text-white mb-4">About CPH Concerts</h1>
        
        <div className="space-y-4 text-white/90">
          <p>
            Welcome to CPH Concerts, your ultimate guide to live music events in Copenhagen. 
            We're passionate about connecting music lovers with amazing live performances 
            across the city.
          </p>
          
          <p>
            Our platform helps you discover and keep track of concerts from various venues 
            throughout Copenhagen, making it easier than ever to experience live music in 
            the city.
          </p>
        </div>

        <div className="mt-8">
          <Button
            onClick={handleContact}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Mail className="mr-2 h-4 w-4" />
            Contact Us
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default About;