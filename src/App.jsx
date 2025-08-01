import { ThemeProvider } from "./ThemeContext";
import Transly from "./Transly";


export default function App() {
  return (
    <ThemeProvider>
      <Transly />
    </ThemeProvider>
  );
}
