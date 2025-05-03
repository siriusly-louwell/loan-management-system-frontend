import React from 'react';

export default function AvatarBttn({dropMenu}) {
    return (
        <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false"
          data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" onClick={dropMenu}>
          <span class="sr-only">Open user menu</span>
          <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
        </button>
    );
}