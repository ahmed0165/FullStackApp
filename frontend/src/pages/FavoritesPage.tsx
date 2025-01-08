import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { RootState } from "../store/store";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";

const API_BASE_URL = "http://localhost:3000";
const FavoritesPage: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/movies/favorites`);
        console.log("Fetched favorites response:", response);
        if (response.data) {
          dispatch(addFavorite(response.data)); // Ensure data is passed correctly
        } else {
          console.error("No data found");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [dispatch]);

  console.log("Favorites from Redux state:", favorites); // Log favorites from Redux

  const handleRemove = async (imdbID: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/movies/favorites/${imdbID}`);
      dispatch(removeFavorite(imdbID));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Favorite Movies
      </h1>
      {favorites.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-xl">No favorite movies added yet.</p>
          <p className="mt-2">Start adding movies to see them here!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {favorites.map((movie) => (
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
                  onClick={() => handleRemove(movie.imdbID)}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
