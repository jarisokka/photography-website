import React from 'react'
import Image from 'next/image';
import Button from "./ui/movingBorder";
import profileImage from "../public/profile.jpg"

const About = () => {
  return (
    <section className="section-container" id="about">
      <div className="title-container">
        <h1>
          Behind the Lens
        </h1>
        <h2>
          Get to Know Me Better
        </h2> 
      </div>

      <div className="w-full md:px-6 px-3 pt-3">
        <Button
            duration={30000}
            style={{
              backgroundColor: "rgba(65, 80, 95, 0.1)",
            }}
            >
            <div className="grid lg:grid-cols-3 grid-cols-1 py-10 px-12 md:py-16 md:px-24">
              <div className="lg:col-span-1 col-span-3 flex justify-center lg:justify-start items-center">
                <div className="w-44 h-44 md:w-60 md:h-60 rounded-full overflow-hidden mb-4 md:m-0">
                  <Image
                    src={profileImage}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:col-span-2 col-span-3 flex flex-col items-center">
                <h3>
                  A Glimpse into My World
                </h3>
                <p className="text-center">
                  I’m an photographer and entrepreneur based in Finland. My journey with photography began the moment I picked up my first SLR camera, and I’ve been captivated by the art of capturing light ever since.
                  
                  I spend much of my time exploring the woods, seeking to capture those fleeting, magical moments. While I love to travel, the majority of my photographs showcase the stunning beauty of my home country. There’s something truly unique about Finnish nature and its extraordinary light.

                  My passion lies in landscape and wildlife photography, but I don’t confine myself to these genres. I photograph anything that piques my interest. As a self-taught photographer, I’m constantly challenging myself to learn and grow, always on the lookout for the best lighting conditions and intriguing new locations. I pay meticulous attention to technical settings, ensuring each shot is just right.

                  If you have any questions about my work or are interested in collaborations or work opportunities, please don’t hesitate to reach out. I’m always open to new possibilities.
                </p>
              </div>
            </div>
        </Button>
      </div>
    </section>
  )
}

export default About
