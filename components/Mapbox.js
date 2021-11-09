import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import { LocationMarkerIcon } from "@heroicons/react/solid";

function Mapbox({ searchOutput }) {
  const [popup, setPopup] = useState({});

  //Tranform object into another object
  const coordinates = searchOutput.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  //Get the center based on latitude and longtitude
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
    width: "100%",
    height: "100%",
  });

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/longdhd/ckv260t4x31xt15nps4nnmdzg/draft"
      mapboxApiAccessToken={process.env.mapbox_key}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {searchOutput.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p role="img" aria-label="push-pin" onClick={() => setPopup(result)} className="animate-bounce">
              <LocationMarkerIcon className="text-red-400 h-12" />
            </p>
          </Marker>

          {popup.long === result.long ? (
            <Popup
              className="z-50" 
              onClose={() => setPopup({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}>
              {result.title}
            </Popup>
          ):(false)}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Mapbox;
