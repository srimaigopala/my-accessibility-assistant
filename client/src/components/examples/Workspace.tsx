import Workspace from "../Workspace";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";

export default function WorkspaceExample() {
  return (
    <AccessibilityProvider>
      <div className="h-[700px] bg-muted/30">
        <Workspace />
      </div>
    </AccessibilityProvider>
  );
}
