import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Image, Eye } from "lucide-react";

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
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <Eye className="w-16 h-16 mb-4 opacity-50" aria-hidden="true" />
          <p className="text-lg font-medium">No content to preview</p>
          <p className="text-sm">Upload a file or enter text to see a preview</p>
        </div>
      );
    }

    if (contentType === "image" && imageUrl) {
      return (
        <div className="flex flex-col gap-4">
          {fileName && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Image className="w-4 h-4" aria-hidden="true" />
              <span>{fileName}</span>
            </div>
          )}
          <div className="relative rounded-lg overflow-hidden bg-muted">
            <img
              src={imageUrl}
              alt="Uploaded image preview"
              className="w-full h-auto max-h-[400px] object-contain mx-auto"
            />
          </div>
          {content && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Extracted Text (OCR)</h4>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm whitespace-pre-wrap">{content}</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        {fileName && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="w-4 h-4" aria-hidden="true" />
            <span>{fileName}</span>
          </div>
        )}
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
        </div>
      </div>
    );
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" aria-hidden="true" />
          Content Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          {renderContent()}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
