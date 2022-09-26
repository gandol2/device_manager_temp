import { Device, Measures } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { cls } from "../libs/utils";

const fetcher = (url: string) => fetch(url).then((response) => response.json());
interface DeviceCardProps extends Device {
  realTime: boolean;
}

interface Response {
  ok: boolean;
  value?: String | null;
}

export default function DeviceCard(props: DeviceCardProps) {
  const [typeStr, setTypeStr] = useState("");
  const [value, setValue] = useState("");
  const [updateClass, setUpdateClass] = useState("");
  const [timerID, setTimerID] = useState<NodeJS.Timeout>();
  const router = useRouter();

  useEffect(() => {
    if (!value) return;
    console.log(`value 업데이트 됨 ${value}`);
    setUpdateClass(
      "transition ease-in-out delay-150 bg-blue-500 -translate-y-1 scale-105 hover:bg-indigo-500 duration-300"
    );

    setTimeout(() => {
      console.log(`효과제거`);
      setUpdateClass("");
    }, 1000 * 10);
  }, [value]);

  // const { data, error } = useSWR<Response>(`/api/measure/${props.id}`, fetcher);
  // useEffect(() => {
  //   if (!data) return;

  //   data.measure ? setValue(data.measure.value) : null;
  // }, [data]);

  function updateValue() {
    if (!props.id) return;

    fetch(`/api/measure/${props.id}`)
      .then((res) => res.json())
      .then((json) => {
        const result: Measures = json;
        if (null === result) {
          setValue("");
        } else {
          setValue(result.value);
        }
      });
  }

  useEffect(() => {
    if (props.realTime) {
      let tempTimerID: NodeJS.Timeout;
      tempTimerID = setInterval(() => {
        updateValue();
      }, 5000);
      setTimerID(tempTimerID);
      console.log(`타이머 ON - ${tempTimerID}`);
    } else {
      if (timerID) {
        clearInterval(timerID);
        setTimerID(undefined);
        console.log("타이머 OFF");
      }
    }
  }, [props.realTime]);

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
    updateValue();
  }, [props.type]);

  useEffect(() => {
    return () => {
      if (timerID) {
        clearInterval(timerID);
        setTimerID(undefined);
        console.log("타이머 OFF");
      }
    };
  }, [timerID]);
  return (
    <div
      className={cls(
        "border m-2 p-5 rounded-xl w-60 h-52 shadow-2xl flex flex-col justify-between bg-[#363345] hover:bg-[#524d6b] text-slate-200",
        updateClass
      )}
    >
      <div className="flex justify-between ">
        <div>{/* <div>{props.id}</div> */}</div>
        <div className="flex">
          <div className="text-4xl font-bold">
            {value ? <span>{value}</span> : "-"}
          </div>
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
