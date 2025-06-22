"use client";

import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

export default function CarHeaderInfo({ title, price }) {
  return (
    <>
      {/* <Link
        href="/carros"
        className="inline-flex items-center gap-2 text-[var(--blue-main)] hover:text-[var(--blue-hover)] font-medium mb-6 transition-all bg-[var(--gray-hover)] hover:bg-[var(--gray-border)] px-4 py-2 rounded-full shadow"
      >
        <ArrowLeftCircle className="w-5 h-5 icon-color" /> Volver a Carros
      </Link> */}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 animate-fade-in-up gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-default)] leading-snug">
          {title}
        </h1>
        <span className="inline-block text-black bg-[var(--btn-primary)] px-4 py-1 rounded-full font-semibold text-lg shadow">
          ${price.toLocaleString()}
        </span>
      </div>
    </>
  );
}
