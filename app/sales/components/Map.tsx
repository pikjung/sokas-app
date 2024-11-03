import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Mengatasi masalah icon marker Leaflet di React
const DefaultIcon = L.icon({
  iconRetinaUrl: markerIconRetina.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Set default icon untuk semua marker
L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const map = useMap();

  useEffect(() => {
    // Pastikan ini hanya dijalankan di client-side
    if (typeof window !== 'undefined') {
      map.setView([latitude, longitude], 16);
    }
  }, [latitude, longitude, map]);

  return (
    <Marker position={[latitude, longitude]}>
      <Popup>
        Lokasi: {latitude}, {longitude}
      </Popup>
    </Marker>
  );
};

const MapContainerComponent: React.FC<MapProps> = ({ latitude, longitude }) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={16}
      style={{ height: '300px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Map latitude={latitude} longitude={longitude} />
    </MapContainer>
  );
};

export default MapContainerComponent;
