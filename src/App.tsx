import Header from "./components/Header";
import Hero from "./components/Hero";
import ParticlesBackground from "./components/ParticlesBackground";
import "./styles/App.scss";

function App() {
  return (
    <div className="app-container">
      <ParticlesBackground />
      <Header />
      <Hero />
    </div>
  );
}

export default App;
