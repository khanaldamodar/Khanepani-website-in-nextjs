import React from "react";

interface MemberCardProps {
  photo: string;
  name: string;
  number: string;
  position: string;
}

const MemberCard: React.FC<MemberCardProps> = ({
  photo,
  name,
  number,
  position,
}) => {
  return (
    <div className=" shadow-md rounded-lg overflow-hidden text-center transition hover:shadow-xl font-poppins">
      <img
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}storage/${photo}`}
        alt={name}
        className="w-full h-52 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg text-black font-semibold">{name}</h3>
        <p className="text-sm text-bkack opacity-60 mb-1">{position}</p>
        <p className="text-sm text-bkack">{number}</p>
      </div>
    </div>
  );
};

export default MemberCard;
