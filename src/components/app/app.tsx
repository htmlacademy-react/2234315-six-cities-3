import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Home from '../../pages/home/home';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import NotFound from '../../pages/not-found/not-found';
import HistoryRouter from '../history-route/history-route';
import PrivateRoute from '../private-route/private-route';

import browserHistory from '../../browser-history';
import { Offers } from '../../types/offer';
import { AppRoute } from '../../utils/const';

type AppProps = {
  favoriteOffers: Offers;
}

function App({favoriteOffers}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
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
                <Favorites favoriteOffers={favoriteOffers}/>
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
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
