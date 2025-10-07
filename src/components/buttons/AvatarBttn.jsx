import React from "react";
import { useSelector } from "react-redux";
import { UserEntity } from "../../services/entities/User";

export default function AvatarBttn({ dropMenu, pfp }) {
  const user = useSelector(UserEntity);

  return (
    <button
      type="button"
      className="flex text-sm bg-gray-200 dark:bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      id="user-menu-button"
      onClick={dropMenu}>
      <span className="sr-only">Open user menu</span>
      {user.imgURL ? (
        <img
          className="w-9 h-9 rounded-full object-cover"
          src={user.imgURL}
          alt="user"
        />
      ) : (
        <div className="h-9 w-9 dark:text-white flex items-center justify-center text-md font-medium">
          {user.initials}
        </div>
      )}
    </button>
  );
}
