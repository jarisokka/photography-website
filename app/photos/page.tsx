"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'; 
import { useSearchParams } from 'next/navigation'
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from 'react-icons/ai'
import finland from '../../assets/data/finland-data.json'
import macros from '../../assets/data/macros-data.json'
import birds from '../../assets/data/birds-data.json'
import mammals from '../../assets/data/mammals-data.json'
import winter from '../../assets/data/winter-data.json'
import world from '../../assets/data/world-data.json'

export const runtime = "edge";

interface ImageData {
  id: number;
  image: string;
  alignment: string;
  alt: string;
}

const PhotoSlideShow = () => {
	const searchParams = useSearchParams();
  const category = searchParams.get('category'); 
	
	const [images, setImages] = useState<ImageData[]>([]);
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	useEffect(() => {
    if (category === 'finland') {
      setImages(finland);
    } else if (category === 'winter') {
      setImages(winter);
		} else if (category === 'world') {
			setImages(world);
		} else if (category === 'macros') {
			setImages(macros);
		} else if (category === 'birds') {
			setImages(birds);
		} else if (category === 'mammals') {
			setImages(mammals);
		}
  }, [category]);

	const prevSlide = (): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }

	const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

	if (images.length === 0) {
		return <div>Loading...</div>;
	}
	
  return (
    <div className="relative w-full mx-auto px-8 md:px-14 py-3 md:py-6">
			<div className="m-5 overflow-hidden relative flex justify-center items-center">
				<Image
						src={images[currentIndex]?.image || ''} 
						alt={images[currentIndex]?.alt || 'Image'} 
						className="object-contain"
						style={
							images[currentIndex]?.alignment === 'horizontal'
								? { width: '100%', maxHeight: '80vh'  }
								: { width: 'auto', height: '80vh' }
						}
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
			<Link href="/#gallery" passHref>
				<button
					className="absolute top-12 right-2 md:right-4 md:top-16 transform -translate-y-1/2 flex items-center justify-center h-8 w-8 md:h-10 md:w-10 bg-neutral-800 rounded-full border border-transparent hover:border-neutral-300"
				>
					<AiOutlineClose className="text-neutral-300 text-2xl" style={{ strokeWidth: 8 }} />
				</button>
			</Link>
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
