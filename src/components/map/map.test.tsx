import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { makeFakeDetailedOffer, makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import { CITIES } from '../../utils/const';
import { withHistory, withStore } from '../../utils/mock-component';
import { State } from '../../types/state';
import Map from './map';

vi.mock('leaflet', () => {
  const mockMap = {
    setView: vi.fn(),
    removeLayer: vi.fn(),
    addLayer: vi.fn(),
  };

  const mockLayerGroup = {
    addTo: vi.fn().mockReturnThis(),
    clearLayers: vi.fn(),
  };

  const mockMarker = {
    setIcon: vi.fn().mockReturnThis(),
    addTo: vi.fn().mockReturnThis(),
  };

  return {
    Map: vi.fn(() => mockMap),
    TileLayer: vi.fn(),
    Icon: vi.fn(),
    Marker: vi.fn(() => mockMarker),
    layerGroup: vi.fn(() => mockLayerGroup),
  };
});

vi.mock('@/hooks/use-map', () => ({
  useMap: vi.fn().mockReturnValue({
    setView: vi.fn(),
    removeLayer: vi.fn(),
    addLayer: vi.fn(),
  }),
}));

describe('Component: Map', () => {
  const city = CITIES[1];
  const offers = [makeFakeOffer(), makeFakeOffer()];
  const selectedPointId = offers[0].id;
  const initialState = makeFakeStore();
  const store: Partial<State> = {
    ...initialState,
    APP: {
      ...initialState.APP,
      city: city,
    },
    CURRENT_OFFER: {
      ...initialState.CURRENT_OFFER,
      currentOffer: makeFakeDetailedOffer()
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render map container', () => {
    const { withStoreComponent } = withStore(<Map points={offers} selectedPointId={selectedPointId} />, store);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should create markers for each offer', async () => {
    const { withStoreComponent } = withStore(<Map points={offers} selectedPointId={selectedPointId} />, store);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const leafletMock = await import('leaflet');

    offers.forEach((offer) => {
      expect(leafletMock.Marker).toHaveBeenCalledWith({
        lat: offer.location.latitude,
        lng: offer.location.longitude,
      });
    });
  });
});
