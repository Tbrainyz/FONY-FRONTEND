import React, { useState, useRef, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const PriorityDropdown = ({ selected, onSelect }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // ✅ close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = ["All", "high", "medium", "low"];

  return (
    <div ref={ref} className="relative">
      {/* BUTTON */}
      <div
        className="border flex justify-center items-center w-[120px] h-[44px] rounded-[22px] gap-1 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <p>{selected || "All"}</p>
        <RiArrowDropDownLine className="w-6 h-6 text-gray-500" />
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute  top-[50px] w-full bg-white border rounded-[12px] shadow-lg z-50">
          {options.map((item) => (
            <p
              key={item}
              onClick={() => {
                onSelect(item === "All" ? "" : item);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-[#F6FBFF] cursor-pointer"
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default PriorityDropdown;