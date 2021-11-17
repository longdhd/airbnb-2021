import { useRouter } from "next/dist/client/router";
import React, { Fragment, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Mapbox from "../components/Mapbox";
import { InputNumber, Popover, Slider,  Modal } from "antd";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../redux/actions/LoadingAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import ModalContent from "../components/ModalContent";

function Search({ searchResult }) {
  const router = useRouter();
  const { location, startDate, endDate, guestNumber } = router.query;
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.LoadingReducer);

  const formattedStartDate = format(new Date(startDate), "dd, MMMM yyyy");
  const formattedEndDate = format(new Date(endDate), "dd, MMMM yyyy");
  const range = ` ${formattedStartDate} to ${formattedEndDate} `;

  const [filterSearch, setFilterSearch] = useState(searchResult);
  const [disabledClear, setDisabledClear] = useState(true);
  const [disabledClearPrice, setClearPrice] = useState(true);
  const [inputValue, setInputValue] = useState([30, 90]);
  const [activeClassPrice, setActiveClassPrice] = useState(
    "button-hover-action"
  );
  const [activeClassPlace, setActiveClassPlace] = useState(
    "button-hover-action"
  );
  const [activeClassWifi, setActiveClassWifi] = useState("button-hover-action");
  const [activeClassKitchen, setActiveClassKitchen] = useState(
    "button-hover-action"
  );
  const [activeClassWashing, setActiveClassWashing] = useState(
    "button-hover-action"
  );
  const [activeClassParking, setActiveClassParking] = useState(
    "button-hover-action"
  );
  const [typeOfPlace, setTypeOfPlace] = useState("Type Of Place");
  const [price, setPrice] = useState("Price");

  // Modal config
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //Place filter popover
  const placeFilter = (
    <div className="space-y-2">
      <div className="flex space-x-4 items-start">
        <input
          id="entire"
          type="checkbox"
          onChange={() => setDisabledClear(false)}
          className="checkbox h-6 w-6 mt-2"
        ></input>
        <label for="entire" className="max-w-[300px]">
          <span className="text-lg">Entire place</span>
          <p className="font-extralight">Have a place to yourself</p>
        </label>
      </div>
      <div className="flex space-x-4 items-start">
        <input
          type="checkbox"
          id="private"
          onChange={() => setDisabledClear(false)}
          className="checkbox h-6 w-6 mt-2"
        ></input>
        <label for="private" className="max-w-[300px]">
          <span className="text-lg">Private room</span>
          <p className="font-extralight">
            Have your own room and share some common spaces
          </p>
        </label>
      </div>
      <div className="flex space-x-4 items-start">
        <input
          type="checkbox"
          id="hotel"
          onChange={() => setDisabledClear(false)}
          className="checkbox h-6 w-6 mt-2"
        ></input>
        <label for="hotel" className="max-w-[300px]">
          <span className="text-lg">Hotel room</span>
          <p className="font-extralight">
            Have a private or shared room in a boutique hotel, hostel and more
          </p>
        </label>
      </div>
      <div className="flex space-x-4 items-start">
        <input
          type="checkbox"
          id="shared"
          onChange={() => setDisabledClear(false)}
          className="checkbox h-6 w-6 mt-2"
        ></input>
        <label for="shared" className="max-w-[300px]">
          <span className="text-lg">Shared room</span>
          <p className="font-extralight">
            Stay in a shared space, like a common room
          </p>
        </label>
      </div>
      <hr />
      <div className="flex justify-between pt-2">
        <button
          className="underline font-semibold px-4 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabledClear}
          onClick={() => {
            var x = document.getElementsByClassName("checkbox");
            for (let i = 0; i <= x.length - 1; i++) {
              x[i].checked = false;
            }
            setDisabledClear(true);
          }}
        >
          Clear
        </button>
        <button
          className="rounded-xl bg-gray-900 text-white font-semibold brightness-110 hover:brightness-90 px-6 py-2"
          onClick={() => {
            let filter = [];
            if (document.querySelector("#entire").checked) {
              for (let search of filterSearch) {
                if (search.title.toLowerCase().includes("house")) {
                  filter = [...filter, search];
                } else {
                  filter = [...filter];
                }
              }
            }
            if (document.querySelector("#private").checked) {
              for (let search of filterSearch) {
                if (search.title.toLowerCase().includes("apartment")) {
                  filter = [...filter, search];
                } else {
                  filter = [...filter];
                }
              }
            }
            if (document.querySelector("#hotel").checked) {
              for (let search of filterSearch) {
                if (search.title.toLowerCase().includes("hotel")) {
                  filter = [...filter, search];
                } else {
                  filter = [...filter];
                }
              }
            }
            if (document.querySelector("#shared").checked) {
              for (let search of filterSearch) {
                if (search.title.toLowerCase().includes("room")) {
                  filter = [...filter, search];
                } else {
                  filter = [...filter];
                }
              }
            }
            if (
              !document.querySelector("#shared").checked &&
              !document.querySelector("#hotel").checked &&
              !document.querySelector("#private").checked &&
              !document.querySelector("#entire").checked
            ) {
              setActiveClassPlace("button-hover-action");
              setTypeOfPlace("Type Of Place");
              dispatch(displayLoadingAction);
              setFilterSearch(searchResult);
              setTimeout(dispatch, 1500, hideLoadingAction);
            } else {
              setActiveClassPlace("button-hover-action-active");
              if (
                document.querySelector("#shared").checked &&
                !document.querySelector("#hotel").checked &&
                !document.querySelector("#private").checked &&
                !document.querySelector("#entire").checked
              ) {
                setTypeOfPlace("Shared room");
              } else if (
                !document.querySelector("#shared").checked &&
                document.querySelector("#hotel").checked &&
                !document.querySelector("#private").checked &&
                !document.querySelector("#entire").checked
              ) {
                setTypeOfPlace("Hotel room");
              } else if (
                !document.querySelector("#shared").checked &&
                !document.querySelector("#hotel").checked &&
                document.querySelector("#private").checked &&
                !document.querySelector("#entire").checked
              ) {
                setTypeOfPlace("Private room");
              } else if (
                !document.querySelector("#shared").checked &&
                !document.querySelector("#hotel").checked &&
                !document.querySelector("#private").checked &&
                document.querySelector("#entire").checked
              ) {
                setTypeOfPlace("Entire place");
              } else {
                setTypeOfPlace("Type Of Place");
              }
              dispatch(displayLoadingAction);
              setFilterSearch(filter);
              setTimeout(dispatch, 1500, hideLoadingAction);
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );

  //Price filter popover
  const priceFilter = (
    <div className="space-y-4 w-[360px]">
      <p className="text-lg z-50 mb-32">The average nightly price is £54</p>
      <div className="relative z-50">
        <Slider
          range
          min={30}
          max={90}
          onChange={(value) => {
            setInputValue(value);
            setClearPrice(false);
          }}
          value={typeof inputValue === "object" ? inputValue : [30, 90]}
          defaultValue={[30, 90]}
        />
        <div className="grid grid-rows-2 -space-y-2">
          <div className="row-span-1 flex justify-between px-6">
            <span>min price</span>
            <span>max price</span>
          </div>
          <div className="row-span-1 flex justify-between">
            <InputNumber
              min={30}
              max={90}
              style={{ margin: "0 16px", flexGrow: 1 }}
              size="large"
              value={inputValue[0]}
              formatter={(value) => `£ ${value}`}
              parser={(value) => value.replace("£", "")}
              onChange={(value) => {
                setInputValue([value, 90]);
                setClearPrice(false);
              }}
            />
            <span className="text-lg">-</span>
            <InputNumber
              min={30}
              max={90}
              style={{ margin: "0 16px", flexGrow: 1 }}
              size="large"
              value={inputValue[1]}
              formatter={(value) => `£ ${value}`}
              parser={(value) => value.replace("£", "")}
              onChange={(value) => {
                setInputValue([30, value]);
                setClearPrice(false);
              }}
            />
          </div>
        </div>
      </div>
      <div
        className="absolute top-32 left-5 h-8 w-[90%] bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://alignedleft.com/content/03-tutorials/01-d3/130-making-a-bar-chart/1.png)",
        }}
      ></div>
      <hr />
      <div className="flex justify-between pt-1">
        <button
          className="underline font-semibold px-4 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabledClearPrice}
          onClick={() => {
            setInputValue([30, 90]);
            setClearPrice(true);
          }}
        >
          Clear
        </button>
        <button
          className="rounded-xl bg-gray-900 text-white font-semibold brightness-110 hover:brightness-90 px-6 py-2"
          onClick={() => {
            let filter = [];
            for (let search of filterSearch) {
              let stringToInteger = " / night";
              let searchPrice = search.price
                .replace("£", "")
                .replace(stringToInteger, "");
              if (
                searchPrice >= inputValue[0] &&
                searchPrice <= inputValue[1]
              ) {
                filter = [...filter, search];
              } else {
                filter = [...filter];
              }
            }
            dispatch(displayLoadingAction);
            setFilterSearch(filter);
            if (inputValue[0] !== 30 || inputValue[1] !== 90) {
              setPrice("£" + inputValue[0] + " - " + "£" + inputValue[1]);
              setActiveClassPrice("button-hover-action-active");
            } else {
              setPrice("Price");
              setActiveClassPrice("button-hover-action");
            }
            setTimeout(dispatch, 1500, hideLoadingAction);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );

  //Render search result
  const renderInfo = () => {
    if (filterSearch.length == 0) {
      return (
        <div className="mt-5">
          <h3 className="font-semibold text-2xl">No properties found</h3>
          <p className="text-lg font-extralight">
            Try adjusting your search criteria by changing the date, clearing
            the filter or zooming out the map
          </p>
        </div>
      );
    }
    return filterSearch?.map(
      ({ img, location, title, description, star, price, total }, index) => (
        <InfoCard
          key={index}
          img={img}
          location={location}
          title={title}
          description={description}
          star={star}
          price={price}
          total={total}
        />
      )
    );
  };

  return (
    <div className="h-screen">
      {/* <Loading /> */}
      <Header
        placeholder={`${location} | ${range} | ${guestNumber} guest(s)`}
      />
      <main className="flex">
        <section className="pt-14 px-12">
          {isLoading ? (
            <Loader />
          ) : (
            <Fragment>
              <p className="text-sm">
                300+ Stays - {range} - {guestNumber} guest
                {guestNumber > 1 ? "s" : ""}
              </p>
              <h1 className="text-3xl font-semibold mt-2 mb-6">
                Stays in {location}
              </h1>
            </Fragment>
          )}
          <div className="hidden md:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <Popover
              content={priceFilter}
              placement="bottomRight"
              trigger="click"
            >
              <p className={activeClassPrice}>{price}</p>
            </Popover>
            <Popover
              content={placeFilter}
              placement="bottomRight"
              trigger="click"
            >
              <p className={activeClassPlace}>{typeOfPlace}</p>
            </Popover>
            <p
              className={activeClassWifi}
              onClick={() => {
                if (activeClassWifi !== "button-hover-action-active") {
                  let filter = filterSearch.filter((search) =>
                    search.description.toLowerCase().includes("wifi")
                  );
                  setActiveClassWifi("button-hover-action-active");
                  dispatch(displayLoadingAction);
                  setFilterSearch(filter);
                  setTimeout(dispatch, 1500, hideLoadingAction);
                } else {
                  setActiveClassWifi("button-hover-action");
                  dispatch(displayLoadingAction);
                  let filter = searchResult.filter(
                    (search) =>
                      !search.description.toLowerCase().includes("wifi")
                  );
                  searchResult.push(...filter);
                  setFilterSearch(searchResult);
                  setTimeout(dispatch, 1500, hideLoadingAction);
                }
              }}
            >
              Wifi
            </p>
            <p
              className={activeClassKitchen}
              onClick={() => {
                if (activeClassKitchen !== "button-hover-action-active") {
                  setActiveClassKitchen("button-hover-action-active");
                  let filter = filterSearch.filter((search) =>
                    search.description.toLowerCase().includes("kitchen")
                  );
                  dispatch(displayLoadingAction);
                  setFilterSearch(filter);
                  setTimeout(dispatch, 1500, hideLoadingAction);
                } else {
                  setActiveClassKitchen("button-hover-action");
                  dispatch(displayLoadingAction);
                  let filter = searchResult.filter(
                    (search) =>
                      !search.description.toLowerCase().includes("kitchen")
                  );
                  searchResult.push(...filter);
                  setFilterSearch(searchResult);
                  setTimeout(dispatch, 1500, hideLoadingAction);
                }
              }}
            >
              Kitchen
            </p>
            <p
              className={activeClassWashing}
              onClick={() => {
                if (activeClassWashing !== "button-hover-action-active") {
                  setActiveClassWashing("button-hover-action-active");
                  let filter = filterSearch.filter((search) =>
                    search.description.toLowerCase().includes("washing machine")
                  );
                  dispatch(displayLoadingAction);
                  setFilterSearch(filter);
                  setTimeout(dispatch, 1500, hideLoadingAction);
                } else {
                  setActiveClassWashing("button-hover-action");
                  dispatch(displayLoadingAction);
                  let filter = searchResult.filter(
                    (search) =>
                      !search.description
                        .toLowerCase()
                        .includes("washing machine")
                  );
                  searchResult.push(...filter);
                  setFilterSearch(searchResult);
                  setTimeout(dispatch, 1500, hideLoadingAction);
                }
              }}
            >
              Washing machine
            </p>
            <p
              className={activeClassParking}
              onClick={() => {
                if (activeClassParking !== "button-hover-action-active") {
                  setActiveClassParking("button-hover-action-active");
                  let filter = filterSearch.filter((search) =>
                    search.description.toLowerCase().includes("free parking")
                  );
                  dispatch(displayLoadingAction);
                  setFilterSearch(filter);
                  setTimeout(dispatch, 1500, hideLoadingAction);
                } else {
                  setActiveClassParking("button-hover-action");
                  dispatch(displayLoadingAction);
                  let filter = searchResult.filter(
                    (search) =>
                      !search.description.toLowerCase().includes("free parking")
                  );
                  searchResult.push(...filter);
                  setFilterSearch(searchResult);
                  setTimeout(dispatch, 1500, hideLoadingAction);
                }
              }}
            >
              Free Parking
            </p>
            <p className="button-hover-action" onClick={showModal}>
              More filters
            </p>
            <Modal
              title="More filters"
              visible={isModalVisible}
              bodyStyle={{overflowY: 'scroll'}}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <div className="flex justify-between">
                  <button className="underline text-lg font-semibold px-2">Clear all</button>
                  <button className="rounded-xl bg-gray-900 text-white text-lg font-semibold brightness-95 hover:brightness-105 px-6 py-2">Show 300+ stays</button>
                </div>
              ]}
            >
              <ModalContent />
            </Modal>
          </div>

          <div className="flex flex-col last:pb-5">{renderInfo()}</div>
        </section>
        <section className="hidden lg:inline-flex lg:flex-grow lg:min-w-[30%]">
          <Mapbox filterSearch={filterSearch} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResult = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );
  return {
    props: {
      searchResult,
    },
  };
}
