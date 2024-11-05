import React from "react";
import Image from "next/image";
import Link from "next/link";

const ImageCard = ({ src, alt, title, href }) => (
  <Link href={href}>
    <div className="relative rounded-3xl overflow-hidden drop-shadow-lg w-full h-auto cursor-pointer">
      <Image
        src={src}
        alt={alt}
        layout="responsive"
        width={500} // Set a fixed width to maintain aspect ratio
        height={300} // Set a fixed height to maintain aspect ratio
        objectFit="cover"
      />
      <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full p-4">
        <h4 className="text-xl font-bold text-white">{title}</h4>
      </div>
    </div>
  </Link>
);

const Gallery = () => {
  const items = [
    { src: "/assets/images/pdf.png", alt: "PDF GPT", title: "CHAT-PDF", href: "/pdf" }
  ];

  return (
    <div className="flex justify-around items-center mx-auto mt-4 lg:mt-0">
      {items.map((item, index) => (
        <div key={index} className="flex-1 mx-4">
          <ImageCard
            src={item.src}
            alt={item.alt}
            title={item.title}
            href={item.href}
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
