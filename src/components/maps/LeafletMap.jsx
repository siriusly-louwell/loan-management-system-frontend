import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function LeafletMap() {
  const [coords, setCoords] = useState({ lat: 7.3081, lng: 125.6842 });
  const customMarker = new L.Icon({
    iconUrl: `data:image/svg+xml;utf8,
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
        <path fill='%23f43f5e' d='M16 0C10 0 6 5 6 10c0 7 10 22 10 22s10-15 10-22c0-5-4-10-10-10z'/>
        <circle cx='16' cy='10' r='4' fill='white'/>
      </svg>`,
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  console.log(JSON.stringify(coords));

  function LocationPicker({ setCoords }) {
    useMapEvents({
      click(e) {
        setCoords(e.latlng);
      },
    });
    return null;
  }

  return (
    <section className="w-full mx-auto p-4 z-40">
      <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-300">
        <MapContainer
          center={coords}
          zoom={13}
          style={{ height: "400px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={coords} icon={customMarker} />
          <LocationPicker setCoords={setCoords} />
        </MapContainer>
      </div>
    </section>
  );
}
