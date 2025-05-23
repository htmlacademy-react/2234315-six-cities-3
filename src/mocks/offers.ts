import { Offers } from '../types/offer';

export const nearbyOffers:Offers = [
  {
    id: '540405b2-19a6-404e-b2c6-75846400d8ca',
    title: 'Waterfront with extraordinary view',
    type: 'hotel',
    price: 197,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/9.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 3
  },
  {
    id: 'aae0f775-5f81-4808-ba79-7aa6bd9b6fe6',
    title: 'Tile House',
    type: 'hotel',
    price: 344,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/14.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 4
  },
  {
    id: '9aaa38a4-ae77-4d7e-95b8-f43020af24f8',
    title: 'The Joshua Tree House',
    type: 'room',
    price: 169,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/19.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.2
  },
];

export const favoriteOffers:Offers = [
  {
    id: '540405b2-19a6-404e-b2c6-75846400d8c1',
    title: 'Waterfront with extraordinary view',
    type: 'hotel',
    price: 197,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/15.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.858610000000006,
      longitude: 2.330499,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 3
  },
  {
    id: 'aae0f775-5f81-4808-ba79-7aa6bd9b6fe2',
    title: 'Tile House',
    type: 'hotel',
    price: 344,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/13.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.335499,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 4
  },
  {
    id: '9aaa38a4-ae77-4d7e-95b8-f43020af24f3',
    title: 'The Joshua Tree House',
    type: 'room',
    price: 169,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/19.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.85761,
      longitude: 2.358499,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 3.2
  },
];
