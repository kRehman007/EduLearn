import HomePage from "./Components/Home/HomePage";
import { Route, Routes } from "react-router-dom";
import Courses from "./Components/Courses/Courses";
import Pannel from "./Components/Admin/Pannel";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import DetailPage from "./Components/CourseDetail/DetailPage";
import Dashboardpage from "./Components/Dashboard/Dashboardpage";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminRoute from "./Components/AdminRoute";
import PageNotFound from "./Components/PageNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/courses" element={<Courses />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Pannel />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboardpage />
            </AdminRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/course/:id/detail" element={<DetailPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
