// components/CustomMarker.tsx
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';
import L from 'leaflet';

// Komponen props untuk CustomMarker
interface CustomMarkerProps {
  position: [number, number];
  title: string;
}

// Komponen CustomMarker
const CustomMarker: React.FC<CustomMarkerProps> = ({ position, title }) => {
  // Membuat divIcon menggunakan React Icons
  const icon = L.divIcon({
    className: 'custom-icon',
    html: `<div style="font-size: 24px; color: red;"><FaMapMarkerAlt /></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  return (
    <Marker position={position} icon={icon}>
      <Popup>{title}</Popup>
    </Marker>
  );
};

export default CustomMarker;
