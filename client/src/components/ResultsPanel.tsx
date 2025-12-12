import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Sparkles, FileText, MessageSquare, Image, Volume2, Send, Loader2, Wand2, ListChecks } from "lucide-react";

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
      variant="secondary"
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
    <Card className="h-full flex flex-col border-card-border">
      <CardHeader className="flex-shrink-0 pb-4">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2.5 text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
            </div>
            AI Results
          </CardTitle>
          <Badge variant="secondary" className="text-xs">Step 3</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <Tabs defaultValue="simplified" className="h-full flex flex-col">
          <TabsList className="grid grid-cols-4 mb-4 flex-shrink-0 h-10">
            <TabsTrigger value="simplified" data-testid="tab-simplified" className="text-xs">
              <Wand2 className="w-4 h-4 md:mr-1.5" aria-hidden="true" />
              <span className="hidden md:inline">Simple</span>
            </TabsTrigger>
            <TabsTrigger value="summary" data-testid="tab-summary" className="text-xs">
              <ListChecks className="w-4 h-4 md:mr-1.5" aria-hidden="true" />
              <span className="hidden md:inline">Summary</span>
            </TabsTrigger>
            <TabsTrigger value="alttext" data-testid="tab-alttext" className="text-xs">
              <Image className="w-4 h-4 md:mr-1.5" aria-hidden="true" />
              <span className="hidden md:inline">Alt Text</span>
            </TabsTrigger>
            <TabsTrigger value="chat" data-testid="tab-chat" className="text-xs">
              <MessageSquare className="w-4 h-4 md:mr-1.5" aria-hidden="true" />
              <span className="hidden md:inline">Q&A</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="simplified" className="h-full m-0">
              <ScrollArea className="h-full pr-4">
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center h-32 gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Simplifying text...</p>
                  </div>
                ) : simplifiedText ? (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs">AI Generated</Badge>
                    </div>
                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
                      <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                        {simplifiedText}
                      </p>
                    </div>
                    {renderReadAloudButton(simplifiedText)}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                    <Wand2 className="w-8 h-8 mb-3 opacity-40" />
                    <p className="text-sm text-center">Simplified text will appear here after processing</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="summary" className="h-full m-0">
              <ScrollArea className="h-full pr-4">
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center h-32 gap-3">
                    <div className="w-12 h-12 rounded-xl bg-chart-3/10 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-chart-3" />
                    </div>
                    <p className="text-sm text-muted-foreground">Generating summary...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {summary && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">Quick Summary</Badge>
                        </div>
                        <div className="p-4 bg-chart-3/5 border border-chart-3/10 rounded-xl">
                          <p className="text-foreground leading-relaxed">
                            {summary}
                          </p>
                        </div>
                        {renderReadAloudButton(summary)}
                      </div>
                    )}
                    {explanation && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">Detailed</Badge>
                        </div>
                        <div className="p-4 bg-muted/50 border border-border rounded-xl">
                          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                            {explanation}
                          </p>
                        </div>
                        {renderReadAloudButton(explanation)}
                      </div>
                    )}
                    {!summary && !explanation && (
                      <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                        <ListChecks className="w-8 h-8 mb-3 opacity-40" />
                        <p className="text-sm text-center">Summary will appear here after processing</p>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="alttext" className="h-full m-0">
              <ScrollArea className="h-full pr-4">
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center h-32 gap-3">
                    <div className="w-12 h-12 rounded-xl bg-chart-2/10 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-chart-2" />
                    </div>
                    <p className="text-sm text-muted-foreground">Analyzing image...</p>
                  </div>
                ) : altText ? (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs">Image Description</Badge>
                    </div>
                    <div className="p-4 bg-chart-2/5 border border-chart-2/10 rounded-xl">
                      <p className="text-foreground leading-relaxed">
                        {altText}
                      </p>
                    </div>
                    {renderReadAloudButton(altText)}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                    <Image className="w-8 h-8 mb-3 opacity-40" />
                    <p className="text-sm text-center">Upload an image to generate descriptions</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="chat" className="h-full m-0 flex flex-col">
              <ScrollArea className="flex-1 pr-4 mb-4">
                <div className="space-y-3">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                      <MessageSquare className="w-8 h-8 mb-3 opacity-40" />
                      <p className="text-sm text-center">Ask questions about your content</p>
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] p-3.5 rounded-xl ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground rounded-br-md"
                              : "bg-muted rounded-bl-md"
                          }`}
                          data-testid={`message-${message.role}-${index}`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-muted p-3.5 rounded-xl rounded-bl-md">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm text-muted-foreground">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="flex gap-2 flex-shrink-0">
                <Textarea
                  placeholder="Ask a question..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-[50px] resize-none border-2 focus:border-primary/50"
                  data-testid="textarea-chat-input"
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim() || isProcessing}
                  aria-label="Send message"
                  data-testid="button-send-message"
                  className="h-auto shadow-lg shadow-primary/20"
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
