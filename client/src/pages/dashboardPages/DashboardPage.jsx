import Navbar from "../../components/Navbar";
import ProtectRoutes from "../../utils/ProtectRoutes";

function DashboardPage() {
  return (
    <>
      <ProtectRoutes>
        <Navbar />
        Dashboard
      </ProtectRoutes>
    </>
  );
}
export default DashboardPage;
