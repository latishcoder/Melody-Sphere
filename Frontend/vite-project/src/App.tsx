import { Route, Routes } from "react-router-dom";
import HomePage from "../src/pages/home/HomePage";
import AuthCallback from "./pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import NotFoundPage from "./pages/404/NotFoundPage";

// ✅ Import Authentication Pages
// import LoginPage from "./Auth/LoginPage"
// import RegisterPage from "./Auth/RegisterPage"

function App() {
  return (
    <>
      <Routes>
        {/* Single Sign-On Callback */}
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signInForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthCallback />} />

        {/* ✅ Authentication Routes */}
        {/* <Route path="api/auth/login" element={<LoginPage />} />
        <Route path="api/auth/register" element={<RegisterPage />} /> */}

        {/* Admin Route */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Main Layout Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
