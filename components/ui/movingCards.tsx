"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from 'next/image';

export const MovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    id: number;
    image: string;
    settings: string;
    title: string;
    alt: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [cloned, setCloned] = useState(false); // Track if items are cloned

  useEffect(() => {
    // Intersection Observer to detect visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.15, // Adjust to pause when at least 25% is out of view (customize as needed)
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Clean up observer on unmount
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      if (!cloned) {
        addAnimation(); // Start animation and clone items only once
      }
      resumeAnimation(); // Resume the animation when visible
    } else {
      pauseAnimation(); // Pause the animation when not visible
    }
  }, [isVisible]);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Clone items only once
      if (!cloned) {
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });

        setCloned(true); // Mark items as cloned to prevent re-cloning
      }

      getDirection();
      getSpeed();
    }
  }

  const pauseAnimation = () => {
    if (scrollerRef.current) {
      scrollerRef.current.style.setProperty("animation-play-state", "paused");
    }
  };

  const resumeAnimation = () => {
    if (scrollerRef.current) {
      scrollerRef.current.style.setProperty("animation-play-state", "running");
    }
  };

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-screen [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          cloned && "animate-scroll", // Only start animation after items are cloned
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            className="w-[90vw] max-w-full relative flex-shrink-0 md:w-[60vw]"
            key={item.id}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span>
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={1500}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </span>
              <span
                className="absolute bottom-0 right-0 h-16 w-44 md:h-24 md:w-52 lg:h-32 lg:w-60 mr-5 mb-5 md:mr-10 md:mb-10 rounded-md"
                style={{
                  background: "rgba(65, 80, 95, 50%)",
                }}
              >
                <div className="lg:p-5 md:p3 p-2 font-light text-xs md:text-base lg:text-lg">
                  <p className="font-bold">{item.title}</p>
                  <p>Settings: {item.settings}</p>
                </div>
              </span>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
