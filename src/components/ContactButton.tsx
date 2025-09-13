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
      className="fixed bottom-4 right-4 rounded-full bg-surface-elevated/80 border-border/50 text-foreground hover:bg-surface-elevated hover:text-primary backdrop-blur-sm shadow-elevated"
      onClick={handleContact}
    >
      <MessageSquare className="h-4 w-4" />
    </Button>
  );
};