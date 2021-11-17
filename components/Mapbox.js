import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";

function Mapbox({ filterSearch }) {
  const [popup, setPopup] = useState({});

  //Tranform object into another object
  const coordinates = filterSearch.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  //Get the center based on latitude and longtitude
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
    maxZoom: 16,
    width: "100%",
    height: "100%",
  });

  const resize = () => {
    setViewport({
      ...viewport,
      width: window.innerWidth,
      height: '100%'
    });
  }

  useEffect(() => {
    window.addEventListener('resize', resize);
    resize();
    return () => {
      window.removeEventListener('resize', resize);
    }
  },[])

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/longdhd/ckvwepu8a0quo15tblife3ohk"
      mapboxApiAccessToken={process.env.mapbox_key}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {filterSearch.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <div
              role="img"
              aria-label="push-pin"
              onClick={() => setPopup(result)}
              className="cursor-pointer hover:scale-110 transition duration-100 ease-out"
            >
              {}
              <div className="bg-white rounded-lg px-3 font-bold h-8 w-full flex items-center">
                {result.price.replace(" / night", "")}
              </div>
            </div>
          </Marker>

          {popup.long === result.long ? (
            <Popup
              anchor="top"
              className="z-50 mt-5"
              onClose={() => setPopup({})}
              closeOnClick={true}
              closeButton={false}
              latitude={result.lat}
              longitude={result.long}
            >
              <div>
                <div className="relative h-48 w-64">
                  <Image
                    className="rounded-2xl rounded-b-none"
                    src={result.img}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="bg-white px-4 py-3 -space-y-2 rounded-b-2xl">
                  <div className="flex items-center mb-2">
                    <StarIcon className="h-4 text-red-400" />
                    <span className="ml-1">{result.star}</span>
                  </div>
                  <div className="text-lg w-56 truncate">{result.title}</div>
                  <div className="text-lg w-56 truncate">
                    {result.description}
                  </div>
                  <div className="text-lg font-bold pt-2">
                    {result.price.replace(" / night", "")}
                    <span className="font-normal"> / night</span>
                  </div>
                </div>
              </div>
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Mapbox;
