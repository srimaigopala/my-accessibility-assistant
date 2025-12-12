import { useState, useCallback } from "react";
import InputPanel from "./InputPanel";
import PreviewPanel from "./PreviewPanel";
import ResultsPanel from "./ResultsPanel";
import { useAccessibility } from "@/contexts/AccessibilityContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Workspace() {
  const { settings } = useAccessibility();
  const [contentType, setContentType] = useState<"text" | "pdf" | "image" | null>(null);
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [fileName, setFileName] = useState<string | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [simplifiedText, setSimplifiedText] = useState("");
  const [summary, setSummary] = useState("");
  const [explanation, setExplanation] = useState("");
  const [altText, setAltText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  // todo: remove mock functionality - replace with actual API calls
  const simulateAIProcessing = useCallback(async (text: string, type: "text" | "pdf" | "image") => {
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (type === "text" || type === "pdf") {
      setSimplifiedText(
        `Here is a simpler version:\n\n${text.substring(0, 200)}...`
      );
      setSummary(
        "This content discusses important topics that are relevant to the subject matter."
      );
      setExplanation(
        "The content explains various aspects and provides detailed information about the topic. Key points include:\n\n• Main concept explanation\n• Supporting details\n• Practical applications"
      );
    }

    if (type === "image") {
      setAltText(
        "This image shows visual content that has been analyzed. The AI detected various elements including text, objects, and layout components that can help users understand the image content."
      );
    }

    setIsProcessing(false);
  }, []);

  const handleTextInput = useCallback((text: string) => {
    setContentType("text");
    setContent(text);
    setImageUrl(undefined);
    setFileName(undefined);
    simulateAIProcessing(text, "text");
  }, [simulateAIProcessing]);

  const handleFileUpload = useCallback((file: File, type: "pdf" | "image") => {
    setContentType(type);
    setFileName(file.name);

    if (type === "image") {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setContent("Extracting text from image...");
      
      // Simulate OCR
      setTimeout(() => {
        setContent("Sample extracted text from the uploaded image. This would normally come from OCR processing.");
      }, 1000);
    } else {
      setImageUrl(undefined);
      setContent("Extracting text from PDF...");
      
      // Simulate PDF extraction
      setTimeout(() => {
        setContent("Sample extracted text from the uploaded PDF document. This would normally come from PDF.js processing.");
      }, 1000);
    }

    simulateAIProcessing("extracted content", type);
  }, [simulateAIProcessing]);

  const handleVoiceInput = useCallback((text: string) => {
    setContentType("text");
    setContent(text);
    setImageUrl(undefined);
    setFileName(undefined);
    simulateAIProcessing(text, "text");
  }, [simulateAIProcessing]);

  const handleSendMessage = useCallback((message: string) => {
    setMessages(prev => [...prev, { role: "user", content: message }]);
    setIsProcessing(true);

    // todo: remove mock functionality
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: `Based on the content you provided, here's my answer to "${message}": The content contains relevant information that addresses your question. If you need more specific details, please let me know.`,
        },
      ]);
      setIsProcessing(false);
    }, 1500);
  }, []);

  const handleReadAloud = useCallback((text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = settings.voiceSpeed;
      utterance.pitch = settings.voicePitch;
      window.speechSynthesis.speak(utterance);
    }
  }, [settings.voiceSpeed, settings.voicePitch]);

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      <div className="lg:col-span-1 min-h-[400px] lg:min-h-0">
        <InputPanel
          onTextInput={handleTextInput}
          onFileUpload={handleFileUpload}
          onVoiceInput={handleVoiceInput}
        />
      </div>
      <div className="lg:col-span-1 min-h-[400px] lg:min-h-0">
        <PreviewPanel
          contentType={contentType}
          content={content}
          imageUrl={imageUrl}
          fileName={fileName}
        />
      </div>
      <div className="lg:col-span-1 min-h-[400px] lg:min-h-0">
        <ResultsPanel
          simplifiedText={simplifiedText}
          summary={summary}
          explanation={explanation}
          altText={altText}
          isProcessing={isProcessing}
          messages={messages}
          onSendMessage={handleSendMessage}
          onReadAloud={handleReadAloud}
        />
      </div>
    </div>
  );
}
