import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export const ContactButton = () => {
  const handleContact = () => {
    window.location.href = "mailto:your-email@example.com?subject=Suggestion for Concert Site";
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