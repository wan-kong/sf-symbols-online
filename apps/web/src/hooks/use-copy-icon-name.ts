import { useCallback, useState } from "react";
import { toast } from "sonner";

export function useCopyIconName() {
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const copyToClipboard = useCallback((iconName: string) => {
    navigator.clipboard
      .writeText(iconName)
      .then(() => {
        setCopiedName(iconName);
        toast.success(`Copied "${iconName}"`);
        // Reset after 2 seconds
        setTimeout(() => setCopiedName(null), 2000);
      })
      .catch(() => {
        toast.error("Failed to copy");
      });
  }, []);

  return { copiedName, copyToClipboard };
}
