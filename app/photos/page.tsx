"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import data from "../../assets/data/finland-data.json"

interface ImageData {
  id: number;
  image: string;
  alignment: string;
  alt: string;
}

const PhotoSlideShow = () => {
	const images: ImageData[] = data.finlandData;
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const prevSlide = (): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }

	const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full mx-auto px-8 md:px-14 py-3 md:py-6">
			<div className="m-5 overflow-hidden relative">
				<Image
						src={images[currentIndex].image}
						alt={images[currentIndex].alt}
						className="transition-all duration-500 ease-in-out"
						style={{ width: '100%', height: 'auto' }}
						width={1500}
						height={1000}
				/>
			</div>
			<button type="button"
					className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 flex items-center justify-center h-8 w-8 md:h-10 md:w-10 bg-neutral-800 rounded-full border border-transparent hover:border-neutral-300"
					onClick={prevSlide}
				>
					<AiOutlineLeft className="text-neutral-300 text-2xl" style={{ strokeWidth: 8 }}/>
			</button>
      <button
        className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 flex items-center justify-center h-8 w-8 md:h-10 md:w-10 bg-neutral-800 rounded-full border border-transparent hover:border-neutral-300"
        onClick={nextSlide}
      >
        <AiOutlineRight className="text-neutral-300 text-2xl" style={{ strokeWidth: 8 }} />
      </button>
			<div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full m-1 ${
              index === currentIndex
                ? "bg-neutral-300 rounded-xl"
                : "bg-neutral-800 rounded-xl"
            } transition-all duration-500 ease-in-out`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default PhotoSlideShow
