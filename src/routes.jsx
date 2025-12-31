import { Routes, Route } from "react-router-dom";

// ✅ Import ALL pages you use
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import ProgramDetails from "./pages/ProgramDetails";
import Contact from "./pages/Contact";
import Notice from "./pages/Notice";
import PersonalTraining from "./pages/features/PersonalTraining";
import DietPlans from "./pages/features/about-trainer";
import FlexibleTimings from "./pages/features/FlexibleTimings";
import Equipment from "./pages/features/equipments";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNotices from "./pages/admin/AdminNotices";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminStats from "./pages/admin/AdminStats";
import BMIChart from "./pages/BMIChart";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminContacts from "./pages/admin/AdminContacts";



const AppRoutes = ({ setAuthUser }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/notices" element={<Notice />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/programs/:programId" element={<ProgramDetails />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/features/PersonalTraining" element={<PersonalTraining />} />
      <Route path="/features/about-trainer" element={<DietPlans />} />
      <Route path="/features/FlexibleTimings" element={<FlexibleTimings />} />
      <Route path="/features/equipments" element={<Equipment />} />
      
    
    <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

    <Route
  path="/admin/notices"
  element={
    <AdminRoute>
      <AdminNotices />
    </AdminRoute>
  }
/>

<Route
  path="/admin/bookings"
  element={
    <AdminRoute>
      <AdminBookings />
    </AdminRoute>
  }
/>

<Route
  path="/admin/stats"
  element={
    <AdminRoute>
      <AdminStats />
    </AdminRoute>
  }
/>

<Route
  path="/login"
  element={<Login setAuthUser={setAuthUser} />}
/>

<Route path="/bmi-chart" element={<BMIChart />} />

<Route
  path="/admin/users"
  element={
    <AdminRoute>
      <AdminUsers />
    </AdminRoute>
  }
/>

<Route
  path="/admin/contacts"
  element={
    <AdminRoute>
      <AdminContacts />
    </AdminRoute>
  }
/>

    </Routes>
  );
};

export default AppRoutes;

