import Header from "../Header";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function HeaderExample() {
  return (
    <ThemeProvider>
      <Header onSettingsClick={() => console.log("Settings clicked")} />
    </ThemeProvider>
  );
}
