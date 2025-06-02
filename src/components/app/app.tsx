import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Home from '../../pages/home/home';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';

import { AppRoute } from '../../utils/const';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Home/>}
        />
        <Route
          path={AppRoute.Login}
          element={
            <PrivateRoute isLoginPage>
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<Offer />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
