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

function Header({placeholder}) {
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
        guestNumber: guestNumber
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
          className="flex-grow pl-5 md:pr-3 outline-none bg-transparent text-gray-600 placeholder-gray-400"
          type="text"
          placeholder={placeholder || "Start your search"}
        ></input>
        <SearchIcon className="hidden lg:inline-flex h-8 p-2 rounded-full cursor-pointer bg-red-400 text-white lg:mx-2" />
      </div>

      {/* Sign up */}
      <div className="flex items-center justify-end text-gray-500 space-x-3">
        <p className="hidden md:inline-flex lg:text-lg text-sm cursor-pointe">
          Become a host
        </p>
        <GlobeAltIcon className="h-6 hidden md:inline-flex cursor-pointer" />
        <div className="flex border-2 border-opacity-30 space-x-2 p-2 rounded-full border-gray-400">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
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
          <div className="flex items-center border-b mb-4">
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
            <button onClick={search} className="flex-grow text-red-600">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
