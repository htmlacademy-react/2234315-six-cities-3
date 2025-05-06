import { Offers } from '../types/offer';

export const offers:Offers = [
  {
    id: '4be14c15-a39f-4d1e-ae39-6d28e70fa7f8',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'house',
    price: 846,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/16.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
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
      name: 'Paris',
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
    isFavorite: false,
    isPremium: true,
    rating: 1.3
  },
  {
    id: 'e78db40d-eb01-44a7-af71-af1b7ada0085',
    title: 'The Joshua Tree House',
    type: 'room',
    price: 132,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/16.jpg',
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
    isFavorite: false,
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
    isFavorite: false,
    isPremium: true,
    rating: 4.7
  },
];
