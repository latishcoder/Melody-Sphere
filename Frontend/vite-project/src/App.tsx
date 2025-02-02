import { Route, Routes } from "react-router-dom"
import HomePage from "../src/pages/home/HomePage"
import AuthCallback from "./pages/auth-callback/AuthCallbackPage"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback
      signInForceRedirectUrl={"/auth-callback"}/>} />
      <Route path="/auth-callback" element={<AuthCallback/>} />
    </Routes>
    </>
  )
}

export default App