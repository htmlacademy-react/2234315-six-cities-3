import { renderHook } from '@testing-library/react';
import type { MutableRefObject } from 'react';
import { Map as LeafletMap, TileLayer as LeafletTileLayer } from 'leaflet';
import { City } from '../types/offer';
import useMap from './use-map';

vi.mock('leaflet', () => {
  const Map = vi.fn().mockImplementation((): LeafletMap => {
    const map: Partial<LeafletMap> = {
      addLayer: vi.fn(),
      setView: vi.fn(),
    };

    return map as LeafletMap;
  });

  const TileLayer = vi.fn().mockImplementation((): LeafletTileLayer => ({} as LeafletTileLayer));

  return { Map, TileLayer };
});

describe('useMap', () => {
  const mockCity: City = {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 12,
    },
  };

  it('should not create a map when mapRef.current is null', () => {
    const nullRef = { current: null } as MutableRefObject<HTMLElement | null>;

    const { result } = renderHook(() => useMap(nullRef, mockCity));

    expect(result.current).toBeNull();
    expect(LeafletMap).not.toHaveBeenCalled();
  });

  it('should call the Map constructor with correct options when mapRef.current exists', () => {
    const container = document.createElement('div');
    const elementRef = { current: container } as MutableRefObject<HTMLElement>;

    renderHook(() => useMap(elementRef, mockCity));

    expect(LeafletMap).toHaveBeenCalledWith(
      container,
      expect.objectContaining({
        center: { lat: mockCity.location.latitude, lng: mockCity.location.longitude },
        zoom: mockCity.location.zoom
      })
    );
  });

  it('should add a tile layer to the map', () => {
    const container = document.createElement('div');
    const elementRef = { current: container } as MutableRefObject<HTMLElement>;

    const { result } = renderHook(() => useMap(elementRef, mockCity));

    expect(LeafletTileLayer).toHaveBeenCalledWith(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }
    );
    expect((result.current as LeafletMap).addLayer).toHaveBeenCalled();
  });

  it('should update map view when city changes', () => {
    const container = document.createElement('div');
    const elementRef = { current: container } as MutableRefObject<HTMLElement>;
    const initialCity = mockCity;
    const newCity: City = {
      name: 'Berlin',
      location: {
        latitude: 52.52,
        longitude: 13.405,
        zoom: 10,
      },

    };

    const { result, rerender } = renderHook(
      ({ mapRef, city }) => useMap(mapRef, city),
      { initialProps: { mapRef: elementRef, city: initialCity } }
    );

    rerender({ mapRef: elementRef, city: newCity });

    expect((result.current as LeafletMap).setView).toHaveBeenCalledWith(
      {
        lat: newCity.location.latitude,
        lng: newCity.location.longitude
      },
      newCity.location.zoom
    );
  });
});
