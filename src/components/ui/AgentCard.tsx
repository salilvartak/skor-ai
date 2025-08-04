import React from "react";

interface AgentCardProps {
  name: string;
  image: string;
  onClick?: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ name, image, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex flex-col items-center transition hover:scale-105 hover:bg-white/20"
    >
      <img
        src={image}
        alt={name}
        className="w-24 h-24 object-cover rounded-full mb-2"
      />
      <span className="text-white text-sm font-medium">{name}</span>
    </button>
  );
};

export default AgentCard;
