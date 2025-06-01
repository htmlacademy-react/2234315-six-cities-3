import { useRef, useEffect, memo } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';

import { useAppSelector } from '../../hooks';
import useMap from '../../hooks/use-map';
import { Offers } from '../../types/offer';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../utils/const';

import 'leaflet/dist/leaflet.css';
import { getCity } from '../../store/app-process/app-process.selectors';
import { getCurrentOffer } from '../../store/current-offer-process/current-offer-process.selectors';

type MapProps = {
  points: Offers;
  selectedPointId?: string;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT
});


const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT
});

function Map({points, selectedPointId}: MapProps): JSX.Element {
  const currentCity = useAppSelector(getCity);
  const currentOffer = useAppSelector(getCurrentOffer);

  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            selectedPointId === point.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      if (currentOffer) {
        const currentOfferMarker = new Marker({
          lat: currentOffer.location.latitude,
          lng: currentOffer.location.longitude
        });

        currentOfferMarker
          .setIcon(currentCustomIcon)
          .addTo(markerLayer);
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPointId, currentOffer]);

  return (
    <div ref={mapRef} style={{ height: '100%' }} />
  );
}

export default memo(Map);
