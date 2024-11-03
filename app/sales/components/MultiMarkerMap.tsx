import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Menggunakan import untuk mengimpor ikon secara langsung
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Mengatasi masalah icon marker Leaflet di React
const DefaultIcon = L.icon({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIconRetina.src,
  iconSize: [25, 41], // Ukuran ikon
  iconAnchor: [12, 41], // Titik anchor untuk posisi marker
});

// Set default icon untuk semua marker
L.Marker.prototype.options.icon = DefaultIcon;

// Interface untuk struktur data marker
interface MarkerData {
  latitude: number;
  longitude: number;
  date_kules: string;
  store: {
    id: string;
    name: string;
  }; // Tambahkan label opsional untuk popup
}

interface MultiMarkerMapProps {
  markers: MarkerData[]; // Array data marker yang diterima oleh komponen
}

const MultiMarkerMap: React.FC<MultiMarkerMapProps> = ({ markers }) => {
  // Gunakan ref untuk menyimpan referensi ke MapContainer
  const mapRef = useRef<L.Map | null>(null);

  // Ambil latitude dan longitude dari marker pertama (untuk centering peta)
  const centerPosition: [number, number] = markers.length > 0
    ? [markers[0].latitude, markers[0].longitude]
    : [0, 0]; // Pastikan format [latitude, longitude]

  // Update posisi peta saat marker berubah
  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current && markers.length > 0) {
      // Ambil posisi dari marker pertama untuk centering peta
      const { latitude, longitude } = markers[0];
      mapRef.current.setView([latitude, longitude], 10); // Gunakan zoom level yang lebih rendah untuk menampilkan semua marker
    }
  }, [markers]);

  return (
    <MapContainer
      center={centerPosition}
      zoom={10} // Set zoom level awal
      style={{ height: '500px', width: '100%' }}
      ref={mapRef} // Assign ref ke MapContainer
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Render marker berdasarkan array markers */}
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.latitude, marker.longitude]} // Pastikan posisi dalam format [latitude, longitude]
        >
          <Popup>
            {marker.store.name ? marker.store.name : `Latitude: ${marker.latitude}, Longitude: ${marker.longitude}`}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MultiMarkerMap;
