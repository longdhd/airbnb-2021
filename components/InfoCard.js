import React from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import InfoLoader from "./InfoLoader";
import { useSelector } from "react-redux";


const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

function InfoCard({
  img,
  location,
  title,
  description,
  star,
  price,
  total,
}) {

  const {isLoading} = useSelector(state => state.LoadingReducer);

  if(isLoading){
    return <InfoLoader />
  }
  
  return (
    <div className="flex py-7 px-2 pr-4 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out">
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0 first:border-t">
        <Image src={img} layout="fill" objectFit="cover" className="rounded-2xl"/>
      </div>
      <div className="flex flex-col flex-grow pl-5">
          <div className="flex justify-between">
            <p>{location}</p>
            <HeartIcon className="h-7 cursor-pointer hover:text-red-400"/>
          </div>
          <h4 className="text-xl">{title}</h4>
          <div className="border-b w-10 pt-2" />
          <p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>
          <div className="flex justify-between items-end pt-5">
            <p className="flex items-center">
              <StarIcon className="h-5 text-red-400"/>
              {star} <span className="font-extralight text-gray-500 ml-1"> ({getRandomInt(120)} reviews)</span>
            </p>
            <div>
              <p className="text-lg lg:text-2xl font-semibold pb-2">{price}</p>
              <p className="text-right font-extralight text-gray-500 underline">{total}</p>
            </div>
          </div>
      </div>
    </div>
  );
}

export default InfoCard;
