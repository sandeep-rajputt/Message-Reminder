import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/Signup";
import AllReminders from "./pages/All Reminders/AllReminders";
import { useDispatch } from "react-redux";
import { fetchUserData } from "./store/slices/UserDataSlices";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import SetReminder from "./pages/Set Reminder/SetReminder";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <div className="font-geist min-h-screen grid grid-rows-[1fr_auto]">
      <Header />
      <div
        className={`pt-[71.98px] ${
          location.pathname !== "/" &&
          "max-w-device w-full h-full justify-self-center"
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/all-reminders"
            element={
              <ProtectedRoute>
                <AllReminders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/set-reminder"
            element={
              <ProtectedRoute>
                <SetReminder />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
