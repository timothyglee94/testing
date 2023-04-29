import React, { useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { CSVReader } from 'react-papaparse';

const MapWithSignal = () => {
  const [locations, setLocations] = useState([]);

  const handleOnFileLoad = (data) => {
    const newLocations = data.map((row) => ({
      latitude: parseFloat(row.data[0]),
      longitude: parseFloat(row.data[1]),
      signal: parseInt(row.data[2])
    }));
    setLocations(newLocations);
  };

  return (
    <div>
      <CSVReader onFileLoad={handleOnFileLoad} />
      <Map center={[37.7749, -122.4194]} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((location) => (
          <Marker key={`${location.latitude}-${location.longitude}`} position={[location.latitude, location.longitude]}>
            <Popup>
              Signal: {location.signal}
            </Popup>
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default MapWithSignal;
