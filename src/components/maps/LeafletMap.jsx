import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { handleChange } from "../../services/redux/slices/formSlice";
import { UserEntity } from "../../services/entities/User";

export default function LeafletMap({ display = false, coordinates }) {
  const dispatch = useDispatch();
  const { role } = useSelector(UserEntity);
  const zoom = display ? 12 : 13;
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

  useEffect(() => {
    if ((display || role === "customer") && coordinates) {
      setCoords({
        lat: coordinates.lat,
        lng: coordinates.lng,
      });
    }
  }, [display, role]);

  useEffect(() => {
    if (!display) {
      dispatch(
        handleChange({ name: "lat", value: coords.lat, formType: "address" })
      );
      dispatch(
        handleChange({ name: "lng", value: coords.lng, formType: "address" })
      );
    }
  }, [coords, display]);

  function MapUpdater({ coords }) {
    const map = useMap();
    useEffect(() => {
      if (coords) {
        map.flyTo([coords.lat, coords.lng], zoom, { animate: true });
      }
    }, [coords, map]);
    return null;
  }

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
          <MapUpdater coords={coords} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={coords} icon={customMarker} />
          {!display && <LocationPicker setCoords={setCoords} />}
        </MapContainer>
      </div>
    </section>
  );
}
