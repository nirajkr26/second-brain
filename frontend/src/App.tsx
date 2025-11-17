import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import { Login } from "./pages/Login"
import ShareBrain from "./pages/ShareBrain"
import Landing from "./pages/Landing"
import PageNotFound from "./pages/PageNotFound"
import { ToastContainer, Zoom } from "react-toastify"
import Profile from "./pages/Profile"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/share/:shareLink" element={<ShareBrain />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={1500} closeOnClick pauseOnHover={false} transition={Zoom} />
    </BrowserRouter>
  )
}

export default App
