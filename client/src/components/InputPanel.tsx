import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Image, Upload, Mic, MicOff, X } from "lucide-react";

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
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" aria-hidden="true" />
          Input Content
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-6">
        <div className="flex-1 flex flex-col gap-3">
          <label htmlFor="text-input" className="text-sm font-medium">
            Paste or type text
          </label>
          <Textarea
            id="text-input"
            placeholder="Enter text here to simplify, summarize, or ask questions about..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 min-h-[150px] text-base resize-none"
            data-testid="textarea-content-input"
          />
          <Button 
            onClick={handleTextSubmit} 
            disabled={!text.trim()}
            className="w-full"
            data-testid="button-submit-text"
          >
            Process Text
          </Button>
        </div>

        <div className="border-t border-border pt-6 space-y-4">
          <p className="text-sm font-medium">Or upload a file</p>
          
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
                className="w-full h-24 flex-col gap-2"
                onClick={() => fileInputRef.current?.click()}
                data-testid="button-upload-pdf"
              >
                <FileText className="w-6 h-6" aria-hidden="true" />
                <span>Upload PDF</span>
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
                className="w-full h-24 flex-col gap-2"
                onClick={() => imageInputRef.current?.click()}
                data-testid="button-upload-image"
              >
                <Image className="w-6 h-6" aria-hidden="true" />
                <span>Upload Image</span>
              </Button>
            </div>
          </div>

          {uploadedFile && (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm truncate flex-1">{uploadedFile.name}</span>
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

        <div className="border-t border-border pt-6">
          <p className="text-sm font-medium mb-3">Or use voice input</p>
          <Button
            variant={isListening ? "destructive" : "secondary"}
            className="w-full h-14"
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
            <p className="text-sm text-muted-foreground text-center mt-2 animate-pulse">
              Listening...
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
