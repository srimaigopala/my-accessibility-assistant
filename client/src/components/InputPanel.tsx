import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Image, Upload, Mic, MicOff, X, Sparkles } from "lucide-react";

interface InputPanelProps {
  onTextInput: (text: string) => void;
  onFileUpload: (file: File, type: "pdf" | "image") => void;
  onVoiceInput: (text: string) => void;
}

export default function InputPanel({ onTextInput, onFileUpload, onVoiceInput }: InputPanelProps) {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleTextSubmit = () => {
    if (text.trim()) {
      onTextInput(text.trim());
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: "pdf" | "image") => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      onFileUpload(file, type);
    }
  };

  const handleVoiceToggle = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      console.log("Speech recognition not supported");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      onVoiceInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const clearUploadedFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  return (
    <Card className="h-full flex flex-col border-card-border">
      <CardHeader className="flex-shrink-0 pb-4">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2.5 text-lg">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Upload className="w-4 h-4 text-primary" aria-hidden="true" />
            </div>
            Input Content
          </CardTitle>
          <Badge variant="secondary" className="text-xs">Step 1</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-5">
        <div className="flex-1 flex flex-col gap-3">
          <label htmlFor="text-input" className="text-sm font-medium text-muted-foreground">
            Paste or type text
          </label>
          <Textarea
            id="text-input"
            placeholder="Enter text here to simplify, summarize, or ask questions about..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 min-h-[120px] text-base resize-none border-2 focus:border-primary/50 transition-colors"
            data-testid="textarea-content-input"
          />
          <Button 
            onClick={handleTextSubmit} 
            disabled={!text.trim()}
            className="w-full shadow-lg shadow-primary/20"
            data-testid="button-submit-text"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Process with AI
          </Button>
        </div>

        <div className="border-t border-border pt-5 space-y-4">
          <p className="text-sm font-medium text-muted-foreground">Or upload a file</p>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, "pdf")}
                className="hidden"
                id="pdf-upload"
                aria-label="Upload PDF file"
              />
              <Button
                variant="outline"
                className="w-full h-20 flex-col gap-1.5 border-2 border-dashed hover:border-primary/50 hover:bg-primary/5 transition-colors"
                onClick={() => fileInputRef.current?.click()}
                data-testid="button-upload-pdf"
              >
                <FileText className="w-5 h-5 text-chart-4" aria-hidden="true" />
                <span className="text-sm">PDF</span>
              </Button>
            </div>

            <div>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "image")}
                className="hidden"
                id="image-upload"
                aria-label="Upload image file"
              />
              <Button
                variant="outline"
                className="w-full h-20 flex-col gap-1.5 border-2 border-dashed hover:border-chart-2/50 hover:bg-chart-2/5 transition-colors"
                onClick={() => imageInputRef.current?.click()}
                data-testid="button-upload-image"
              >
                <Image className="w-5 h-5 text-chart-2" aria-hidden="true" />
                <span className="text-sm">Image</span>
              </Button>
            </div>
          </div>

          {uploadedFile && (
            <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm truncate flex-1 font-medium">{uploadedFile.name}</span>
              <Button
                size="icon"
                variant="ghost"
                onClick={clearUploadedFile}
                aria-label="Remove uploaded file"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="border-t border-border pt-5">
          <p className="text-sm font-medium text-muted-foreground mb-3">Or use voice input</p>
          <Button
            variant={isListening ? "destructive" : "secondary"}
            className={`w-full h-12 ${isListening ? "animate-pulse" : ""}`}
            onClick={handleVoiceToggle}
            data-testid="button-voice-input"
          >
            {isListening ? (
              <>
                <MicOff className="w-5 h-5 mr-2" aria-hidden="true" />
                Stop Listening
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 mr-2" aria-hidden="true" />
                Start Voice Input
              </>
            )}
          </Button>
          {isListening && (
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              <p className="text-sm text-muted-foreground">Listening...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
