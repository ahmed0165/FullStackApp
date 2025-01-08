// favoritesSlice.ts
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
    addFavorite: (state, action: PayloadAction<Movie[]>) => {
      console.log("Adding favorites to Redux:", action.payload);
      state.movies = action.payload;
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.filter(
        (movie) => movie.imdbID !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
