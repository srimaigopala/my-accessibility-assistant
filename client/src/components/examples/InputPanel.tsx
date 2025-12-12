import InputPanel from "../InputPanel";

export default function InputPanelExample() {
  return (
    <div className="h-[600px]">
      <InputPanel
        onTextInput={(text) => console.log("Text input:", text)}
        onFileUpload={(file, type) => console.log("File uploaded:", file.name, type)}
        onVoiceInput={(text) => console.log("Voice input:", text)}
      />
    </div>
  );
}
