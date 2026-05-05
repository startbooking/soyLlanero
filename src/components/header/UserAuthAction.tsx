import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserMenu } from "../dashboard/UserMenu";
import { AuthModal } from "../AuthModal";
import { cn } from "@/lib/utils";

interface UserAuthActionProps {
  className?: string;
  showIconOnly?: boolean;
}

export const UserAuthAction = ({ className, showIconOnly = false }: UserAuthActionProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <UserMenu />;
  }

  return (
    <>
      <Button
        variant="default"
        size="sm"
        onClick={() => setShowAuthModal(true)}
        className={cn(
          "w-full h-10 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all",
          "text-slate hover:bg-slate-50/80", // Estilo Premium
          showIconOnly ? "px-3" : "px-6",
          className
        )}
      >
        <LogIn className={cn("w-3.5 h-3.5 text-slate", !showIconOnly && "mr-2")} />
        {!showIconOnly && <span>Ingresar</span>}
      </Button>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};