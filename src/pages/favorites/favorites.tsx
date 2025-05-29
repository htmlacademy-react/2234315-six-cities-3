import Layout from '../../components/layout/layout';
import FavoriteLocationsList from '../../components/favorite-locations-list/favorite-locations-list';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';

import { useAppSelector } from '../../hooks';
import { getFavoriteOffers } from '../../store/app-aside-process/app-aside-process.selectors';

function Favorites(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  return (
    <Layout
      pageTitle="Favorites | 6 cities - Official Website"
      className={favoriteOffers.length === 0 ? 'page--favorites-empty' : ''}
      withFooter
    >
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
    </Layout>
  );
}

export default Favorites;
