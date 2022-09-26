import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { cls } from "../libs/utils";

interface HeaderProps {
  title: String;
}

export default function Header(props: HeaderProps) {
  const [dark, setDark] = useState(false);
  function toggleDark() {
    setDark(!dark);
    if (!dark) {
      document.querySelector("body")?.classList.add("dark");
    } else {
      document.querySelector("body")?.classList.remove("dark");
    }
  }

  return (
    <header className="h-[100px] flex justify-center items-center border-b shadow dark:border-slate-500 w-full select-none">
      <h1 className="font-bold text-3xl">{props.title}</h1>
      <button
        className="absolute right-10 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg p-2"
        onClick={toggleDark}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      </button>
    </header>
  );
}
