import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, FileText, MessageSquare, Image, Volume2, Send, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ResultsPanelProps {
  simplifiedText: string;
  summary: string;
  explanation: string;
  altText: string;
  isProcessing: boolean;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onReadAloud: (text: string) => void;
}

export default function ResultsPanel({
  simplifiedText,
  summary,
  explanation,
  altText,
  isProcessing,
  messages,
  onSendMessage,
  onReadAloud,
}: ResultsPanelProps) {
  const [chatInput, setChatInput] = useState("");

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      onSendMessage(chatInput.trim());
      setChatInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderReadAloudButton = (text: string) => (
    <Button
      size="sm"
      variant="outline"
      onClick={() => onReadAloud(text)}
      disabled={!text}
      className="mt-4"
      data-testid="button-read-aloud"
    >
      <Volume2 className="w-4 h-4 mr-2" aria-hidden="true" />
      Read Aloud
    </Button>
  );

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" aria-hidden="true" />
          AI Results
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <Tabs defaultValue="simplified" className="h-full flex flex-col">
          <TabsList className="grid grid-cols-4 mb-4 flex-shrink-0">
            <TabsTrigger value="simplified" data-testid="tab-simplified">
              <FileText className="w-4 h-4 md:mr-2" aria-hidden="true" />
              <span className="hidden md:inline">Simple</span>
            </TabsTrigger>
            <TabsTrigger value="summary" data-testid="tab-summary">
              <FileText className="w-4 h-4 md:mr-2" aria-hidden="true" />
              <span className="hidden md:inline">Summary</span>
            </TabsTrigger>
            <TabsTrigger value="alttext" data-testid="tab-alttext">
              <Image className="w-4 h-4 md:mr-2" aria-hidden="true" />
              <span className="hidden md:inline">Alt Text</span>
            </TabsTrigger>
            <TabsTrigger value="chat" data-testid="tab-chat">
              <MessageSquare className="w-4 h-4 md:mr-2" aria-hidden="true" />
              <span className="hidden md:inline">Q&A</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="simplified" className="h-full m-0">
              <ScrollArea className="h-full pr-4">
                {isProcessing ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : simplifiedText ? (
                  <div>
                    <h4 className="font-medium mb-3">Simplified Text</h4>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {simplifiedText}
                    </p>
                    {renderReadAloudButton(simplifiedText)}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Simplified text will appear here after processing.
                  </p>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="summary" className="h-full m-0">
              <ScrollArea className="h-full pr-4">
                {isProcessing ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    {summary && (
                      <div>
                        <h4 className="font-medium mb-3">Summary</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {summary}
                        </p>
                        {renderReadAloudButton(summary)}
                      </div>
                    )}
                    {explanation && (
                      <div>
                        <h4 className="font-medium mb-3">Detailed Explanation</h4>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {explanation}
                        </p>
                        {renderReadAloudButton(explanation)}
                      </div>
                    )}
                    {!summary && !explanation && (
                      <p className="text-muted-foreground">
                        Summary and explanation will appear here after processing.
                      </p>
                    )}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="alttext" className="h-full m-0">
              <ScrollArea className="h-full pr-4">
                {isProcessing ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : altText ? (
                  <div>
                    <h4 className="font-medium mb-3">Image Description</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {altText}
                    </p>
                    {renderReadAloudButton(altText)}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Upload an image to generate alt-text and descriptions.
                  </p>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="chat" className="h-full m-0 flex flex-col">
              <ScrollArea className="flex-1 pr-4 mb-4">
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Ask questions about your content here.
                    </p>
                  ) : (
                    messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                          data-testid={`message-${message.role}-${index}`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-muted p-3 rounded-lg">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="flex gap-2 flex-shrink-0">
                <Textarea
                  placeholder="Ask a question about the content..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-[60px] resize-none"
                  data-testid="textarea-chat-input"
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim() || isProcessing}
                  aria-label="Send message"
                  data-testid="button-send-message"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
