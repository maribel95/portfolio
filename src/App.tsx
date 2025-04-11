import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CV from "./components/CV";
import Background from "./components/Background";
import "@styles/base.scss";
import { ThemeProvider } from "./context/ThemeContext";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/cv" element={<CV />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
