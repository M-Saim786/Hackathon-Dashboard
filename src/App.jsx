// import Navbar from "./Components/LandingPage";
import AddPorduct from "./Components/Products/AddPorduct";
import Dashboard from "./Components/Dashboard";
// import DashboardContent from "./Components/DashboardContent";
// import Sidebar from "./Components/LandingPage/LandingPage";
// import LandingPage from "./Components/LandingPage/LandingPage";
import SignUp from "./Components/SignUp/SignUp";
import { Route, Routes } from "react-router-dom";
import Products from "./Components/Products/Products";
// import Settings from "./Components/Settings";
import Sales from "./Components/Sales/Sales";
// import EditProduct from "./Components/EditProduct";
// import SellProduct from "./Components/SellProduct";
import Login from "./Components/Login/Login";
// import TemporaryDrawer from "./Components/Drawer";
import Profile from "./Components/Profile/Profile";
import EditProduct from "./Components/Products/EditProduct";
import SellProducts from "./Components/Sales/SellProducts";
// import ResponsiveDrawer from "./Components/ResponsiveDrawer";
import DashboardContent from "./Components/DashboardContent";
export default function App() {
  return (
    <>
      {/* <Navbar /> */}
      {/* <LandingPage /> */}
      {/* <LandingPageContext /> */}
      {/* <TemporaryDrawer /> */}
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<SignUp />} />
        <Route path="/gotoLogin" element={<Login />} />
        {/* <Route path='/dashboard' element={<Dashboard />}> */}
        <Route path="/dashboard/" element={<Dashboard Component={DashboardContent} />} />
        <Route path='/dashboard/prod' element={<Dashboard Component={Products} />} />
        <Route path="/dashboard/addPro" element={<Dashboard Component={AddPorduct} />} />
        <Route path="/dashboard/sales" element={<Dashboard Component={Sales} />} />
        <Route path="/dashboard/settings" element={<Dashboard Component={Profile} />} />
        <Route path="/dashboard/EditPro/:id" element={<Dashboard Component={EditProduct} />} />
        <Route path="/dashboard/SellPro/:id" element={<Dashboard Component={SellProducts} />} />
        {/* </Route> */}
      </Routes>
    </>
  );
}
