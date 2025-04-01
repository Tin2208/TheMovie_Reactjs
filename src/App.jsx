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
  const moviesRoute = ["popular", "now-playing", "upcoming", "top-rated"];
  const tvShowsRoute = ["popular", "airing-today", "on-the-air", "top-rated"];
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Container />} />

        {/*Movie Routes*/}
        {moviesRoute.map((route) => (
          <Route key={route} path={`/${route}`} element={<Movie />} />
        ))}

        {/*Tv Routes*/}
        {tvShowsRoute.map((route) => (
          <Route key={route} path={`/${route}`} element={<TVShows />} />
        ))}

        {/*Search Routes*/}
        <Route path="/search/:category" element={<Search />} />
        <Route path="/search" element={<Search />} />

        {/*People Routes*/}
        <Route path="/people/popular-people" element={<Peoples />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
