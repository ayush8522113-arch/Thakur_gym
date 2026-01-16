import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes";
import UserGreeting from "./components/UserGreeting";
import "./styles/main.css";

function App() {
  const [authUser, setAuthUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  return (
    <BrowserRouter>
      <Navbar />

      {/* 👇 pass auth state */}
      <UserGreeting authUser={authUser} setAuthUser={setAuthUser} />

      {/* 👇 pass setter to routes */}
      <AppRoutes setAuthUser={setAuthUser} />

      <Footer />
    </BrowserRouter>
  );
}

export default App;
