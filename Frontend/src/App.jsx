
import Header from "./components/DesignSection/Header"
import { Outlet } from "react-router-dom"

function App() {
  return (
    <div className="w-screen h-screen bg-slate-900">
      <Header></Header>
      <Outlet></Outlet>
    </div>
  )
}

export default App
