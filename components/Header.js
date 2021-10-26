import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guestNumber, setGuestNumber] = useState(1);
  const router = useRouter();

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    console.log(ranges);
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        guestNumber: guestNumber,
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-sm py-5 px-5 md:px-10">
      {/* Logo */}
      <div
        onClick={() => router.push("/")}
        className="relative flex h-10 items-center cursor-pointer my-auto"
      >
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Search */}
      <div className="flex items-center md:border-2 py-2 rounded-full md:shadow-sm">
        <input
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          className="flex-grow pl-5 md:pr-3 outline-none font-semibold bg-transparent text-gray-600 placeholder-gray-600"
          type="text"
          placeholder={placeholder || "Start your search"}
        ></input>
        <SearchIcon className="hidden lg:inline-flex h-8 p-2 rounded-full cursor-pointer bg-red-400 text-white lg:mx-2" />
      </div>

      {/* Sign up */}
      <div className="flex items-center justify-end text-gray-500 lg:space-x-3">
        <div className="px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer">
          <p className="hidden md:inline-flex lg:text-lg text-sm font-semibold cursor-pointe">
            Become a host
          </p>
        </div>
        <div className="p-2 hidden md:inline-flex hover:bg-gray-100 rounded-full cursor-pointer">
          <GlobeAltIcon className="h-6 hidden md:inline-flex" />
        </div>
        <div className="flex button-hover-action border-2 border-opacity-30 space-x-2 p-2 rounded-full border-gray-400">
          <MenuIcon className="md:h-6 h-4" />
          <UserCircleIcon className="md:h-6 h-4" />
        </div>
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            rangeColors={["#FD5B61"]}
            minDate={new Date()}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4 pb-3">
            <h2 className="text-2xl font-semibold flex-grow">
              Number of Guests:{" "}
            </h2>
            <UsersIcon className="h-5" />
            <input
              type="number"
              min={1}
              value={guestNumber}
              onChange={(e) => setGuestNumber(e.target.value)}
              className="w-12 pl-2 text-lg outline-none text-red-400"
            />
          </div>
          <div className="flex">
            <button onClick={resetInput} className="flex-grow text-gray-500">
              Cancel
            </button>
            <button onClick={search} className="flex-grow bg-red-500 hover:brightness-110 transition transform duration-200 ease-out text-white rounded-full px-2 py-4">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
