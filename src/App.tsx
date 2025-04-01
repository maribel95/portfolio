import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "@styles/base.scss";
import { ThemeProvider } from "./context/ThemeContext";
function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <Navbar />
        <Hero />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
