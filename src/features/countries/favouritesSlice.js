import { createSlice } from "@reduxjs/toolkit";

const favourites =
  localStorage.getItem("Favourites") !== null
    ? JSON.parse(localStorage.getItem("Favourites"))
    : [];

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: favourites,
  },
  reducers: {
    getFavourites(state, action) {
      localStorage.getItem("favourites", JSON.stringify(state.favourites));
    },

    addFavourites(state, action) {
      state.favourites = [...state.favourites, action.payload];
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
    clearFavourites(state, action) {
      localStorage.removeItem("favourites");
      state.favourites = [];
    },
  },
});

export const { getFavourites, addFavourites, clearFavourites } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
