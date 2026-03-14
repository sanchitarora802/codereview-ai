"use client";

export default function Tooltip({ content, place = "top", children }) {
  const position =
    place === "top"
      ? "bottom-full mb-1.5 left-1/2 -translate-x-1/2"
      : place === "bottom"
        ? "top-full mt-1.5 left-1/2 -translate-x-1/2"
        : place === "left"
          ? "right-full mr-1.5 top-1/2 -translate-y-1/2"
          : "left-full ml-1.5 top-1/2 -translate-y-1/2";

  return (
    <span className="relative group/tooltip inline-block">
      {children}
      <span
        className={`absolute ${position} z-50 pointer-events-none
          invisible opacity-0 group-hover/tooltip:visible group-hover/tooltip:opacity-100
          transition-opacity duration-150
          bg-gray-800 text-white text-xs rounded-lg px-3 py-1.5 shadow-lg whitespace-nowrap`}
      >
        {content}
      </span>
    </span>
  );
}
