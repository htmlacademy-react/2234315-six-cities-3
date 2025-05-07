import { Helmet } from 'react-helmet-async';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import FavoriteLocationsList from '../../components/favorite-locations-list/favorite-locations-list';

import { Offers } from '../../types/offer';

type FavoritesProps = {
  favoriteOffers: Offers;
}

function Favorites({favoriteOffers}: FavoritesProps): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>Favorites | 6 cities - Official Website</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <FavoriteLocationsList offers={favoriteOffers}/>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Favorites;
