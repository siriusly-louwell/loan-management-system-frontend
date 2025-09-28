import React from "react";
import BlueCheck from "../assets/icons/BlueCheck";
import Ex from "../assets/icons/Ex";

export default function TrackList({ label, sublabel, status }) {

  return (
    <li className={`mb-10 ms-6 ${status.check}`}>
      <span
        className={`absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-white dark:ring-gray-700 ${status.bg}`}>
        {status.type !== "deny" ? <BlueCheck /> : <Ex className="w-5 h-5" />}
      </span>
      <h4 className={`mb-0.5 text-base font-semibold ${status.label}`}>
        {label} {status.type === "current" && "(In progress...)"}
      </h4>
      <p className={`text-sm font-normal ${status.span}`}>{sublabel}</p>
    </li>
  );
}
