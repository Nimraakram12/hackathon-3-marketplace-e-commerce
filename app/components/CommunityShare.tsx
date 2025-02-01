import React from "react";
import Image from "next/image";

const CommunityShare = () => {
  return (
    <div className="mt-16">
        <div className="px-4">
          <p className="font-poppins font-semibold text-center text-[#616161] text-lg md:text-xl/[30px]">
            Share your setup with
          </p>
          <h2 className="text-[#3A3A3A] font-poppins font-bold text-2xl/[32px] md:text-[40px]/[48px] text-center">
            #FurniroFurniture
          </h2>
        </div>

        <Image
          src={"/images/Images.svg"}
          alt="h"
          height={721}
          width={1799}
          className="w-full h-auto object-cover"
        />
      </div>
    
  
  );
}

export default CommunityShare;