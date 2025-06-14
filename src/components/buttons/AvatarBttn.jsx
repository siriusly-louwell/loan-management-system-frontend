import React from 'react';

export default function AvatarBttn({dropMenu, img = ''}) {
  const src = img === '' ? "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" : `http://localhost:8000/storage/${img}`;

    return (
        <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" onClick={dropMenu}>
          <span class="sr-only">Open user menu</span>
          <img class="w-8 h-8 rounded-full" src={src} alt="user photo" />
        </button>
    );
}