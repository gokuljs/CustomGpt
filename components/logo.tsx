import React from "react";

const Logo = () => (
  <svg
    width="70px"
    height="70px"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Removed the <defs> and <style> tag as we'll use Tailwind classes */}
    <circle
      className="stroke-current text-slate-700"
      cx="24"
      cy="24"
      r="21.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      className="stroke-current text-slate-700"
      cx="24"
      cy="24"
      r="16.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      className="stroke-current text-slate-700"
      cx="24"
      cy="24"
      r="11.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      className="stroke-current text-slate-700"
      cx="24"
      cy="24"
      r="6.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Logo;
