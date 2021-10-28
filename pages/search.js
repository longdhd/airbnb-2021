import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {format} from 'date-fns';
import InfoCard from "../components/InfoCard";
import Mapbox from "../components/Mapbox";
import { Popover } from 'antd';
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { displayLoadingAction, hideLoadingAction } from "../redux/actions/LoadingAction";

function Search({searchResult}) {
  const router = useRouter();
  const {location, startDate, endDate, guestNumber} = router.query;
  const formattedStartDate =  format(new Date(startDate), "dd, MMMM yyyy");
  const formattedEndDate =  format(new Date(endDate), "dd, MMMM yyyy");
  const range = ` ${formattedStartDate} to ${formattedEndDate} `;
  const [filterSearch, setFilterSearch] = useState(searchResult);
  const dispatch = useDispatch();

  //Place filter popover
  const placeFilter = (
    <div className="space-y-2">
      <div className="flex space-x-4 items-start">
        <input id="entire" type="checkbox" className="h-6 w-6 mt-2"></input>
        <label for="entire" className="max-w-[300px]">
          <span  className="text-lg">Entire place</span>
          <p className="font-extralight">Have a place to yourself</p>
        </label>
      </div>
      <div className="flex space-x-4 items-start">
        <input type="checkbox" id="private" className="h-6 w-6 mt-2"></input>
        <label for="private" className="max-w-[300px]">
          <span className="text-lg">Private room</span>
          <p className="font-extralight">Have your own room and share some common spaces</p>
        </label>
      </div>
      <div className="flex space-x-4 items-start">
        <input type="checkbox" id="hotel" className="h-6 w-6 mt-2"></input>
        <label for="hotel" className="max-w-[300px]">
          <span className="text-lg">Hotel room</span>
          <p className="font-extralight">Have a private or shared room in a boutique hotel, hostel and more</p>
        </label>
      </div>
      <div className="flex space-x-4 items-start">
        <input type="checkbox" id="shared" className="h-6 w-6 mt-2"></input>
        <label for="shared" className="max-w-[300px]">
          <span className="text-lg">Shared room</span>
          <p className="font-extralight">Stay in a shared space, like a common room</p>
        </label>
      </div>
      <hr/>
      <div className="flex justify-between pt-2">
        <button className="underline font-semibold px-4">Clear</button>
        <button className="rounded-xl bg-gray-900 text-white font-semibold brightness-110 hover:brightness-90 px-6 py-2" 
                onClick={() => {
                  let filter = [];
                  if(document.querySelector('#entire').checked){
                    for(let search of searchResult){
                      if(search.title.toLowerCase().includes("house")){
                        filter = [...filter,search];
                      }else{
                        filter = [...filter]
                      }
                    }
                  }
                  if(document.querySelector('#private').checked){
                    for(let search of searchResult){
                      if(search.title.toLowerCase().includes("apartment")){
                        filter = [...filter,search];
                      }else{
                        filter = [...filter]
                      }
                    }
                  }
                  if(document.querySelector('#hotel').checked){
                    for(let search of searchResult){
                      if(search.title.toLowerCase().includes("hotel")){
                        filter = [...filter,search];
                      }else{
                        filter = [...filter]
                      }
                    }
                  }
                  if(document.querySelector('#shared').checked){
                    for(let search of searchResult){
                      if(search.title.toLowerCase().includes("room")){
                        filter = [...filter,search];
                      }else{
                        filter = [...filter]
                      }
                    }
                  }
                  dispatch(displayLoadingAction);
                  setFilterSearch(filter);
                  setTimeout (dispatch, 2000, hideLoadingAction);
                }}
        >Save</button>
      </div>
    </div>
  );

  //Render search result
  const renderInfo = () => {
    if(filterSearch.length == 0){
      return <div className="mt-5">
        <h3 className="font-semibold text-2xl">No properties found</h3>
        <p className="text-lg font-extralight">Try adjusting your search criteria by changing the date, clearing the filter or zooming out the map</p>
      </div>
    }
    return filterSearch?.map(({img, location, title, description, star, price, total},index) => (
    <InfoCard key={index} img={img} location={location} title={title} description={description} star={star} price={price} total={total}/>
    ))
  }
  console.log(searchResult)
  return (
    <div className="h-screen">
      <Loading />
      <Header placeholder={`${location} | ${range} | ${guestNumber} guest(s)`}/>
      <main className="flex">
        <section className="flex-grow pt-14 px-16">
          <p className="text-sm">300+ Stays - {range} - {guestNumber} guest{guestNumber > 1 ? 's' : ''}</p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
          <div className="hidden md:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
              <p className="button-hover-action">Price</p>
              <Popover content={placeFilter} placement="bottomRight" trigger="click">
                <p className="button-hover-action">Type of Place</p>
              </Popover>
              <p className="button-hover-action" onClick={ () => {
                let filter = searchResult.filter(search => search.description.toLowerCase().includes("wifi"));
                dispatch(displayLoadingAction);
                setFilterSearch(filter);
                setTimeout (dispatch, 2000, hideLoadingAction);
              }}>Wifi</p>
              <p className="button-hover-action" onClick={() => {
                let filter = searchResult.filter(search => search.description.toLowerCase().includes("kitchen"));
                dispatch(displayLoadingAction);
                setFilterSearch(filter);
                setTimeout (dispatch, 2000, hideLoadingAction);
              }}>Kitchen</p>
              <p className="button-hover-action" onClick={() => {
                let filter = searchResult.filter(search => search.description.toLowerCase().includes("washing machine"));
                dispatch(displayLoadingAction);
                setFilterSearch(filter);
                setTimeout (dispatch, 2000, hideLoadingAction);
              }}>Washing machine</p>
              <p className="button-hover-action" onClick={() => {
                let filter = searchResult.filter(search => search.description.toLowerCase().includes("free parking"));
                dispatch(displayLoadingAction);
                setFilterSearch(filter);
                setTimeout (dispatch, 2000, hideLoadingAction);
              }}>Free Parking</p>
              <p className="button-hover-action">More filters</p>
          </div>

          <div className="flex flex-col last:pb-5">
              {renderInfo()}
          </div>
        </section>
        <section className="hidden lg:inline-flex lg:min-w-[30%]">
          <Mapbox filterSearch={filterSearch}/>
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