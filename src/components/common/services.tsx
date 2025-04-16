import { BiKnife } from "react-icons/bi";
import { FaCut, FaUserTie, FaChild } from "react-icons/fa";

export default function ServiceCard() {
  const services = [
    { name: "Corte de cabello", icon: <FaCut size={24} /> },
    { name: "Afeitado clásico", icon: <BiKnife size={24} /> },
    { name: "Estilismo y asesoría", icon: <FaUserTie size={24} /> },
    { name: "Barbería infantil", icon: <FaChild size={24} /> },
  ];

  return (
    <div className="bg-neutral-900 text-gray-200 p-8 rounded-xl shadow-lg w-full">
      <h2 className="text-3xl md:text-5xl font-semibold bg-gradient-to-r from-gray-300 via-neutral-500 to-gray-300 bg-clip-text text-transparent text-center">
        Nuestros Servicios
      </h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-neutral-800 p-6 rounded-sm shadow-md text-center transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center space-y-4"
          >
            <div className="text-blue-500">{service.icon}</div>
            <span className="text-lg md:text-xl font-medium text-gray-100 tracking-wide">
              {service.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
