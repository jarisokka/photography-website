"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LogoSVG from "./logoSvg";

type navItems = {
  name: string;
  link: string;  
}

export const FloatingNav = ({
  navItems,
}: {
  navItems: navItems[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
<AnimatePresence mode="wait">
  {/* Wrapper container for positioning */}
  <div className="fixed top-0 left-0 w-full z-[5000] flex items-start justify-between pointer-events-none px-4">
    {/* Logo Motion Div */}
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -50 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="relative mt-4 ml-4 p-1 w-24 h-24 md:w-32 md:h-32 rounded-full bg-white border-2 border-gray-200 shadow-lg items-center justify-center pointer-events-auto hidden sm:block"
    >
      <LogoSVG className="animated-svg" />
    </motion.div>

    {/* Navbar Motion Div */}
    <motion.div
      initial={{
        opacity: 0,
        y: -100,
      }}
      animate={{
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        duration: 0.2,
      }}
      className={cn(
         "flex max-w-fit min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-lg border border-gray-200 shadow-md items-center justify-center space-x-4 pointer-events-auto"
      )}
      style={{
        backdropFilter: "blur(16px) saturate(180%)",
        backgroundColor: "rgba(65, 80, 95, 10%)",
        borderRadius: "12px",
        border: "2px solid rgba(255, 255, 255, 0.125)",
      }}
    >
      {navItems.map((navItem: navItems, idx: number) => (
        <Link
          key={`link=${idx}`}
          href={navItem.link}
          className={cn(
            "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
          )}
        >
          <span className="text-sm !cursor-pointer">{navItem.name}</span>
        </Link>
      ))}
    </motion.div>
  </div>
</AnimatePresence>

  );
};
