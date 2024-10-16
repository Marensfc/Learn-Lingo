import { auth } from '../../api/firebaseInit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  exchangeRefreshTokenForAnIdToken,
  getUserData,
} from '../../api/firebaseFunctions';
import { createUserFieldInDatabase } from '../../api/firebaseFunctions';

export const signUp = createAsyncThunk(
  'auth/register',
  async (data, thunkApi) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      updateProfile(userCredentials.user, {
        displayName: data.name,
      });

      const userData = {
        name: data.name,
        email: data.email,
        token: userCredentials._tokenResponse.refreshToken,
      };

      createUserFieldInDatabase(userCredentials.user.uid);

      return userData;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk('auth/login', async (data, thunkApi) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const userData = {
      name: userCredentials.user.displayName,
      email: data.email,
      token: userCredentials._tokenResponse.refreshToken,
    };

    return userData;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  try {
    signOut(auth);
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    try {
      const persistedToken = thunkApi.getState().auth.token;
      if (persistedToken === null) {
        return thunkApi.rejectWithValue('Unable to fetch user');
      }

      const { id_token, refresh_token } =
        await exchangeRefreshTokenForAnIdToken(persistedToken);

      const { displayName, email } = await getUserData(id_token);

      return { name: displayName, email, token: refresh_token };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
