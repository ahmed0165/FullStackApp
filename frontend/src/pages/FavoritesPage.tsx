import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeFavorite } from "../store/favoritesSlice";

const FavoritesPage: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.movies);
  const dispatch = useDispatch();

  const handleRemove = (imdbID: string) => {
    dispatch(removeFavorite(imdbID));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorite Movies</h1>
      {favorites.length === 0 ? (
        <p>No favorite movies added yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="border p-2 rounded shadow">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
                alt={movie.Title}
                className="w-full h-48 object-cover mb-2"
              />
              <h2 className="text-lg font-bold">{movie.Title}</h2>
              <p>{movie.Year}</p>
              <button
                onClick={() => handleRemove(movie.imdbID)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
