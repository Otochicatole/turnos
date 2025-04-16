"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ServiceCard from "@/components/common/services";
import Footer from "@/components/common/footer";
import ThreeDModel from "@/components/common/3d-model";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className=" text-white flex flex-col items-center justify-center bg-[url(/img.jpg)] bg-cover h-screen rounded-b-[20px]">
        <div className="flex flex-col w-full h-full bg-black/90 px-6 items-center justify-center rounded-b-[20px]">
          <ThreeDModel />
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-center text-gray-400"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            Bienvenido a Ventus
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mt-2 text-center bg-gradient-to-r from-gray-100 via-neutral-400 to-blue-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Donde el estilo y la precisión se encuentran.
          </motion.p>
          <button
            onClick={() => router.push("/shifts")}
            className="relative mt-10 cursor-pointer group inline-flex items-center px-8 py-2.5 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-lg hover:text-white group hover:bg-gray-50"
          >
            <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="relative text-base font-semibold transition-all duration-300 group-hover:-translate-x-3">
              Sacar Turno
            </span>
          </button>
        </div>
      </div>
      <div className="mt-6 text-center p-3 pb-40">
        <ServiceCard />
      </div>
      <Footer />
    </>
  );
}
