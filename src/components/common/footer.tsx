import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-neutral-800/60 p-6 rounded-lg shadow-md text-center border-t border-neutral-700 pb-[70px]">
      <h3 className="text-xl font-semibold text-gray-200">¿Quiénes somos?</h3>
      <p className="text-gray-400 mt-2 text-sm max-w-3xl mx-auto">
        Somos una barbería dedicada a ofrecer servicios de alta calidad,
        combinando tradición y modernidad para brindarte una experiencia única.
        Nuestro equipo de expertos está listo para atenderte.
      </p>
      <div className="flex justify-center gap-6 mt-4">
        <a
          href="https://www.instagram.com/ventus.barbershop?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-red-400 transition-all"
        >
          <FaInstagram size={28} />
        </a>
        <a
          href="https://wa.me/5493364551193"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-green-400 transition-all"
        >
          <FaWhatsapp size={28} />
        </a>
      </div>
    </footer>
  );
}
