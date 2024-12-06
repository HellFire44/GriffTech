import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Contact from './layouts/Contact/Contact';
import Footer from './layouts/Footer/Footer';
import Home from './layouts/Home/Home';
import Portfolio from './layouts/Portfolio/Portfolio';
import Services from './layouts/Services/Services';

function App() {
  return (
    <div className="main">
      <Navbar/>
        <Home />
        <Services />
        <Portfolio />
        <Contact />
        <Footer />
    </div>
  );
}

export default App;
