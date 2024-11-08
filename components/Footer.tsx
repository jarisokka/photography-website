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
        <BsInstagram className="h-full w-full text-neutral-300" />
      ),
      href: "https://instagram.com/jarisokka",
    },
 
    {
      title: "500px",
      icon: (
        <Fa500Px className="h-full w-full text-neutral-300" />
      ),
      href: "https://500px.com/jarisokka",
    },
    {
      title: "Facebook",
      icon: (
        <BsFacebook className="h-full w-full text-neutral-300" />
      ),
      href: "https://facebook.com/jarisokka",
    },
    {
      title: "YouTube",
      icon: (
        <BsYoutube className="h-full w-full text-neutral-300" />
      ),
      href: "https://www.youtube.com/channel/UCrfBdIqXUqPBF2tdBc3cURA",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-300" />
      ),
      href: "https://github.com/jarisokka",
    },
  ];

  return (
    <footer className="relative w-full py-10" id="contact">
      <div className="md:pb-10 pb-16 w-full flex justify-center items-center flex-col">
        <h1>
          Reach Out Anytime
        </h1>
        <h2>
          Don’t hesitate to contact me
        </h2>
        <div className="md:mt-0 mt-4">
          <a href="mailto:ig.jarisokka@gmail.com">
            <CustomButton
              title="Get in Touch"
              icon={<FaRegEnvelope />}
            />
          </a>
        </div>
      </div> 
      <div className="flex flex-col md:mt-10 sm:flex-row items-center justify-evenly">
        <p className="p-3 text-center w-max[50%] order-2 sm:order-1">
          Copyright &copy; {new Date().getFullYear()} by Jari Sokka
        </p>
        <div className="order-1 sm:order-2">
          <FloatingDock items={links} />
        </div>             
      </div>
    </footer>
  )
}

export default Footer
