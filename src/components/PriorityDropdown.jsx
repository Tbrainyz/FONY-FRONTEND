import React, { useState, useRef, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const PriorityDropdown = ({ selected, onSelect }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = ["All", "high", "medium", "low"];

  return (
    <div ref={ref} className="relative w-full sm:w-auto">
      <div
        className="border flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer bg-white hover:border-gray-400 transition"
        onClick={() => setOpen(!open)}
      >
        <span className="capitalize">{selected || "All"}</span>
        <RiArrowDropDownLine className={`text-2xl transition ${open ? "rotate-180" : ""}`} />
      </div>

      {open && (
        <div className="absolute mt-2 w-full bg-white border rounded-2xl shadow-lg z-50 py-2">
          {options.map((item) => (
            <div
              key={item}
              onClick={() => {
                onSelect(item === "All" ? "" : item);
                setOpen(false);
              }}
              className="px-5 py-3 hover:bg-gray-100 cursor-pointer capitalize"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PriorityDropdown;