import Image from "next/image";

function Banner() {
    return (
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <Image 
                src="/../public/img/banner.png"
                layout="fill"
                objectFit="cover"
            />
            <div className="absolute top-1/2 w-full text-center">
                <p className="text-sm font-semibold sm:text-lg">Not sure where to go? Perfect.</p>
                <button className="text-purple-500 bg-white shadow-md hover:shadow-xl active:scale-90 transition duration-150 rounded-full font-bold my-3 px-10 py-4">I'm flexible</button>
            </div>
        </div>
    )
}

export default Banner
