import React from "react";

export default function Stepper({ children }) {
  return (
    <ol className="space-y-4 w-72 hidden sm:block sticky top-0">{children}</ol>
  );
}
