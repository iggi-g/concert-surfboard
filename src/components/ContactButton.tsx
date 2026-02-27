import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

export const ContactButton = () => {
  const navigate = useNavigate();

  const handleContact = () => {
    navigate('/about', { state: { scrollToContact: true } });
  };

  return null;









};