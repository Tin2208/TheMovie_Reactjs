import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Container from "./Layout/Container";
import Movie from "./pages/Movie";
import TVShows from "./pages/TVShows";
import Search from "./pages/Search";
import Peoples from "./pages/People";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/movies/popular" element={<Movie />} />
        <Route path="/movies/now-playing" element={<Movie />} />
        <Route path="/movies/upcoming" element={<Movie />} />
        <Route path="/movies/top-rated" element={<Movie />} />
        <Route path="/tv/popular" element={<TVShows />} />
        <Route path="/tv/airing-today" element={<TVShows />} />
        <Route path="/tv/on-the-air" element={<TVShows />} />
        <Route path="/tv/top-rated" element={<TVShows />} />
        <Route path="/search/:category" element={<Search />} />{" "}
        <Route path="/search" element={<Search />} />
        <Route path="/people/popular-people" element={<Peoples />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
