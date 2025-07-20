import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Footer, Navbar } from "./components";
import { About, Contact, Home, Projects } from "./pages";

const App = () => {
  return (
    <main className="bg-slate-300/20 min-h-screen flex flex-col">
      <Router>
        <Navbar />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </main>
  );
};

export default App;
