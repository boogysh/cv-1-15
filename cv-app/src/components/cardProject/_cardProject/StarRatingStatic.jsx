import React from "react";
import { FaStar } from "react-icons/fa";

/**
 * Composant statique d'affichage d'étoiles pleines.
 * @param {number} rating - Note entre 0 et totalStars.
 * @param {number} totalStars - Nombre total d'étoiles (par défaut 5).
 * @param {number} size - Taille des étoiles (ex: 20, 24, 32).
 */
export default function StarRatingStatic({
  rating = 0,
  totalStars = 5,
  size = 24,
}) {
  const fullStars = Math.round(rating); // arrondi au plus proche entier

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: totalStars }, (_, index) => (
        <FaStar
          key={index}
          size={size}
          className={index < fullStars ? "text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
}
