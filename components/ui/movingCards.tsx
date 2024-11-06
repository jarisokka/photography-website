"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import useIntersectionObserver from '../../lib/useIntersectionObserver';

export const MovingCards = ({
  items,
  direction = "left",
  speed = "fast",
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
  className?: string;
}) => {
  const { isIntersecting, elementRef } = useIntersectionObserver<HTMLDivElement>();
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [cloned, setCloned] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      if (!cloned) {
        addAnimation(); // Start animation and clone items only once
      }
      resumeAnimation(); // Resume the animation when visible
    } else {
      pauseAnimation(); // Pause the animation when not visible
    }
  }, [isIntersecting]);

  function addAnimation() {
    if (scrollerRef.current) {
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
    if (elementRef.current) {
      if (direction === "left") {
        elementRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        elementRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const getSpeed = () => {
    if (elementRef.current) {
      if (speed === "fast") {
        elementRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        elementRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        elementRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={elementRef}
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
                className="user-select-none z-[-1] pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
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
                className="absolute bottom-0 right-0 h-24 w-44 md:h-24 md:w-52 lg:h-32 lg:w-60 mr-5 mb-5 md:mr-10 md:mb-10 rounded-md"
                style={{
                  background: "rgba(65, 80, 95, 0.5)",
                }}
              >
                <div className="ml-2 lg:ml-3">
                  <p className="font-bold md:py-2 py-0 lg:text-lg text-base">{item.title}</p>
                  <p className="font-light p-0 py-0 lg:text-lg text-base">Settings: {item.settings}</p>
                </div>
              </span>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
