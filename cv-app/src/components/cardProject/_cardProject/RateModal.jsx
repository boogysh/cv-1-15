// import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import StarRating from "./StarRating";

const RateModal = ({ setShowRateModal }) => {
  // // 🔒 Bloquer le scroll du body quand la modale est ouverte
  // useEffect(() => {
  //   document.body.classList.add("overflow-hidden");
  //   return () => document.body.classList.remove("overflow-hidden");
  // }, []);

  const handleClose = () => setShowRateModal(false);

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 bg-black/70
                 animate-fadeIn"
      onClick={handleClose} // ferme si on clique sur le fond
    >
      <div
        className="relative flex flex-col items-center px-9 pt-10 pb-4 max-w-sm mx-auto
                   bg-white rounded-2xl shadow transform transition-all animate-scaleIn"
        onClick={(e) => e.stopPropagation()} // empêche la fermeture au clic dans la modale
      >
        {/* Bouton fermer */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 border border-transparent hover:border-gray-800/50 rounded-full p-1 transition"
        >
          <IoClose className="w-5 h-5" />
        </button>

        {/* Titre */}
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Évaluez ce projet !
        </h2>

        {/* StarRating */}
        <StarRating totalStars={5} initialRating={0} />

        {/* Bouton évaluer */}
        <button className="rounded-[5px] px-4 py-1 mt-7 mb-2 bg-[#ebdede] hover:bg-[#e0d1d1] border border-gray-800/50 transition">
          Évaluez
        </button>
      </div>
    </div>
  );
};

export default RateModal;


