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
    initializeFavourites(state, action) {
      state.favourites = JSON.parse(localStorage.getItem("favourites"));
    },

    addFavourites(state, action) {
      state.favourites = [...state.favourites, action.payload];
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
    removeFavourites(state, action) {
      const newArray = [...state.favourites];
      newArray.splice(
        newArray.findIndex((e) => e === action.payload),
        1
      );
      console.log("remaining countries", newArray);
      //localStorage.removeItem("favourites");
      state.favourites = [...newArray];
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },

    clearFavourites(state, action) {
      localStorage.removeItem("Favourites");
      state.favourites = [];
    },
  },
});

export const {
  initializeFavourites,
  addFavourites,
  clearFavourites,
  removeFavourites,
} = favouritesSlice.actions;

export default favouritesSlice.reducer;
