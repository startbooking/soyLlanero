import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export const PolicyModal = ({ open, onOpenChange, title, children }: PolicyModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[65vh] pr-4">
          <div className="prose prose-sm max-w-none text-foreground">
            {children}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};