import PrivateRoute from '../PrivateRoute';
import Layout from '../layout/Layout';
import RefreshingLoader from '../refreshing-loader/RefreshingLoader';
import Loader from '../loader/Loader';

import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { refreshUser } from '../../redux/auth/operations';
import { useSelector } from 'react-redux';
import { selectIsRefreshing } from '../../redux/auth/selectors';

const HomePage = lazy(() => import('../../pages/home-page/HomePage'));
const TeachersPage = lazy(() =>
  import('../../pages/teachers-page/TeachersPage')
);
const FavoritesPage = lazy(() =>
  import('../../pages/favorites-page/FavoritesPage')
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
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
      </Suspense>
    </Layout>
  );
}

export default App;
