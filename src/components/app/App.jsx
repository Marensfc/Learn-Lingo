import PrivateRoute from '../PrivateRoute';
import HomePage from '../../pages/home-page/HomePage';
import TeachersPage from '../../pages/teachers-page/TeachersPage';
import FavoritesPage from '../../pages/favorites-page/FavoritesPage';
import Layout from '../layout/Layout';
import RefreshingLoader from '../refreshing-loader/RefreshingLoader';

import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { refreshUser } from '../../redux/auth/operations';
import { useSelector } from 'react-redux';
import { selectIsRefreshing } from '../../redux/auth/selectors';

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Layout>
      {isRefreshing ? (
        <RefreshingLoader />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route
            path="/favorites"
            element={<PrivateRoute component={<FavoritesPage />} />}
          />
        </Routes>
      )}
    </Layout>
  );
}

export default App;
