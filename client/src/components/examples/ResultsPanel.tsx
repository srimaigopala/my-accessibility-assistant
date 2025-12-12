import { useState } from "react";
import ResultsPanel from "../ResultsPanel";

export default function ResultsPanelExample() {
  // todo: remove mock functionality
  const [messages, setMessages] = useState([
    { role: "user" as const, content: "What is this document about?" },
    { role: "assistant" as const, content: "This document discusses the importance of digital accessibility and how it benefits all users, particularly those with disabilities such as visual impairments, cognitive disabilities, and motor impairments." },
  ]);

  const mockSimplified = "Digital content should be easy to use for everyone. This includes people who cannot see well and use special software to read screens. It also includes people who need simpler words and those who cannot use a mouse.";
  
  const mockSummary = "The document emphasizes the importance of making digital content accessible to all users, including those with various disabilities.";
  
  const mockExplanation = "Accessibility in digital content means designing websites, apps, and documents so that people with disabilities can use them effectively. This includes:\n\n• Screen reader compatibility for visually impaired users\n• Simplified text options for cognitive accessibility\n• Keyboard navigation for motor impairments";

  return (
    <div className="h-[600px]">
      <ResultsPanel
        simplifiedText={mockSimplified}
        summary={mockSummary}
        explanation={mockExplanation}
        altText=""
        isProcessing={false}
        messages={messages}
        onSendMessage={(msg) => {
          setMessages([...messages, { role: "user", content: msg }]);
          console.log("Message sent:", msg);
        }}
        onReadAloud={(text) => console.log("Read aloud:", text)}
      />
    </div>
  );
}
