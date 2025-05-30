import { useCallback, useMemo, useState } from 'react';

import Layout from '../../components/layout/layout';
import Loader from '../../components/loader/loader';
import CitiesList from '../../components/cities-list/cities-list';
import MainEmpty from '../../components/main-empty/main-empty';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';

import { useAppSelector } from '../../hooks';
import { sortOffers } from '../../utils/tools';
import { AuthorizationStatus, PageTitle, SortType } from '../../utils/const';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { getCity, getOffers, getOffersLoadingStatus } from '../../store/app-aside-process/app-aside-process.selectors';

function Home(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | undefined>(undefined);
  const [currentSortType, setCurrentSortType] = useState<SortType>(SortType.Popular);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  const currentCity = useAppSelector(getCity);
  const allOffers = useAppSelector(getOffers);

  const filteredOffers = allOffers.filter((offer) => offer.city.name === currentCity.name);
  const sortedOffers = useMemo(() => sortOffers(filteredOffers, currentSortType), [filteredOffers, currentSortType]);

  const handleCardHover = useCallback((offerId: string | undefined) => {
    setActiveOfferId(offerId);
  }, []);

  const handleChangeSortType = useCallback((sortType: SortType) => {
    setCurrentSortType(sortType);
  }, []);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersLoading) {
    return (
      <Layout
        pageTitle={PageTitle.Main}
        className="page--gray page--main"
      >
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout
      pageTitle={PageTitle.Main}
      className="page--gray page--main"
    >
      <main className={`page__main page__main--index ${filteredOffers.length === 0 && 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>
        <div className="cities">
          {filteredOffers.length === 0 ? (
            <MainEmpty city={currentCity.name} />
          ) : (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} places to stay in {currentCity.name}</b>
                <PlacesSorting
                  activeSortType={currentSortType}
                  onChangeSortType={handleChangeSortType}
                />
                <div className="cities__places-list places__list tabs__content">
                  <PlacesList
                    cardType="cities"
                    places={sortedOffers}
                    onCardHover={handleCardHover}
                  />
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    points={filteredOffers}
                    selectedPointId={activeOfferId}
                  />
                </section>
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}

export default Home;
