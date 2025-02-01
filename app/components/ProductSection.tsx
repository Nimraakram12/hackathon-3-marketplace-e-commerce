import Image from "next/image";

export default function ProductSection() {
  const products = [
    {
      id: 1,
      image: "/images/Images.png",
      name: "Syltherine",
      description: "Stylish cafe chair",
      price: "Rp 2.500.000",
    },
    {
      id: 2,
      image: "/images/Images (1).png",
      name: "Leviosa",
      description: "Stylish cafe chair",
      price: "Rp 2.500.000",
    },
    {
      id: 3,
      image: "/images/Images (2).png",
      name: "Lolito",
      description: "Luxury big sofa",
      price: "Rp 7.000.000",
    },
    {
      id: 4,
      image: "/images/image 4.png",
      name: "Respira",
      description: "Outdoor bar table and stool",
      price: "Rp 500.000",
    },
    {
      id: 5,
      image: "/images/Images.png",
      name: "Grifo",
      description: "Minimalist modern chair",
      price: "Rp 3.200.000",
    },
    {
      id: 6,
      image: "/images/Images (1).png",
      name: "Evo",
      description: "Elegant office chair",
      price: "Rp 4.100.000",
    },
    {
      id: 7,
      image: "/images/Images (2).png",
      name: "Deluxe",
      description: "Luxurious lounge chair",
      price: "Rp 9.800.000",
    },
    {
      id: 8,
      image: "/images/image 4.png",
      name: "Retro",
      description: "Classic wooden chair",
      price: "Rp 1.200.000",
    },
  ];

  return (
    <section className="w-full py-10 bg-[#F9F9F9] ">
      <div className="w-full text-center mb-10">
        <h3 className="font-bold text-[32px] text-[#B88E2F]">Our Products</h3>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-16 ">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[285px] h-[446px] mx-auto bg-white shadow-lg rounded-lg"
          >
            <div className="w-[285px] h-[301px] bg-[#F5F5F5]">
              <Image
                src={product.image}
                alt={product.name}
                width={285}
                height={301}
                className="object-cover"
              />
            </div>
            <div className="bg-[#F4F5F7]  p-4">
              <h3 className="font-semibold leading-7 text-2xl">{product.name}</h3>
              <p className="text-[#898989] text-base">{product.description}</p>
              <h3 className="font-semibold leading-7 text-xl">{product.price}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
