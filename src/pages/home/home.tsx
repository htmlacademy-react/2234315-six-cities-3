import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Header from '../../components/header/header';
import CitiesList from '../../components/cities-list/cities-list';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';

import { Offers } from '../../types/offer';

type HomeProps = {
  offers: Offers;
}

function Home({offers}: HomeProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | undefined>(undefined);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Home | 6 cities - Official Website</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Paris</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <PlacesList
                  cardType="cities"
                  places={offers}
                  onCardHover={setActiveOfferId}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  points={offers}
                  selectedPointId={activeOfferId}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
