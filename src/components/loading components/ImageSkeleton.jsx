import React from "react";
import Image from "../../assets/icons/Image";

export default function ImageSkeleton({size, color = 'bg-gray-200 dark:bg-gray-500'}) {
    return (
        <div className={`w-full h-full rounded-lg ${color} animate-pulse flex items-center justify-center`}>
            <Image size={size} />
        </div>
    );
}