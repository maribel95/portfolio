import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "@styles/base.scss";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;
