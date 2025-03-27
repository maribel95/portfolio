import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import "@styles/base.scss";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;
