import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFavorite } from "../store/favoritesSlice";
import axios from "axios";
import { ClipLoader } from "react-spinners";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_OMDB_API_KEY
        }&s=${query}`
      );
      if (response.data.Search) {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleAddToFavorites = (movie: Movie) => {
    dispatch(addFavorite(movie));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Movie Search
      </h1>
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Search
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#3b82f6" size={60} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Poster"
                }
                alt={movie.Title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {movie.Title}
                </h2>
                <p className="text-gray-600 mb-4">{movie.Year}</p>
                <button
                  onClick={() => handleAddToFavorites(movie)}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Add to Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && movies.length === 0 && (
        <div className="text-center text-gray-600 mt-8">
          No movies found. Try another search!
        </div>
      )}
    </div>
  );
};

export default SearchPage;
