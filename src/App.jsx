import { FaSignature } from "react-icons/fa"
import DrawingBoard from "./components/Drawingboard"

function App() {

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-neutral-50">
      <span className="text-5xl mt-12 flex items-center gap-2"><span className="text-rose-500">e</span>-Sign <FaSignature className="text-rose-500" /></span>
      <DrawingBoard />
    </div>
  )
}

export default App
