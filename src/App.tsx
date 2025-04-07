import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Background from "./components/Background";
import "@styles/base.scss";
import { ThemeProvider } from "./context/ThemeContext";
function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <Background />
        <Navbar />
      </div>
    </ThemeProvider>
  );
}

export default App;
