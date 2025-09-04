import React from "react";
import { useSelector } from "react-redux";
import { UserEntity } from "../../services/entities/User";

export default function AvatarBttn({ dropMenu }) {
  const {pfp} = useSelector(UserEntity);
  const API_URL = process.env.REACT_APP_API_URL;
  const src = pfp
    ? `${API_URL}/storage/${pfp}`
    : "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png";

  return (
    <button
      type="button"
      class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      id="user-menu-button"
      onClick={dropMenu}>
      <span class="sr-only">Open user menu</span>
      <img class="w-8 h-8 rounded-full" src={src} alt="user photo" />
    </button>
  );
}
