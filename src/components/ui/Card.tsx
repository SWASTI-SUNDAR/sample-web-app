import React from "react";

export function Card({
  children,
  className = "",
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`rounded-lg border p-4 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export default Card;
