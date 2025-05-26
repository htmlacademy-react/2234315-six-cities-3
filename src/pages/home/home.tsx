import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import CitiesList from '../../components/cities-list/cities-list';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';

import { useAppSelector } from '../../hooks';
import { sortOffers } from '../../utils/tools';
import { AuthorizationStatus, SortType } from '../../utils/const';

function Home(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | undefined>(undefined);
  const [currentSortType, setCurrentSortType] = useState<SortType>(SortType.Popular);

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);
  const currentCity = useAppSelector((state) => state.city);
  const allOffers = useAppSelector((state) => state.offers);

  const filteredOffers = allOffers.filter((offer) => offer.city.name === currentCity.name);
  const sortedOffers = sortOffers(filteredOffers, currentSortType);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersLoading) {
    return (
      <div className="page page--gray page--main">
        <Helmet>
          <title>Home | 6 cities - Official Website</title>
        </Helmet>
        <Loader />
      </div>
    );
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Home | 6 cities - Official Website</title>
      </Helmet>
      <Header />
      <main className={`page__main page__main--index ${filteredOffers.length === 0 && 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>
        <div className="cities">
          {filteredOffers.length !== 0 ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} places to stay in {currentCity.name}</b>
                <PlacesSorting
                  activeSortType={currentSortType}
                  onChangeSortType={setCurrentSortType}
                />
                <div className="cities__places-list places__list tabs__content">
                  <PlacesList
                    cardType="cities"
                    places={sortedOffers}
                    onCardHover={setActiveOfferId}
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
          ) : (
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in {currentCity.name}</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
