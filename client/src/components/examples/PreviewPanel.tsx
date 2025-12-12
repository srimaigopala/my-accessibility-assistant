import PreviewPanel from "../PreviewPanel";

export default function PreviewPanelExample() {
  // todo: remove mock functionality
  const mockText = `The accessibility of digital content is crucial for ensuring that all users, including those with disabilities, can interact with and benefit from technology. This includes people with visual impairments who may use screen readers, individuals with cognitive disabilities who need simplified text, and those with motor impairments who rely on keyboard navigation.

By implementing proper accessibility features, we can create a more inclusive digital environment that serves everyone equally.`;

  return (
    <div className="h-[500px]">
      <PreviewPanel
        contentType="text"
        content={mockText}
        fileName="sample-document.txt"
      />
    </div>
  );
}
