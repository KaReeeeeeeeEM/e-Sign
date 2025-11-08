import { useState, useEffect, useRef } from "react";
import Toolkit from "./Toolkit";
import { Button, Modal } from "antd";

export default function DrawingBoard() {
  const canvasRef = useRef(null);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [color, setColor] = useState("#000000");
  const [context, setContext] = useState(null);
  const [lineWidth, setLineWidth] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeTool, setActiveTool] = useState("brush");
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set initial context properties
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Initialize canvas properties like width, height and background color
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.7;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    setContext(ctx);
  }, []);

  // Effect to update context properties when color or width changes
  useEffect(() => {
    if (context) {
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
    }
  }, [context, color, lineWidth]);

  const captureScreenshot = () => {
    if (!canvasRef.current) return;

    const imageUrl = canvasRef.current.toDataURL("image/png");
    setScreenshotUrl(imageUrl);
    setIsModalOpen(true);
  };

  const getCanvasCoordinates = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handlePointerDown = (e) => {
    if (!canvasRef.current) return;
    e.preventDefault();
    const { x, y } = getCanvasCoordinates(e);
    canvasRef.current?.setPointerCapture?.(e.pointerId);
    setIsDrawing(true);
    setLastX(x);
    setLastY(y);
  };

  const handlePointerMove = (e) => {
    if (!isDrawing || !context) return;
    e.preventDefault();
    const { x, y } = getCanvasCoordinates(e);
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(x, y);
    context.stroke();

    setLastX(x);
    setLastY(y);
  };

  const handlePointerUp = (e) => {
    e.preventDefault();
    canvasRef.current?.releasePointerCapture?.(e.pointerId);
    setIsDrawing(false);
  };

  const downloadScreenshot = () => {
    if (!screenshotUrl) return;

    const link = document.createElement("a");
    link.href = screenshotUrl;
    link.target = "_blank";
    link.download = `signature-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onCancelModal = () => {
    setIsModalOpen(false);
    setScreenshotUrl(null);
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{
          border: "1px solid black",
          margin: "auto",
          borderRadius: "10px",
          cursor: "crosshair",
          touchAction: "none",
        }}
      />
      <Toolkit
        color={color}
        setColor={setColor}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
        captureScreenshot={captureScreenshot}
        downloadScreenshot={downloadScreenshot}
        clearCanvas={() =>
          context.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          )
        }
      />

      {isModalOpen && (
        <Modal
          open={isModalOpen}
          title="Signature Captured"
          footer={() => (
            <div className="flex justify-end gap-4">
              <Button onClick={downloadScreenshot} type="primary">
                Download
              </Button>
              <Button onClick={onCancelModal}>Close</Button>
            </div>
          )}
          onCancel={onCancelModal}
          className="flex items-center justify-center"
          width={800}
          destroyOnHidden
        >
          <img src={screenshotUrl} alt="screenshot" />
        </Modal>
      )}
    </div>
  );
}
