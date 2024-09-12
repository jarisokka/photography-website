"use client";
import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  as?: React.ElementType;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any; // For additional props
}

export function Button({
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: ButtonProps) {
  return (
    <Component
      className={cn(
        "bg-transparent relative text-xl p-[1px] overflow-hidden md:col-span-2 md:row-span-1",
        containerClassName
      )}
      {...otherProps}
    >
      <div className="absolute inset-0 rounded-inherit">
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-36 w-36 opacity-[0.8] bg-[radial-gradient(#FFFFFF_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative bg-slate-900/[0.] backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased rounded-inherit",
          className
        )}
      >
        {children}
      </div>
    </Component>
  );
}


interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: MovingBorderProps) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength() || 0;
    const pxPerMillisecond = length / duration;
    progress.set((time * pxPerMillisecond) % length);
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.x || 0);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.y || 0);

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};