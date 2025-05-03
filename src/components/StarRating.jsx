import React from 'react';
import Star from '../assets/icons/Star';

export default function StarRating({rating, rates}) {
    return (
        <div class="mt-2 flex items-center gap-2">
            <div class="flex items-center">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
            </div>

            <p class="text-sm font-medium text-gray-900 dark:text-white">{rating}</p>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{rates}</p>
        </div>
    );
}