import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { FileText, Image, Eye, FileImage, FileType } from "lucide-react";

interface PreviewPanelProps {
  contentType: "text" | "pdf" | "image" | null;
  content: string;
  imageUrl?: string;
  fileName?: string;
}

export default function PreviewPanel({ contentType, content, imageUrl, fileName }: PreviewPanelProps) {
  const renderContent = () => {
    if (!contentType) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-12">
          <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-6">
            <Eye className="w-10 h-10 opacity-40" aria-hidden="true" />
          </div>
          <p className="text-lg font-medium mb-2">No content to preview</p>
          <p className="text-sm text-center max-w-xs">Upload a file or enter text in the input panel to see a preview here</p>
        </div>
      );
    }

    if (contentType === "image" && imageUrl) {
      return (
        <div className="flex flex-col gap-4">
          {fileName && (
            <div className="flex items-center gap-3 p-3 bg-chart-2/5 border border-chart-2/20 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-chart-2/10 flex items-center justify-center flex-shrink-0">
                <FileImage className="w-4 h-4 text-chart-2" />
              </div>
              <span className="text-sm font-medium truncate">{fileName}</span>
            </div>
          )}
          <div className="relative rounded-xl overflow-hidden bg-muted/50 border border-border">
            <img
              src={imageUrl}
              alt="Uploaded image preview"
              className="w-full h-auto max-h-[300px] object-contain mx-auto"
            />
          </div>
          {content && (
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs">OCR</Badge>
                <span className="text-sm font-medium">Extracted Text</span>
              </div>
              <div className="p-4 bg-muted/50 rounded-xl border border-border">
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{content}</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        {fileName && (
          <div className="flex items-center gap-3 p-3 bg-chart-4/5 border border-chart-4/20 rounded-lg">
            <div className="w-8 h-8 rounded-lg bg-chart-4/10 flex items-center justify-center flex-shrink-0">
              <FileType className="w-4 h-4 text-chart-4" />
            </div>
            <span className="text-sm font-medium truncate">{fileName}</span>
          </div>
        )}
        <div className="p-4 bg-background rounded-xl border border-border">
          <p className="whitespace-pre-wrap leading-relaxed text-foreground">{content}</p>
        </div>
      </div>
    );
  };

  return (
    <Card className="h-full flex flex-col border-card-border">
      <CardHeader className="flex-shrink-0 pb-4">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2.5 text-lg">
            <div className="w-8 h-8 rounded-lg bg-chart-2/10 flex items-center justify-center">
              <Eye className="w-4 h-4 text-chart-2" aria-hidden="true" />
            </div>
            Content Preview
          </CardTitle>
          <Badge variant="secondary" className="text-xs">Step 2</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          {renderContent()}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
