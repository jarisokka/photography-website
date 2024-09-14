"use client";
import React from "react";

const CustomButton = ({
  title,
  icon,
  handleClick,
  otherClasses,
}: {
  title: string;
  icon?: React.ReactNode;
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  return (
    <button
      className="relative inline-flex h-12 lg:w-60 sm:w-50 md:mt-10 overflow-hidden rounded-lg p-[3px] border border-white focus:outline-none hover:bg-[rgba(65,80,95,0.5)]"
      onClick={handleClick}
    >
      <span
        className={`px-3 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg
            bg-transparent md:text-base text-xs dark:text-neutral-200 gap-2 ${otherClasses}`}
      >
        {title}
        <span className="lg:text-lg sm:font-sm">{icon}</span>
      </span>
    </button>
  );
};

export default React.memo(CustomButton);
