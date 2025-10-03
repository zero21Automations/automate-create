import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DNALockToggleProps {
  projectId: string;
  dnaLocked: boolean;
  onUpdate: () => void;
}

export const DNALockToggle = ({ projectId, dnaLocked, onUpdate }: DNALockToggleProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLockDNA = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          dna_locked: true,
          dna_locked_at: new Date().toISOString()
        })
        .eq('id', projectId);

      if (error) throw error;

      toast({
        title: "DNA Locked",
        description: "Factory automation is now enabled. The pipeline will run end-to-end automatically.",
      });

      onUpdate();
    } catch (error: any) {
      console.error('Error locking DNA:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (dnaLocked) {
    return (
      <div className="flex items-center gap-2">
        <Badge className="bg-primary/10 text-primary border-primary/20">
          <Lock className="h-3 w-3 mr-1" />
          DNA Locked
        </Badge>
        <p className="text-sm text-muted-foreground">
          Project DNA is locked. Factory runs automatically.
        </p>
      </div>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="factory" disabled={loading}>
          <Lock className="h-4 w-4 mr-2" />
          Lock DNA & Enable Auto-Mode
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Lock Project DNA?
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4 text-left">
            <p>
              Locking the project DNA will enable <strong>full factory automation</strong>. 
              This action is <strong>irreversible</strong>.
            </p>
            
            <div className="bg-muted p-4 rounded-md space-y-2">
              <p className="font-medium text-foreground">What happens next:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Project settings become read-only</li>
                <li>Ideas automatically flow through all stages</li>
                <li>Content generation runs end-to-end</li>
                <li>Human checkpoints are optional (configurable)</li>
                <li>Videos are auto-published based on schedule</li>
              </ul>
            </div>

            <p className="text-sm">
              Make sure your brand kit, posting rules, and automation settings are 
              configured correctly before locking.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLockDNA} disabled={loading}>
            <Lock className="h-4 w-4 mr-2" />
            Lock DNA & Start Factory
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
