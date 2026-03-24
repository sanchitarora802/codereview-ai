"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function CustomSelect({ value, onChange, options, placeholder = "Select", className = "" }) {
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});
  const triggerRef = useRef(null);

  const selected = options.find((o) => o.value === value);

  const handleOpen = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const menuHeight = Math.min(options.length * 36 + 8, 200);
    const openUpward = spaceBelow < menuHeight + 8;

    setMenuStyle({
      position: "absolute",
      left: rect.left + window.scrollX,
      width: rect.width,
      ...(openUpward
        ? { top: rect.top + window.scrollY - menuHeight - 4 }
        : { top: rect.bottom + window.scrollY + 4 }),
      zIndex: 9999,
    });
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (!triggerRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={triggerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : handleOpen())}
        className="w-full flex items-center justify-between border border-gray-300 rounded-lg pl-3 pr-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        <span className={selected ? "text-gray-900" : "text-gray-400"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {open && createPortal(
        <ul
          style={menuStyle}
          className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto max-h-48 py-1"
        >
          <li
            onMouseDown={() => { onChange(""); setOpen(false); }}
            className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-600 ${!value ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-400"}`}
          >
            {placeholder}
          </li>
          {options.map((opt) => (
            <li
              key={opt.value}
              onMouseDown={() => { onChange(opt.value); setOpen(false); }}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-600 ${opt.value === value ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700"}`}
            >
              {opt.label}
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  );
}
