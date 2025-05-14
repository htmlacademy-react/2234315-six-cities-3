import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';

import useMap from '../../hooks/use-map';
import { Offers } from '../../types/offer';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../utils/const';

import 'leaflet/dist/leaflet.css';

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
  const currentCity = points[0].city;
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
            selectedPointId !== undefined && point.id === selectedPointId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPointId]);

  return (
    <div ref={mapRef} style={{ height: '100%' }} />
  );
}

export default Map;
