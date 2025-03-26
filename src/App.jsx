import Container from "./components/Container";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Movie from "./components/Movie";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/movies/popular" element={<Movie />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
