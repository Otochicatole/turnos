"use client";
import Image from "next/image";
import Link from "next/link";
import { GoHome } from "react-icons/go";
import { RiContactsLine } from "react-icons/ri";
import { MdCalendarToday } from "react-icons/md";
import { useNavBarContext } from "@/context/NavBarContext";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Home",
    href: "/",
    icon: <GoHome className="text-2xl" />,
  },
  {
    name: "Turnos",
    href: "/shifts",
    icon: <MdCalendarToday className="text-2xl" />,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: <RiContactsLine className="text-2xl" />,
  },
];

export const NavBar = () => {
  const { isHovered, setIsHovered } = useNavBarContext();
  const currentPath = usePathname();

  return (
    <>
      <nav
        style={{ zIndex: 1000 }}
        className={`hidden sm:flex fixed flex-col items-center py-3 bg-neutral-800 h-screen transition-all duration-300 overflow-hidden ${isHovered ? "w-[250px]" : "w-[80px]"}`}
      >
        <Image
          src="/logo.png"
          className="mb-10 invert cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out px-2"
          onClick={() => setIsHovered(!isHovered)}
          alt="Logo"
          width={200}
          height={200}
        />
        <ul className="flex flex-col w-full">
          {links.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className={`hover:bg-white/5 flex p-4 px-7 min-w-[250px] flex-row gap-3 w-full items-center ${currentPath === link.href ? "bg-white/10" : ""}`}
            >
              {link.icon}
              <span className={`${isHovered ? "block" : "hidden"}`}>
                {link.name}
              </span>
            </Link>
          ))}
        </ul>
      </nav>
      {/*Movile*/}
      <nav
        style={{ zIndex: 1000 }}
        className="fixed sm:hidden bottom-0 w-full bg-neutral-800 flex justify-around"
      >
        <ul className="flex flex-row w-full">
          {links.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className={`hover:bg-white/5 flex p-4 px-7 flex-row gap-3 w-full items-center justify-center ${currentPath === link.href ? "border-b" : ""}`}
            >
              {link.icon}
            </Link>
          ))}
        </ul>
      </nav>
    </>
  );
};
