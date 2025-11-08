import { Button, Divider } from "antd";
import { Select } from "antd";
import { BiBrush } from "react-icons/bi";
import { BsInstagram } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { FaEraser } from "react-icons/fa6";

export default function Toolkit({
  color,
  setColor,
  lineWidth,
  activeTool,
  setActiveTool,
  setLineWidth,
  clearCanvas,
  captureScreenshot,
}) {
  return (
    <div className="flex items-center justify-even  md:gap-4 px-6 py-3 rounded-lg bg-neutral-300 mt-6">
      <Button
        onClick={() => captureScreenshot()}
        className="font-bold cursor-pointer"
      >
        <BsInstagram className="size-4" />
      </Button>

      {/* Divider */}
      <Divider type="vertical" className="h-12 bg-black" />

      <div className="flex items-center">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{
            width: "30px",
            height: "30px",
            padding: "0",
            border: "none",
            cursor: "pointer",
            borderRadius: "15px",
          }}
        />
      </div>

      {/* Divider */}
      <Divider type="vertical" className="h-12 bg-black" />

      <span
        className={`${
          activeTool === "brush"
            ? "font-bold bg-neutral-400 text-neutral-200"
            : ""
        } flex items-center justify-center p-3 rounded-lg cursor-pointer`}
        onClick={() => setActiveTool("brush")}
      >
        {/* Brush */}
        <BiBrush className="size-4" />
      </span>

      {/* Divider */}
      <Divider type="vertical" className="h-12 bg-black" />

      <div className="flex items-center">
        <Select
          defaultValue={lineWidth}
          onChange={(value) => setLineWidth(value)}
          options={[
            {
              value: 3,
              label: (
                <span className="flex items-center justify-between gap-4">
                  {" "}
                  100 <FaMinus className="size-3 scale-100" />
                </span>
              ),
            },
            {
              value: 5,
              label: (
                <span className="flex items-center justify-between gap-4">
                  {" "}
                  150 <FaMinus className="scale-105 size-4" />
                </span>
              ),
            },
            {
              value: 10,
              label: (
                <span className="flex items-center justify-between gap-4">
                  {" "}
                  200 <FaMinus className="scale-110 size-5" />
                </span>
              ),
            },
            {
              value: 15,
              label: (
                <span className="flex items-center justify-between gap-4">
                  {" "}
                  250 <FaMinus className="scale-115 size-6" />
                </span>
              ),
            },
          ]}
          style={{
            all: "unset",
            color: "black",
            width: 50,
            height: 30,
            marginRight: 8,
            cursor: "pointer",
            backgroundColor: "#d4d4d4",
          }}
          className="font-bold cursor-pointer"
        />
        <span>{lineWidth}px</span>
      </div>

      {/* Divider */}
      <Divider type="vertical" className="h-12 bg-black" />

      <Button onClick={clearCanvas} className="font-bold cursor-pointer ">
        <FaEraser className="size-4" />
      </Button>
    </div>
  );
}
