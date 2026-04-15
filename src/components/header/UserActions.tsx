
import { Button } from "@/components/ui/button";
import { Building, LogIn } from "lucide-react";

interface UserActionsProps {
  onAdminClick: () => void;
  onLoginClick: () => void;
}

export const UserActions = ({ onAdminClick, onLoginClick }: UserActionsProps) => {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center gap-2 hover:bg-green-tenue"
        onClick={onAdminClick}
      >
        <Building className="w-4 h-4" />
        <span className="hidden sm:inline">Admin</span>
      </Button>

      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center gap-2 hover:bg-green-tenue"
        onClick={onLoginClick}
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">Login</span>
      </Button>
    </div>
  );
};
