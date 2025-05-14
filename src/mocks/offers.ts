import { Offers } from '../types/offer';

export const offers:Offers = [
  {
    id: '4be14c15-a39f-4d1e-ae39-6d28e70fa7f8',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'house',
    price: 846,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/10.jpg',
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
    isFavorite: false,
    isPremium: true,
    rating: 1.5
  },
  {
    id: 'ce43d8e0-469b-4174-a2e4-1830e3a28e14',
    title: 'Tile House',
    type: 'house',
    price: 605,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/2.jpg',
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
    isPremium: false,
    rating: 1.3
  },
  {
    id: 'e78db40d-eb01-44a7-af71-af1b7ada0085',
    title: 'The Joshua Tree House',
    type: 'room',
    price: 132,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/16.jpg',
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
    isFavorite: true,
    isPremium: true,
    rating: 4.1
  },
  {
    id: 'a1ffb2cf-068c-4887-9bb3-6dcf9567ff32',
    title: 'Wood and stone place',
    type: 'hotel',
    price: 271,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/7.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.7
  },
];

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
