import Header from "@/app/components/header"
import Footer from "@/app/components/footer";
import Image from "next/image";
import Link from "next/link";
import ProductCards from "./products/page";
import CommunityShare from "./components/CommunityShare";
import ProductSection from "./components/ProductSection";

export default function Home() {
  return (
    <>
      <div
        className="bg-[url('/images/background.png')] bg-no-repeat 
    bg-auto h-[800px] w-full"
      >
        <Header />

        <div className="w-3/4 border-2 md:w-[559px] p-4 md:p-10 bg-[#FFF3E3] mt-20 md:mt-36 mr-4 md:mr-10 ml-auto">
          <p className="font-semibold text-base">New Arrival</p>
          <h1 className="font-bold leading-8 md:leading-[65px] text-3xl md:text-[52px] text-[#B88E2F]">
            Discover Our <br /> New Collection
          </h1>
          <p className="font-medium text-base md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
          <button className="bg-[#B88E2F] hover-bg-[#b88e2f] text-white  w-44 p-4 mt-6 rounded-md">
            <Link href="/products" className="text-base font-bold text-white">
              Buy Now
            </Link>
          </button>
        </div>
      </div>
      <div className="w-full text-center">
        <h3 className="font-bold text-[32px] text-[#B88E2F]">Browse The Range</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <div
        className="w-full flex flex-col 
      md:flex-row justify-around items-center gap-6 p-4 md:p-20"
      >
        <div
          className="w-full md:w-1/3 flex 
        flex-col justify-center items-center"
        >
          <Image
            src={"/images/Dinning.png"}
            alt="Dining"
            width={700}
            height={700}
            className="w-[581px] h-[400px]"
          />
          <h4 className="font-semibold text-2xl text-center">Dining</h4>
        </div>

        <div className="w-full md:w-1/3 flex flex-col justify-center items-center">
          <Image
            src={"/images/living.png"}
            alt="living"
            width={381}
            height={400}
            className="w-[381px] h-[400px]"
          />
          <h4 className="font-semibold text-2xl text-center">Living</h4>
        </div>

        <div className="w-full md:w-1/3 flex flex-col justify-center items-center">
          <Image
            src={"/images/bedroom.png"}
            alt="Bedroom"
            width={381}
            height={400}
            className="w-[381px] h-[400px]"
          />
          <h4 className="font-semibold text-2xl text-center">Bedroom</h4>
        </div>
      </div>
      <ProductCards/>
<ProductSection/>
      
      <div className="w-full flex justify-center items-center">
        <button
          className="w-40 p-2 rounded-lg text-center border border-[#B88E2F] bg-white text-[#B88E2F] 
hover:border-0 hover:bg-[#B88E2F] hover:text-white"
        >
          <Link href="productpage">Shop More</Link>
        </button>
        </div>

<div className="bg-[#FCF8F3] w-full flex flex-col md:flex-row justify-around items-center gap-4">
  <div className="w-full md:w-1/2 p-10 md:p-24">
  <h2 className="font-bold text-3xl md:text-[40px]">50+ Beautiful rooms inspiration</h2>
  <p className="pr-4">Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
  <button
          className="w-40 p-2 mt-10 rounded-lg text-center border border-[#B88E2F] bg-[#B88E2F] text-white 
hover:border-[#B88E2F]  hover:bg-white hover:text-[#B88E2F] "
        >
          <Link href="productpage">Explore Now</Link>
        </button>
  </div>
  
  <div className="w-11/12 md:w-1/3">
  <Image src={"/images/explore.svg"} alt="Rectangle 24" width={100} height={100} className="w-full p-2"/>
  </div>
  
  <div className="w-11/12 md:w-1/3">
  <Image src={"/images/Rectangle 2.svg"} alt="Rectangle 25" width={100} height={100} className="w-full p-2"/>
  </div>

</div>
      <CommunityShare/>

      <Footer />
    </>
  );
}
