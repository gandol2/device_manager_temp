import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Device } from "@prisma/client";
import DeviceCard from "../components/DeviceCard";

const Home: NextPage = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    fetch("/api/device")
      .then((res) => res.json())
      .then((json) => setDevices(json.devices));
  }, []);

  return (
    <Layout title={"HOME"}>
      <div className="m-5 space-y-8">
        <div className="flex items-stretch justify-between">
          <div className="flex flex-col">
            <h2 className="text-3xl">Hello SunMoon 🖐</h2>
            <span className="text-lg dark:text-slate-400">
              Wellcome back to home
            </span>
          </div>
          {/* Welcome message */}
          <Link href="/setting">
            <a className="bg-[#363345] hover:bg-[#524d6b] w-[30%] flex items-center justify-center p-5 rounded-2xl dark:text-slate-100 text-slate-100">
              <div>Add Device</div>
              <div className="ml-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </a>
          </Link>
        </div>
        <div>
          <h2 className="text-2xl">Linked to you</h2>
        </div>
        <div className="flex flex-wrap justify-start">
          {0 < devices.length
            ? devices.map((device) => (
                <DeviceCard key={device.id} {...device} />
              ))
            : "디바이스를 등록 해주세요"}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
