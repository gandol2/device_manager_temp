import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { DeviceType, Device } from "@prisma/client";
import { useRouter } from "next/router";

const Setting: NextPage = () => {
  const [type, setType] = useState<DeviceType | "">("");
  const [location, setLocation] = useState("");
  const [unit, setUnit] = useState("");
  const [memo, setMemo] = useState("");
  const [error, setError] = useState("");
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    fetch("/api/device")
      .then((res) => res.json())
      .then((json) => setDevices(json.devices));
  }, []);

  const router = useRouter();

  function 장비추가버튼() {
    const add_device = document.querySelector("#add_device");
    add_device?.classList.toggle("hidden");
  }

  function 장치종류변경(event: React.ChangeEvent<HTMLSelectElement>) {
    switch (event.target.value) {
      case "TEMP":
        setType("TEMP");
        setUnit("℃");
        break;
      case "HUMI":
        setType("HUMI");
        setUnit("%");
        break;
      case "CO2":
        setType("CO2");
        setUnit("ppm");
        break;
      default:
        setUnit("");
        break;
    }
  }

  function 장비등록(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!type) {
      setError("장치종류를 선택 하세요");
      return;
    }
    if (!location) {
      setError("장치 위치를 입력 하세요");
      return;
    }

    const data = {
      type,
      location,
      unit,
      memo,
    };

    fetch("/api/device/add", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response.status);
        if (200 !== response.status) {
          return response.json();
        }
        return router.push("/");
      })
      .then((json) => {
        setError(`장치 등록 실패 - ${json}`);
      });
  }

  function 장치삭제(event: React.MouseEvent<HTMLButtonElement>) {
    const { deviceid } = event.currentTarget.dataset;

    if (confirm(`Device 삭제 할까요?\n${deviceid}`)) {
      fetch(`/api/device/${deviceid}`, { method: "DELETE" }).then(
        (response) => {
          if (200 === response.status) {
            console.log("삭제 완료");
            router.reload();
          } else {
            alert("Device 삭제 실패");
          }
        }
      );
    }
  }
  return (
    <Layout title={"SETTING"}>
      <div className="space-y-10">
        <div className="flex justify-end mx-2">
          <button
            className="px-3 py-2 bg-slate-300 rounded-xl dark:bg-slate-600"
            onClick={장비추가버튼}
          >
            Add Device +
          </button>
        </div>
        <div
          id="add_device"
          className="space-y-5 bg-slate-200 p-2 rounded dark:bg-slate-800 hidden"
        >
          <div className="border-b-2" />
          <h2 className="text-2xl font-bold">New Device</h2>
          <form
            action="/api/device/add"
            method="post"
            className="w-full space-y-4"
            onSubmit={장비등록}
          >
            <select
              value={type}
              onChange={장치종류변경}
              className="w-full h-10 dark:bg-slate-600"
            >
              <option value="" hidden>
                장치 종류
              </option>
              <option value="TEMP">온도 센서</option>
              <option value="HUMI">습도 센서</option>
              <option value="CO2">CO2 센서</option>
            </select>
            <div className="font-bold">location *</div>
            <input
              type="text"
              className="w-full h-10 px-2"
              placeholder="거실, 안방.."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></input>

            <div className="font-bold">unit</div>
            <input
              type="text"
              className="w-full h-10 px-2"
              placeholder="측정단위 (eg:℃, %)"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            ></input>

            <div className="font-bold">memo</div>
            <input
              type="text"
              className="w-full h-10 px-2"
              placeholder="메모를 입력하세요..."
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            ></input>

            <input
              type={"submit"}
              value={"등록"}
              className="w-full bg-slate-600 text-white py-3 rounded-lg cursor-pointer hover:bg-slate-500"
            />
            {error ? (
              <span className="text-red-500 font-bold">{error}</span>
            ) : null}
          </form>
          <div className="border-b-2" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Device's</h2>
          <div>
            {devices.map((device) => (
              <div
                key={device.id}
                className="border-b my-2 py-2 flex justify-between items-center"
              >
                <div>
                  <div className="text-sm">ID : {device.id}</div>
                  <div>
                    <span>{device.type} - </span>
                    <span>{device.location}</span>
                    {device.memo ? <span> ({device.memo})</span> : null}
                  </div>
                </div>
                <div>
                  <button
                    className="text-red-700 bg-pink-100 dark:bg-pink-300 p-3 rounded-xl"
                    data-deviceid={device.id}
                    onClick={장치삭제}
                  >
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Setting;
