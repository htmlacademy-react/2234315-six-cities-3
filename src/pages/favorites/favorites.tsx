import { Helmet } from 'react-helmet-async';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import FavoriteLocationsList from '../../components/favorite-locations-list/favorite-locations-list';

import { useAppSelector } from '../../hooks';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';

function Favorites(): JSX.Element {
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);

  return (
    <div className={`page ${favoriteOffers.length === 0 && 'page--favorites-empty'}`}>
      <Helmet>
        <title>Favorites | 6 cities - Official Website</title>
      </Helmet>
      <Header />
      <main className={`page__main page__main--favorites ${favoriteOffers.length === 0 && 'page__main--favorites-empty'}`}>
        <div className="page__favorites-container container">
          {favoriteOffers.length === 0 ? (
            <FavoritesEmpty />
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                <FavoriteLocationsList offers={favoriteOffers}/>
              </ul>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Favorites;
