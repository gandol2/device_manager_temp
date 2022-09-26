import Link from "next/link";
import { useState } from "react";
import { cls } from "../libs/utils";
import Header from "./Header";
import Nav from "./Nav";

interface LayoutProps {
  title: String;
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  return (
    <div className="flex justify-center h-[100vh] bg-white ">
      <div
        id="sunmoon"
        className="w-[640px] h-full text-[#262941] dark:text-slate-100 dark:bg-[#262941] bg-slate-100 relative flex flex-col justify-between dark:bg-gradient-to-t from-[#201f36] to-[#444e6d]"
      >
        <Header title={props.title} />

        <div className="h-full w-full p-5 overflow-y-scroll">
          {props.children}
        </div>
        <footer className="h-[100px] border-t">
          <Nav />
        </footer>
      </div>
    </div>
  );
}
