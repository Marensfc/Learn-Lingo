import { createSlice } from '@reduxjs/toolkit';

const FILTERS_INITIAL_STATE = {
  language: 'French',
  level: 'A1 Beginner',
  price_per_hour: 30,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: FILTERS_INITIAL_STATE,
  reducers: {
    resetFilters(state) {
      state.language = 'All';
      state.level = 'All';
      state.price_per_hour = 'All';
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
    setLevel(state, action) {
      state.level = action.payload;
    },
    setPricePerHour(state, action) {
      state.price_per_hour = action.payload;
    },
  },
});

export const { resetFilters, setLanguage, setLevel, setPricePerHour } =
  filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
