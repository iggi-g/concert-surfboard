import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Callback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];

      if (token) {
        window.localStorage.setItem("spotify_token", token);
        toast({
          title: "Successfully connected to Spotify",
          description: "You can now browse concerts for your favorite artists!",
        });
        navigate("/");
      }
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse">Connecting to Spotify...</div>
    </div>
  );
};

export default Callback;