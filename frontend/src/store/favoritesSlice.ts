import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface FavoritesState {
  movies: Movie[];
}

const initialState: FavoritesState = {
  movies: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      if (
        !state.movies.some((movie) => movie.imdbID === action.payload.imdbID)
      ) {
        state.movies.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.filter(
        (movie) => movie.imdbID !== action.payload
      );
    },
    editFavorite: (state, action: PayloadAction<Movie>) => {
      const index = state.movies.findIndex(
        (movie) => movie.imdbID === action.payload.imdbID
      );
      if (index !== -1) {
        state.movies[index] = action.payload;
      }
    },
  },
});

export const { addFavorite, removeFavorite, editFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
