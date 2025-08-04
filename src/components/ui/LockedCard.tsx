import React from "react";

interface LockedCardProps {
  image: string;
}

const LockedCard: React.FC<LockedCardProps> = ({ image }) => {
  return (
    <button
      disabled
      className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center opacity-50 cursor-not-allowed"
    >
      <img
        src={image}
        alt="Locked"
        className="w-24 h-24 object-cover rounded-full mb-2"
      />
      <span className="text-white text-sm font-medium">Locked</span>
    </button>
  );
};

export default LockedCard;
