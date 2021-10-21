import React from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";

function InfoCard({
  img,
  destination,
  title,
  description,
  star,
  price,
  total,
}) {
  return (
    <div>
      <div className="relative h-24 w-40 md:w-52 md:h-80 flex-shrink-0">
        <Image src={img} layout="fill" objectFit="cover" />
      </div>
      <div className="flex flex-col flex-grow pl-5">
          <div className="flex justify-between">
            <p>{location}</p>
            <HeartIcon className="h-7 cursor-pointer"/>
          </div>
      </div>
    </div>
  );
}

export default InfoCard;
