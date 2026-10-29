export function MainLogo() {
  return (
    <a className="flex items-center gap-2 group" href="#">
      <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-white shadow-sm overflow-hidden p-0.5">
        <svg
          className="w-full h-full"
          fill="none"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 15 H90 V50 C90 75 50 95 50 95 C50 95 10 75 10 50 Z"
            fill="#cc1426"
            stroke="#1e3a8a"
            stroke-width="4"
          ></path>
          <path d="M10 15 H50 V50 H10 Z" fill="#1e3a8a"></path>
          <polygon
            fill="#ffffff"
            points="30,22 34,34 46,34 36,42 40,54 30,46 20,54 24,42 14,34 26,34"
            transform="scale(0.7) translate(12, 10)"
          ></polygon>
          <circle
            cx="70"
            cy="50"
            fill="#ffffff"
            r="16"
            stroke="#1e293b"
            stroke-width="2"
          ></circle>
          <path d="M64 42 L76 42 L80 50 L70 58 L60 50 Z" fill="#1e293b"></path>
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-black text-xl tracking-tight text-white font-mono">
          RNFC
        </span>
      </div>
    </a>
  );
}
