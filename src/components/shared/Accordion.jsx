"use client";

import { useState } from "react";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="rounded-xl overflow-hidden">
            <button
              onClick={() => toggle(index)}
              className={`w-full flex items-center justify-between px-6 py-5 text-left bg-white border hover:bg-gray-50 transition-colors ${isOpen ? "border-b-0 rounded-t-xl border-gray-200" : "border-gray-200 rounded-xl"}`}
            >
              <span className="text-base font-semibold text-gray-900 pr-4">
                {item.question}
              </span>
              <span
                className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                isOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <p className="px-6 py-5 text-gray-600 bg-blue-500/10 border border-t-0 border-gray-200 rounded-b-xl">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
