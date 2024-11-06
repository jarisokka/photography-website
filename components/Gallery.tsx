import React, { useEffect } from 'react'
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "./ui/3dCardAnimation";
import data from "../assets/data/gallery-data.json"
import Link from "next/link";

const Gallery = () => {

  const handleLinkPosition = () => {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
  }

  useEffect(() => {
    // Restore the scroll position
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
    }
    sessionStorage.removeItem('scrollPosition');
  }, []);

  return (
    <section className="section-container" id="gallery">
      <div className="title-container">
        <h1>
          Moments in Time
        </h1>
        <h2>
          Highlights from My Photography Adventures
        </h2>
        <p>
          Welcome to my photography gallery, where each image tells a story of my explorations. From the quiet landscapes of Finland to the smallest details of nature, and from delicated birds to fascinating creatures, these moments capture the beauty of our world in its many forms. Whether you&apos;re drawn to serene sceneries, the intricacies of macro photography, or the wonders of wildlife, I hope these collections inspire you as they have inspired me.
        </p>  
      </div>

      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-x-5 md:px-6 px-3">
        {data.map((item) => (
          <Link href={`/photos?category=${item.data}`} key={item.id} passHref>
            <div onClick={handleLinkPosition}>
            <CardContainer key={item.id } className="w-full">
            <CardBody className="mx-2 relative group/card hover:shadow-2xl hover:shadow-[rgba(65,80,95,0.5)] bg-slate-700/[0.2] border-slate-700/[0.2] w-full h-auto p-10 border">
              <CardItem
                as="h3"
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
                className="font-light text-sm md:text-lg text-neutral-200 md:min-h-32 min-h-16 md:py-4 pt-2"
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
          </div>
        </Link> 
        ))}
      </div> 
    </section>
  );
}

export default Gallery
