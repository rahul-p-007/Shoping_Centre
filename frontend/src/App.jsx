import React, { useEffect } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore";
import LoadingSpinner from "./components/LoadingSpinner";
function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (checkingAuth) return <LoadingSpinner />;
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{ style: { zIndex: 9999 } }}
      />
      <div className="min-h-screen text-black relative overflow-hidden ">
        <div className="absolute inset-0 overflow-hidden">
          {/* Colorful gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,0,128,0.5)_0%,rgba(255,154,0,0.5)_25%,rgba(0,200,255,0.5)_50%,rgba(130,0,255,0.5)_75%,rgba(0,0,0,0)_100%)]" />

          {/* Black overlay */}
          <div className="absolute inset-0 bg-black opacity-20" />
        </div>

        <div className="relative z-50 pt-20">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/signup"
              element={!user ? <SignUpPage /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        {/* <Toaster position="top-right" /> */}
      </div>
    </>
  );
}

export default App;
