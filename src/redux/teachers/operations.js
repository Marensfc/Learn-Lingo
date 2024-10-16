import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTeachers = createAsyncThunk(
  'teachers/fetchAll',
  async (paginationParams, thunkApi) => {
    try {
      if (paginationParams.isFirstPage) {
        const allTeachers = await axios.get(
          `${REACT_APP_DATABASE_URL}/teachers.json`
        );

        const response = await axios.get(
          `${REACT_APP_DATABASE_URL}/teachers.json?orderBy="$key"&startAt="${paginationParams.startAt}"&endAt="${paginationParams.endAt}"`
        );

        return {
          items: Object.keys(response.data).map(key => response.data[key]),
          totalPages:
            Math.ceil(allTeachers.data.length / paginationParams.perPage) - 1,
          isFirstPage: paginationParams.isFirstPage,
        };
      } else {
        const response = await axios.get(
          `${REACT_APP_DATABASE_URL}/teachers.json?orderBy="$key"&startAt="${paginationParams.startAt}"&endAt="${paginationParams.endAt}"`
        );

        return {
          items: Object.keys(response.data).map(key => response.data[key]),
          isFirstPage: false,
        };
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchFilteredTeachers = createAsyncThunk(
  'teachers/fetchFilteredItems',
  async (paginationParams, thunkApi) => {
    if (paginationParams.isFirstPage) {
      const filters = {
        language: paginationParams.filters.language,
        level: paginationParams.filters.level,
        price_per_hour: paginationParams.filters.price_per_hour,
      };

      const allTeachers = await axios.get(
        `${REACT_APP_DATABASE_URL}/teachers.json`
      );

      const filteredTeachers = allTeachers.data.filter(
        teacher =>
          (teacher.languages.includes(filters.language) ||
            filters.language === 'All') &&
          (teacher.levels.includes(filters.level) || filters.level === 'All') &&
          (teacher.price_per_hour <= filters.price_per_hour ||
            filters.price_per_hour === 'All')
      );

      return {
        items: filteredTeachers,
        startAt: paginationParams.startAt,
        endAt: paginationParams.endAt,
        totalPages:
          Math.ceil(filteredTeachers.length / paginationParams.perPage) - 1,
        isFirstPage: paginationParams.isFirstPage,
      };
    }
    if (!paginationParams.isFirstPage) {
      return {
        startAt: paginationParams.startAt,
        endAt: paginationParams.endAt,
        isFirstPage: false,
      };
    }
  }
);
