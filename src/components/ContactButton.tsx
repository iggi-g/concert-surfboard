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
      className="fixed bottom-4 right-4 rounded-full bg-white/10 border-white/10 text-white hover:bg-white/20"
      onClick={handleContact}
    >
      <MessageSquare className="h-4 w-4" />
    </Button>
  );
};