import React from "react";

const icons = [
  {
    name: "Facebook",
    link: "https://facebook.com",
    color: "from-blue-500 to-blue-700 border-blue-400/50",
    path: "M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5V12H16l-.4 3h-2.3v7A10 10 0 0 0 22 12z",
  },

  {
    name: "X",
    link: "https://x.com",
    color: "from-gray-800 to-black border-gray-700/50",
    path: "M18.244 2H21l-6.5 7.43L22 22h-6.828l-5.34-6.993L3.5 22H1l7.02-8.03L2 2h6.828l4.87 6.4L18.244 2zm-1.2 18h1.7L7.1 4H5.3l11.744 16z",
  },
  {
    name: "Instagram",
    link: "https://instagram.com",
    color: "from-pink-500 via-red-500 to-yellow-500 border-pink-400/50",
    path: "M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm5 4a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.5-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  },
  {
    name: "TikTok",
    link: "https://tiktok.com",
    color: "from-black to-gray-800 border-gray-700/50",
    path: "M12 2v12.5a3.5 3.5 0 1 1-3.5-3.5c.28 0 .55.03.8.1V8.6a6.5 6.5 0 1 0 6.5 6.4V8.5c1.3.9 2.9 1.4 4.5 1.4V7.1c-1.2 0-2.3-.4-3.2-1.1-.9-.7-1.5-1.7-1.8-2.8H12z",
  },

  {
    name: "WhatsApp",
    link: "https://wa.me/",
    color: "from-green-500 to-green-700 border-green-400/50",
    path: "M20.52 3.48A11.94 11.94 0 0 0 12.05 0C5.42 0 .05 5.37.05 12c0 2.11.55 4.17 1.6 5.99L0 24l6.17-1.62A11.94 11.94 0 0 0 12.05 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.53-8.52zM12.05 21.82c-1.87 0-3.7-.5-5.3-1.45l-.38-.22-3.66.96.98-3.57-.24-.37a9.79 9.79 0 1 1 8.6 4.65zm5.4-7.37c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.5-1.8-1.68-2.1-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.48s1.08 2.87 1.23 3.07c.15.2 2.13 3.25 5.17 4.56.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z",
  },
];

function SocialDock() {
  return (
    <>
    <svg className="absolute">
        <defs>
          <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5" />
          </clipPath>
        </defs>
      </svg>



      <div className=" flex  gap-3 ">
        {icons.map((icon, i) => (
          <a
            key={i}
            href={icon.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div
              style={{ clipPath: "url(#squircleClip)" }}
              className={`w-12 h-12 bg-linear-to-br ${icon.color}
                  flex items-center justify-center shadow-lg
                  transform transition-all duration-300 ease-out
                  hover:scale-110 hover:-translate-y-2 hover:shadow-2xl`}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-10 text-white"
                fill="currentColor"
              >
                <path d={icon.path} />
              </svg>
            </div>

            {/* Tooltip */}
            <span
              className="absolute -top-12 left-1/2 -translate-x-1/2 
                  opacity-0 md:group-hover:opacity-100 
                  text-xl text-white bg-black px-2 py-1 rounded transition"
            >
              {icon.name}
            </span>
          </a>
        ))}
      </div>
    </>
  );
}

export default SocialDock;