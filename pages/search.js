import { useRouter } from "next/dist/client/router";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {format} from 'date-fns';
import InfoCard from "../components/InfoCard";

function Search({searchResult}) {
  const router = useRouter();
  const {location, startDate, endDate, guestNumber} = router.query;
  const formattedStartDate =  format(new Date(startDate), "dd, MMMM yyyy");
  const formattedEndDate =  format(new Date(endDate), "dd, MMMM yyyy");
  const range = ` ${formattedStartDate} to ${formattedEndDate} `;
  console.log(searchResult);
  return (
    <div className="h-screen">
      <Header placeholder={`${location} | ${range} | ${guestNumber} guest(s)`}/>
      <main className="flex">
        <section className="flex-grow pt-14 px-16">
          <p className="text-sm">300+ Stays - {range} - {guestNumber} guest{guestNumber > 1 ? 's' : ''}</p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
          <div className="hidden md:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
              <p className="button-hover-action">Cancellation Flexibility</p>
              <p className="button-hover-action">Type of Place</p>
              <p className="button-hover-action">Price</p>
              <p className="button-hover-action">Rooms and Beds</p>
              <p className="button-hover-action">More filters</p>
          </div>

          <div className="flex flex-col">
          {searchResult?.map(({img, location, title, description, star, price, total},index) => (
            <InfoCard key={index} img={img} location={location} title={title} description={description} star={star} price={price} total={total}/>
          ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps (){
  const searchResult = await fetch("https://links.papareact.com/isz")
  .then((res) => res.json())
  return {
    props: {
      searchResult,
    }
  }
}