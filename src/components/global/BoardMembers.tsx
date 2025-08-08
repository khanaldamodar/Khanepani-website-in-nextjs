"use client";

import React, { useEffect, useState } from "react";
import MemberCard from "./IndividualMember";

interface Member {
  id: number;
  name: string;
  photo: string | null;
  number: string;
  position: string;
  type: string;
}

const BoardMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}members`);

        if (!res.ok) throw new Error("Failed to fetch members");

        const data: Member[] = await res.json();

        // Filter members with type "board"
        const boardMembers = data.filter((member) => member.type === "board");
        setMembers(boardMembers);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) return <p className="text-white text-center">Loading members...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="p-6 rounded-lg shadow-md text-white text-center font-poppins bg-[#4A596B] flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-0">
        <h1 className="text-2xl font-semibold mb-4">कार्य समिति</h1>
        <p>Board Members (2080 – 2084)</p>
      </div>

      {members.length === 0 ? (
        <p className="text-white">No board members found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {members.map((member) => (
            <MemberCard
              key={member.id}
              {...member}
              photo={member.photo ?? ""}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardMembers;
