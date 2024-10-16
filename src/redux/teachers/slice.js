import { createSlice } from '@reduxjs/toolkit';
import { fetchTeachers, fetchFilteredTeachers } from './operations';

const TEACHERS_INITIAL_STATE = {
  items: [],
  allItems: [],
  isLoading: false,
  error: null,
  pagination: {
    totalPages: null,
  },
};

const teachersSlice = createSlice({
  name: 'teachers',
  initialState: TEACHERS_INITIAL_STATE,
  extraReducers: builder => {
    builder
      .addCase(fetchTeachers.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        if (action.payload.isFirstPage) {
          state.items = action.payload.items;
          state.pagination.totalPages = action.payload.totalPages;
        }
        if (!action.payload.isFirstPage) {
          state.items = state.items.concat(action.payload.items);
          state.pagination.totalPages = state.pagination.totalPages - 1;
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchFilteredTeachers.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchFilteredTeachers.fulfilled, (state, action) => {
        if (action.payload.isFirstPage) {
          state.allItems = action.payload.items;
          state.items = action.payload.items.slice(
            action.payload.startAt,
            action.payload.endAt
          );
          state.pagination.totalPages = action.payload.totalPages;
        }
        if (!action.payload.isFirstPage) {
          state.items = state.items.concat(
            state.allItems.slice(action.payload.startAt, action.payload.endAt)
          );
          state.pagination.totalPages -= 1;
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchFilteredTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const teachersReducer = teachersSlice.reducer;
