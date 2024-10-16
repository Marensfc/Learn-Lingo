import axios from 'axios';
import { database } from './firebaseInit';
import { ref, get, set, update } from 'firebase/database';

export const exchangeRefreshTokenForAnIdToken = async refreshToken => {
  try {
    const result = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${REACT_APP_API_KEY}`,
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserData = async IdToken => {
  try {
    const result = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${REACT_APP_API_KEY}`,
      { idToken: IdToken }
    );
    return result.data.users[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUserFieldInDatabase = async userId => {
  set(ref(database, `users/${userId}`), {
    favorite: ['empty'],
  }).catch(error => {
    throw new Error(error.message);
  });
};

export const getUserFavoriteTeachers = async userId => {
  return get(ref(database, `users/${userId}/favorite`))
    .then(snapshot => {
      if (snapshot.exists()) {
        if (snapshot.val().includes('empty')) {
          return [];
        }
        return snapshot.val();
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      throw new Error(error.message);
    });
};

export const updateFavoriteTeachersInFirebase = async (userId, teachers) => {
  update(ref(database, `users/${userId}`), {
    favorite: teachers,
  }).catch(error => {
    throw new Error(error.message);
  });
  return get(ref(database, `users/${userId}/favorite`))
    .then(snapshot => snapshot.val())
    .catch(error => {
      throw new Error(error.message);
    });
};
