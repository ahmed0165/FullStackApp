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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Search</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#3b82f6" size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="border p-2 rounded shadow">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
                alt={movie.Title}
                className="w-full h-48 object-cover mb-2"
              />
              <h2 className="text-lg font-bold">{movie.Title}</h2>
              <p>{movie.Year}</p>
              <button
                onClick={() => handleAddToFavorites(movie)}
                className="bg-green-500 text-white px-4 py-2 rounded mt-2"
              >
                Add to Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
