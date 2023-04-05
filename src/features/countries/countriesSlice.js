import { createSlice } from "@reduxjs/toolkit";
import { getAllCountries } from "../../services/countries";

export const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    isLoading: true,
  },
  reducers: {
    saveCountries(state, action) {
      state.countries = action.payload;
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const initializeCountries = () => {
  return async (dispatch) => {
    const countries = await getAllCountries();
    dispatch(saveCountries(countries));
    dispatch(isLoading(false));
  };
};

export const { saveCountries, isLoading } = countriesSlice.actions;
export default countriesSlice.reducer;
