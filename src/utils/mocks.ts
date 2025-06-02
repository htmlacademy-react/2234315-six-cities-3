import { datatype, lorem, helpers, address, image, name, internet, date } from 'faker';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { DetailedOffer, Offer } from '../types/offer';
import { AuthorizationStatus, CITIES, OfferType } from './const';
import { UserData } from '../types/user-data';
import { Review } from '../types/review';
import { State } from '../types/state';
import { createAPI } from '../services/api';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const randomCity = helpers.randomize(Object.values(CITIES));

export const makeFakeOffer = (): Offer => ({
  id: datatype.uuid(),
  title: lorem.sentence(),
  type: helpers.randomize(Object.values(OfferType)),
  price: datatype.number({ min: 100, max: 1000 }),
  city: {
    name: randomCity.name,
    location: {
      latitude: +address.latitude(),
      longitude: +address.longitude(),
      zoom: 13
    }
  },
  location: {
    latitude: +address.latitude(),
    longitude: +address.longitude(),
    zoom: 16
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number({ min: 1, max: 5 }),
  previewImage: image.imageUrl(),
});

export const makeFakeDetailedOffer = (): DetailedOffer => {
  const goods = [
    'Laptop friendly workspace',
    'Washing machine',
    'Breakfast',
    'Cable TV',
    'Towels',
    'Heating',
    'Fridge',
    'Wi-Fi',
    'Dishwasher',
    'Washer'
  ];

  return {
    id: datatype.uuid(),
    title: lorem.sentence(),
    type: helpers.randomize(Object.values(OfferType)),
    price: datatype.number({ min: 100, max: 1000 }),
    city: {
      name: randomCity.name,
      location: {
        latitude: +address.latitude(),
        longitude: +address.longitude(),
        zoom: 13
      }
    },
    location: {
      latitude: +address.latitude(),
      longitude: +address.longitude(),
      zoom: 16
    },
    isFavorite: datatype.boolean(),
    isPremium: datatype.boolean(),
    rating: datatype.number({ min: 1, max: 5 }),
    description: lorem.sentence(4),
    bedrooms: datatype.number({ min: 1, max: 4 }),
    goods: helpers.shuffle(goods).slice(0, datatype.number({ min: 5, max: 10 })),
    host: {
      name: name.findName(),
      avatarUrl: image.avatar(),
      isPro: datatype.boolean(),
    },
    images: Array.from(
      { length: datatype.number({ min: 1, max: 10 }) },
      () => image.imageUrl()
    ),
    maxAdults: datatype.number({ min: 1, max: 7 }),
  };
};

export const makeFakeComment = (): Review => ({
  id: datatype.uuid(),
  comment: lorem.sentence(5),
  date: date.past().toISOString(),
  rating: datatype.number({ min: 1, max: 5 }),
  user: {
    name: name.findName(),
    avatarUrl: image.avatar(),
    isPro: datatype.boolean(),
  }
});

export const makeFakeUserData = (): UserData => ({
  name: name.findName(),
  avatarUrl: image.avatar(),
  isPro: datatype.boolean(),
  email: internet.email(),
  token: btoa(internet.email())
});

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  APP: {
    city: CITIES[0],
    offers: [makeFakeOffer()],
    favoriteOffers: [],
    isOffersLoading: false,
  },
  CURRENT_OFFER: {
    currentOffer: null,
    nearbyOffers: [makeFakeOffer()],
    comments: [],
    isCurrentOfferLoading: false,
    isCurrentOfferNotFound: false,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: makeFakeUserData(),
  },
  ...initialState ?? {},
});
