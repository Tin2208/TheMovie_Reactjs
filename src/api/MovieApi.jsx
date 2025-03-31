const API_KEY = "234e21b8f6a282a6624cf4404219df68"; 
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (endpoint, page = 1) => {
  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&region=VN&language=vi-VN&page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch movies");

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    throw new Error(error.message || "Failed to fetch data");
  }
};

export const fetchTrendingMovies = async (timeWindow = "day") => {
  return fetchMovies(`/trending/movie/${timeWindow}`);
};
