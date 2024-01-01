
import Dashboard from "./Screens/Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import Login from "./Screens/Login/Login";
import Profile from "./Screens/Profile/Profile";
import DashboardContent from "./Screens/Dashboard/DashboardContent";
// import Resquests from "./Components/Requests/Request";
import Requests from "./Screens/Requests/Request";
import AddPost from "./Screens/Requests/AddPost";
import Posts from "./Screens/Posts/Posts";
import Privacy_Policy from "./Screens/General/Privacy_Policy";
import Terms_Condition from "./Screens/General/Terms_Condition";
import About_Saylani from "./Screens/General/About_Saylani";
// import Resquests from "./Components/Products/Products";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard Component={DashboardContent} />} />
        <Route path='/request' element={<Dashboard Component={Requests} />} />
        <Route path="/posts" element={<Dashboard Component={Posts} />} />
        <Route path="/privacyPolicy" element={<Dashboard Component={Privacy_Policy} />} />
        <Route path="/termsCondtions" element={<Dashboard Component={Terms_Condition} />} />
        <Route path="/aboutSaylani" element={<Dashboard Component={About_Saylani} />} />
        {/* <Route path="/dashboard/sales" element={<Dashboard Component={Sales} />} />/ */}
        <Route path="/settings" element={<Dashboard Component={Profile} />} />
        {/* <Route path="/dashboard/EditPro/:id" element={<Dashboard Component={EditProduct} />} />
        <Route path="/dashboard/SellPro/:id" element={<Dashboard Component={SellProducts} />} /> */}
        {/* </Route> */}
      </Routes>
    </>
  );
}
