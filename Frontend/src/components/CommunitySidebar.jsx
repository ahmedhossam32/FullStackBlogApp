import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";
import api from "../api";

function CommunitySidebar({ community }) {
  const [isMember, setIsMember] = useState(false);
  const [memberCount, setMemberCount] = useState(0);
  const [owner, setOwner] = useState(null);
  const navigate = useNavigate();
  const currentUser = getUser();

  useEffect(() => {
    if (!community) return;

    const fetchMembers = async () => {
      try {
        const res = await api.get(`/communities/${community.id}/members`);
        const members = res.data || [];
        setMemberCount(members.length);
        setIsMember(
          currentUser && members.some((m) => m.id === currentUser.id)
        );
        const ownerUser = members.find((m) => m.id === community.owner?.id);
        setOwner(ownerUser || community.owner);
      } catch (err) {
        console.error("Failed to load community members:", err);
      }
    };

    fetchMembers();
  }, [community, currentUser]);

  if (!community) return null;

  const handleJoinLeave = async () => {
    if (!currentUser) return;

    try {
      if (isMember) {
        await api.post(`/communities/${community.id}/leave`);
      } else {
        await api.post(`/communities/${community.id}/join`);
      }

      // Refresh state
      const res = await api.get(`/communities/${community.id}/members`);
      const updatedMembers = res.data || [];
      setMemberCount(updatedMembers.length);
      setIsMember(updatedMembers.some((m) => m.id === currentUser.id));
    } catch (err) {
      console.error("Join/leave failed:", err);
    }
  };

  const handleAddPost = () => {
    if (!currentUser) return;
    navigate(`/create-blog?communityId=${community.id}`);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const baseBtn =
    "w-full py-2 text-sm font-serif font-semibold rounded-none border transition";
  const btnDefault = `${baseBtn} border-gray-400 text-gray-600 bg-transparent hover:bg-black hover:text-white`;
  const btnBlack = `${baseBtn} border-black bg-black text-white hover:bg-gray-800`;

  return (
    <div className="space-y-6 font-sans text-gray-700 text-sm">
      <div className="shadow p-4 border border-gray-200 rounded-none">
        <div className="flex flex-col items-center text-center">
          <img
            src={community.image}
            alt={community.name}
            className="mb-3 rounded w-24 h-24 object-cover"
          />

          <h2 className="mb-1 font-serif font-bold text-black text-lg">
            r/{community.name}
          </h2>
          <p className="mb-4 text-gray-600 text-sm">{community.description}</p>

          {owner && (
            <div className="flex justify-center items-center gap-2 mb-2">
              <img
                src={owner.avatar}
                alt={owner.name}
                className="rounded-full w-6 h-6 object-cover"
              />
              <span className="font-medium text-gray-700 text-sm">
                Owner: {owner.name}
              </span>
            </div>
          )}

          <p className="mb-3 text-gray-500 text-sm">Members: {memberCount}</p>

          {currentUser ? (
            <>
              <button onClick={handleJoinLeave} className={btnDefault}>
                {isMember ? "Leave Community" : "Join Community"}
              </button>

              {isMember && (
                <button onClick={handleAddPost} className={btnBlack}>
                  Add Post
                </button>
              )}
            </>
          ) : (
            <button
              onClick={handleLoginRedirect}
              className="bg-gray-600 hover:bg-gray-700 py-2 rounded w-full font-serif font-semibold text-white text-sm"
            >
              Login to join or post
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommunitySidebar;
