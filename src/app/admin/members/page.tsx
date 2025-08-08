"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Cookies from "js-cookie";

interface Member {
  id: number;
  name: string;
  number: string;
  position: string;
  type: "board" | "staff";
  photo: string; // URL to the image
}

export default function MembersList() {
  const [members, setMembers] = useState<Member[]>([]);
  const [filter, setFilter] = useState<"all" | "board" | "staff">("all");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = Cookies.get("token"); // Replace with your token retrieval logic
        const res = await fetch("http://127.0.0.1:8000/api/members", {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your token
          },
        });
        const data = await res.json();
        setMembers(data);
      } catch (error) {
        console.error("Failed to fetch members");
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers =
    filter === "all"
      ? members
      : members.filter((member) => member.type === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Members List</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="border px-3 py-1 rounded"
        >
          <option value="all">All</option>
          <option value="board">Board</option>
          <option value="staff">Staff</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Photo</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Number</th>
              <th className="px-4 py-3 text-left">Position</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-3">{member.name}</td>
                <td className="px-4 py-3">{member.number}</td>
                <td className="px-4 py-3">{member.position}</td>
                <td className="px-4 py-3 capitalize">{member.type}</td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <button title="View">
                    <Eye className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                  </button>
                  <button title="Edit">
                    <Pencil className="h-5 w-5 text-yellow-600 hover:text-yellow-800" />
                  </button>
                  <button title="Delete" onClick={() => handleDelete(member.id)}>
                    <Trash2 className="h-5 w-5 text-red-600 hover:text-red-800" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredMembers.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this member?")) return;
    // Add your delete logic here (API call and update state)
    console.log("Deleting member with id:", id);
  }
}
