import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../components/loader/loader';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import OfferDetails from '../../components/offer-details/offer-details';
import OfferHost from '../../components/offer-host/offer-host';
import ReviewsList from '../../components/reviews-list/reviews-list';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import Map from '../../components/map/map';
import PlacesList from '../../components/places-list/places-list';
import NotFound from '../not-found/not-found';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCurrentOfferAction, fetchCommentsAction, fetchNearbyOffersAction } from '../../store/api-actions';
import { AuthorizationStatus, CITIES } from '../../utils/const';
import Layout from '../../components/layout/layout';
import { resetCurrentOfferState } from '../../store/current-offer-process/current-offer-process.slice';
import { setActiveCity } from '../../store/app-aside-process/app-aside-process.slice';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { getComments, getCurrentOffer, getCurrentOfferLoadingStatus, getCurrentOfferNotFoundStatus, getNearbyOffers } from '../../store/current-offer-process/current-offer-process.selectors';

function Offer(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const offer = useAppSelector(getCurrentOffer);
  const comments = useAppSelector(getComments);
  const nearbyOffers = useAppSelector(getNearbyOffers);

  const isOfferNotFound = useAppSelector(getCurrentOfferNotFoundStatus);
  const isCurrentOfferLoading = useAppSelector(getCurrentOfferLoadingStatus);

  const activeCity = CITIES.find((city) => city.name === offer?.city.name);

  useEffect(() => {
    if (activeCity) {
      dispatch(setActiveCity(activeCity));
    }
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchCurrentOfferAction(id));
      dispatch(fetchCommentsAction(id));
      dispatch(fetchNearbyOffersAction(id));
    }

    return () => {
      dispatch(resetCurrentOfferState());
    };
  }, [id, dispatch]);

  if (isCurrentOfferLoading || !offer) {
    return (
      <Layout
        pageTitle="Offer | 6 cities - Official Website"
      >
        <Loader />
      </Layout>
    );
  }

  if (isOfferNotFound) {
    return (
      <NotFound />
    );
  }

  return (
    <Layout
      pageTitle={`Offer - ${offer.title} | 6 cities - Official Website`}
    >
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery offer={offer}/>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <OfferDetails offer={offer} />
              <OfferHost offer={offer} />
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                <ReviewsList reviews={comments} />
                {authorizationStatus === AuthorizationStatus.Auth && <ReviewsForm offerId={offer.id}/>}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map points={nearbyOffers} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlacesList
                cardType="near-places"
                places={nearbyOffers}
              />
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default Offer;
