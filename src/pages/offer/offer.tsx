import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Header from '../../components/header/header';
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
import { resetCurrentOfferState } from '../../store/actions';
import { AuthorizationStatus, OFFER_NEARBY_MAX_LENGHT } from '../../utils/const';

function Offer(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const offer = useAppSelector((state) => state.currentOffer);
  const comments = useAppSelector((state) => state.comments);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers).slice(0, OFFER_NEARBY_MAX_LENGHT);

  const isOfferNotFound = useAppSelector((state) => state.isCurrentOfferNotFound);
  const isCurrentOfferLoading = useAppSelector((state) => state.isCurrentOfferLoading);
  const isCommentsLoading = useAppSelector((state) => state.isCommentsLoading);
  const isNearbyOffersLoading = useAppSelector((state) => state.isNearbyOffersLoading);

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

  if (isCurrentOfferLoading || isCommentsLoading || isNearbyOffersLoading || !offer) {
    return (
      <div className="page">
        <Helmet>
          <title>Offer | 6 cities - Official Website</title>
        </Helmet>
        <Loader />
      </div>
    );
  }

  if (isOfferNotFound) {
    return (
      <NotFound />
    );
  }

  return (
    <div className="page">
      <Helmet>
        <title>Offer - {offer.title} | 6 cities - Official Website</title>
      </Helmet>
      <Header />
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
    </div>
  );
}

export default Offer;
