import Image from "next/image";
import { GlobeAltIcon, MenuIcon, SearchIcon, UserCircleIcon } from "@heroicons/react/solid";

function Header() {
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-sm py-5 px-5 md:px-10">
      {/* Logo */}
      <div className="relative flex h-10 items-center cursor-pointer my-auto">
        <Image
          src="/../public/img/Airbnb_Logo_Bélo.svg.png"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Search */}
      <div className="flex items-center md:border-2 py-2 rounded-full md:shadow-sm">
        <input className="flex-grow pl-5 outline-none bg-transparent text-gray-600 placeholder-gray-400" type="text" placeholder="Start your search"></input>
        <SearchIcon className="hidden lg:inline-flex h-8 p-2 rounded-full cursor-pointer bg-red-400 text-white lg:mx-2" />
      </div>

      {/* Sign up */}
      <div className="flex items-center justify-end text-gray-500 space-x-3">
          <p className="hidden md:inline-flex lg:text-lg text-sm cursor-pointe">Become a host</p>
          <GlobeAltIcon className="h-6 hidden md:inline-flex cursor-pointer"/>
          <div className="flex border-2 border-opacity-30 space-x-2 p-2 rounded-full border-gray-400">
              <MenuIcon className="h-6"/>
              <UserCircleIcon className="h-6"/>
          </div>

      </div>
    </header>
  );
}

export default Header;
