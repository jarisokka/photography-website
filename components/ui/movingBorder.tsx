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
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  [key: string]: any;
}

const Button = ({
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  style,
  ...otherProps
}: ButtonProps) => {
  return (
    <Component
      className={cn(
        "relative text-xl p-[1px] overflow-hidden rounded-md",
        containerClassName
      )}
      {...otherProps}
      style={{
        borderRadius: "inherit",
        ...style,
      }}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: "inherit", overflow: "hidden" }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-36 w-36 opacity-[0.8] bg-[radial-gradient(#FFFFFF_40%,transparent_60%)]",
              borderClassName
            )}
            style={{ borderRadius: "inherit", backgroundColor: "inherit" }}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative bg-slate-900/[0.] backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
          className
        )}
        style={{
          borderRadius: "inherit",
          backgroundColor: style?.backgroundColor || "rgba(65, 80, 95, 0.1)"
        }}
      >
        {children}
      </div>
    </Component>
  );
};

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  [key: string]: any;
}

const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: MovingBorderProps) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue(0);

  // Ref to cache the total length of the path
  const pathLength = useRef<number | null>(null);

  useAnimationFrame((time) => {
    if (!pathRef.current) return;

    // Calculate the length only once and cache it
    if (pathLength.current === null) {
      pathLength.current = pathRef.current.getTotalLength();
    }

    const length = pathLength.current || 0;
    const pxPerMillisecond = length / duration;

    // Update progress for the animation based on time
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
        style={{ borderRadius: "inherit" }}
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
          borderRadius: "inherit",
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

// Wrapping both components in React.memo
export default React.memo(Button);
export const MemoizedMovingBorder = React.memo(MovingBorder);
