import React from 'react'
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "./ui/3dCardAnimation";
import data from "../assets/data/gallery-data.json"
//import Link from "next/link";

const Gallery = () => {
  return (
    <div className="py-12 w-full flex justify-center items-center flex-col" id="gallery">
      <h1 className="text-4xl xl:text-6xl lg:text-5xl md:text-4xl font-bold dark:text-white">
        Moments in Time
      </h1>
      <h2 className="font-light text-base lg:text-2xl md:text-xl dark:text-neutral-200 py-4">
        Highlights from My Photography Adventures
      </h2>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-x-5 md:px-6 px-3">
        {data.map((item) => (
          <CardContainer key={item.id}>
          <CardBody className="mx-2 relative group/card hover:shadow-2xl hover:shadow-[rgba(65,80,95,0.5)] bg-slate-700/[0.2] border-slate-700/[0.2] w-full h-auto p-10 border">
            <CardItem
              translateZ="50"
              className="text-xl md:text-2xl font-bold md:pb-1"
            >
              {item.title}
            </CardItem>

            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src={item.coverimage}
                width={1500}
                height={1000}
                className="h-full w-full object-cover rounded-md group-hover/card:shadow-xl overflow-hidden"
                alt={item.category}
              />
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="font-light text-sm md:text-lg dark:text-neutral-200 md:py-4 pt-2"
            >
              {item.description}
            </CardItem>
            <div className='flex'>
              <CardItem
                translateZ={20}
                as="button"
                className="ml-auto px-4 py-3 rounded-md bg-slate-700/[0.2] border border-white/[0.2] text-white text-xs font-bold"
              >
                {item.category}
              </CardItem>
            </div>
          </CardBody>
        </CardContainer> 
        ))}
      </div> 
    </div>
  );
}

export default Gallery
