
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ContactButton = () => {
  const navigate = useNavigate();

  const handleContact = () => {
    navigate('/about', { state: { scrollToContact: true } });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-4 right-4 rounded-full h-10 w-10 bg-bg-elev/80 backdrop-blur-md border-border/50 text-foreground hover:bg-accent-1/10 hover:border-accent-1/30 hover:text-accent-1 shadow-sm transition-all duration-150 z-40"
      onClick={handleContact}
    >
      <MessageSquare className="h-4 w-4" />
    </Button>
  );
};
