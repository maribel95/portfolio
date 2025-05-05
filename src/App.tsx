import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CV from "./components/CV";
import ScrollToTop from "./components/ScrollToTop";
import Projects from "@components/Projects";
import About from "@components/About";
import "@styles/base.scss";
import { ThemeProvider } from "./context/ThemeContext";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
