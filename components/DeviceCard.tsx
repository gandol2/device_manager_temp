import { Device } from "@prisma/client";
import { useEffect, useState } from "react";
export default function DeviceCard(props: Device) {
  const [typeStr, setTypeStr] = useState("");
  useEffect(() => {
    switch (props.type) {
      case "TEMP":
        setTypeStr("온도");
        break;
      case "HUMI":
        setTypeStr("습도");
        break;
      default:
        setTypeStr(props.type);
        break;
    }
  }, [props.type]);
  return (
    <div className="border m-2 p-5 rounded-xl w-60 h-52 shadow-2xl flex flex-col justify-between bg-[#363345] hover:bg-[#524d6b] text-slate-200">
      <div className="flex justify-between">
        <div>{/* <div>{props.id}</div> */}</div>
        <div className="flex">
          <div className="text-4xl font-bold">100</div>
          <div className="text-lg ml-1">{props.unit}</div>
        </div>

        {/* <div>{props.state}</div> */}
      </div>
      <div>
        <div className="text-slate-400">
          <span className="font-bold">{props.location}</span>
          <span className="ml-1">{props.memo}</span>
        </div>
        <div className="text-3xl font-bold">{typeStr}</div>
      </div>
      {/* <div>{props.id}</div>
      <div>{props.createdAt.toString()}</div> */}
    </div>
  );
}
