import React from "react";
import Image from "../../assets/icons/Image";

export default function ImageSkeleton({
  size,
  rounded = false,
  color = "bg-gray-200 dark:bg-gray-600",
}) {
  return (
    <div
      className={`w-full h-full ${
        rounded ? "rounded-full" : "rounded-lg"
      } ${color} animate-pulse flex items-center justify-center`}>
      <Image size={size} />
    </div>
  );
}
