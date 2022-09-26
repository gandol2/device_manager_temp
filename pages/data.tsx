import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Device } from "@prisma/client";

const Data: NextPage = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectId, setSelectId] = useState("");
  const [measureValue, setMeasureValue] = useState("");

  function 측정값등록(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectId) {
      alert("장치를 선택 해주세요");
      return;
    }

    if (!measureValue) {
      alert("측정값을 입력 해주세요");
      return;
    }

    const data = {
      value: measureValue,
    };

    fetch(`/api/measure/${selectId}`, {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => {
      if (200 === res.status) {
        alert("등록 성공");
        // setSelectId("");
        // setMeasureValue("");
      } else {
        alert(`등록 실패 : status code(${res.status})`);
      }
    });
  }

  useEffect(() => {
    fetch("/api/device")
      .then((res) => res.json())
      .then((json) => setDevices(json.devices));
  }, []);

  return (
    <Layout title={"DATA"}>
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">Select Device</h2>
        <select
          className="w-full h-10 dark:bg-slate-600"
          value={selectId}
          onChange={(e) => setSelectId(e.currentTarget.value)}
        >
          <option hidden>장치 선택</option>
          {devices.map((device) => (
            <option key={device.id} value={device.id}>
              {device.type} ({device.location}
              {device.memo ? ` - ${device.memo}` : null})
            </option>
          ))}
        </select>
      </div>

      <div className="mt-10">
        {selectId ? (
          <form className="space-y-5" onSubmit={측정값등록}>
            <div className="font-bold">장비ID : {selectId}</div>
            <div className="space-y-3">
              <label className="font-bold" htmlFor="value">
                Value
              </label>
              <input
                id="value"
                type={"text"}
                className="w-full h-10 px-2"
                value={measureValue}
                onChange={(e) => setMeasureValue(e.target.value)}
              />
              <input
                type={"submit"}
                value={"등록"}
                className="w-full bg-slate-600 text-white py-3 rounded-lg cursor-pointer hover:bg-slate-500"
              />
            </div>
          </form>
        ) : null}
      </div>
    </Layout>
  );
};

export default Data;
