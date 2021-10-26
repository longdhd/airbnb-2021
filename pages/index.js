import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import MediumCard from "../components/MediumCard";
import SmallCard from "../components/SmallCard";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

export default function Home({ exploreData, cardsData }) {
  return (
    <div className="">
      <Head>
        <title>Long Built Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />

      <main className="max-w-[90%] mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold p-5">Explore nearby</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Pull some data from a server - API endspoint */}
            {exploreData?.map(({ img, distance, location }, index) => (
              <SmallCard
                key={index}
                img={img}
                distance={distance}
                location={location}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8 p-5">Live anywhere</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 ml-3">
            {cardsData?.map(({ img, title }, index) => (
              <MediumCard key={index} img={img} title={title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb"
          buttonText="Get Inspired"
        />

        <section>
          <h2 className="text-4xl font-semibold py-4 p-5">
            Discover things to do
          </h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 pb-5 ml-3">
            <div className="cursor-pointer">
              <div className="relative h-80 w-80">
                <Image
                  layout="fill"
                  objectFit="contain"
                  src="https://a0.muscache.com/im/pictures/ad109d56-2421-40cd-98e6-e114160dc85b.jpg?aki_policy=large"
                  className="rounded-xl"
                ></Image>
              </div>
              <p className="font-semibold">Experiences</p>
              <p className="font-extralight text-sm">
                Find unforgettable activities near you.
              </p>
            </div>
            <div className="cursor-pointer">
              <div className="relative h-80 w-80">
                <Image
                  layout="fill"
                  objectFit="contain"
                  src="https://a0.muscache.com/im/pictures/0ce799cb-7553-4369-be9e-d0011e0ef636.jpg?aki_policy=large"
                  className="rounded-xl"
                ></Image>
              </div>
              <p className="font-semibold">Online Experiences</p>
              <p className="font-extralight text-sm">
                Live, interactive activities led by Hosts.
              </p>
            </div>
            <div className="cursor-pointer">
              <div className="relative h-80 w-80">
                <Image
                  layout="fill"
                  objectFit="contain"
                  src="https://a0.muscache.com/im/pictures/247a1ea3-946d-4eb8-a6ab-e8b9a66846f4.jpg?aki_policy=large"
                  className="rounded-xl"
                ></Image>
              </div>
              <p className="font-semibold">Featured collection: Wanderlust</p>
              <p className="font-extralight text-sm">
                Travel from home with Online Experiences.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp").then(
    (res) => res.json()
  );

  const cardsData = await fetch("https://links.papareact.com/zp1").then((res) =>
    res.json()
  );

  return {
    props: {
      exploreData: exploreData,
      cardsData,
    },
  };
}
