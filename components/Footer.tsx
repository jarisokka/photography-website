import React from 'react'
import { FloatingDock } from "@/components/ui/floatingDock";
import { IconBrandGithub } from "@tabler/icons-react";
import { BsInstagram, BsFacebook, BsYoutube } from 'react-icons/bs'
import { Fa500Px } from 'react-icons/fa'
import { FaRegEnvelope } from "react-icons/fa";
import CustomButton from './ui/customButton';

const Footer = () => {

  const links = [
    {
      title: "Instagram",
      icon: (
        <BsInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://instagram.com/jarisokka",
    },
 
    {
      title: "500px",
      icon: (
        <Fa500Px className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://500px.com/jarisokka",
    },
    {
      title: "Facebook",
      icon: (
        <BsFacebook className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://facebook.com/jarisokka",
    },
    {
      title: "YouTube",
      icon: (
        <BsYoutube className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.youtube.com/channel/UCrfBdIqXUqPBF2tdBc3cURA",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/jarisokka",
    },
  ];

  return (
    <footer className="relative w-full pt-10 pb-10" id="contact">
      <div className="pb-10 w-full flex justify-center items-center flex-col">
        <h1 className="text-4xl xl:text-6xl lg:text-5xl md:text-4xl font-bold dark:text-white">
          Reach Out Anytime
        </h1>
        <h2 className="font-light text-base lg:text-2xl md:text-xl dark:text-neutral-200 py-4">
          Don’t hesitate to contact me
        </h2>
        <a href="mailto:ig.jarisokka@gmail.com">
          <CustomButton
            title="Get in Touch"
            icon={<FaRegEnvelope />}
          />
        </a>
      </div> 
      <div className="flex flex-col sm:flex-row items-center justify-evenly">
        <h2 className="p-3 font-light text-base dark:text-neutral-200 text-center w-max[50%]">
          Copyright &copy; {new Date().getFullYear()} by Jari Sokka
        </h2>
        <div>
          <FloatingDock items={links} />
        </div>             
      </div>
    </footer>
  )
}

export default Footer
