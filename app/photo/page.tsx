"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'; 
import { AiOutlineClose } from 'react-icons/ai'
import { useSearchParams } from 'next/navigation';

export const runtime = "edge";

const PhotoView: React.FC = () => {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get('imageUrl') || '';
	
  const [isHorizontal, setIsHorizontal] = useState(true);

  useEffect(() => {
    if (imageUrl) {
      const img = new window.Image();
      img.src = imageUrl;

      img.onload = () => {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        setIsHorizontal(aspectRatio > 1);
      };
    }
  }, [imageUrl]);

	if (!imageUrl) {
		return <div>Something went wrong!</div>;
	}
	
  return (
    <div className="relative w-full mx-auto px-8 md:px-14 py-3 md:py-6">
			<div className="m-5 overflow-hidden relative flex justify-center items-center">
				<Image
						src={imageUrl || ''} 
						alt={'Image'} 
						className="object-contain"
            style={
              isHorizontal
                ? { width: '100%', maxHeight: '80vh' }
                : { width: 'auto', height: '80vh' }
            }
						width={1500}
						height={1000}
				/>
			</div>
			<Link href="/#travels" passHref>
				<button
					className="absolute top-12 right-2 md:right-4 md:top-16 transform -translate-y-1/2 flex items-center justify-center h-8 w-8 md:h-10 md:w-10 bg-neutral-800 rounded-full border border-transparent hover:border-neutral-300"
				>
					<AiOutlineClose className="text-neutral-300 text-2xl" style={{ strokeWidth: 8 }} />
				</button>
			</Link>
    </div>
  )
}

export default PhotoView
