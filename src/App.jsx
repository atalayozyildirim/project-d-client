import "./App.css";
import Hero from "./components/Button/Hero";
import About from "./components/About/about";
import Services from "./components/MainComp/Services";
import Counter from "./components/Button/Counter";
import Portfolio from "./components/Button/Portfolio";
import Testimonials from "./components/MainComp/Testimonials";
import Blog from "./components/Blog/Blog";
import Contact from "./components/Contact/Contact";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Counter />
      <Portfolio />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  );
}

export default App;
