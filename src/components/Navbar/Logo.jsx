// components/Navbar/Logo.jsx
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <svg
        className="w-6 h-6 text-[#0F1C46]"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 2L2 7v11h6v-5h4v5h6V7l-8-5z" />
      </svg>
      <div className="text-2xl font-bold text-yellow-400">
        IM<span className="text-[#0F1C46]">NOVA</span> •
      </div>
    </Link>
  );
}
