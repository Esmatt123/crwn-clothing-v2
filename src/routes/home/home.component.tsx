import { Outlet } from "react-router-dom";
import Directory from "../../components/Directory/directory.component";
const Home = () => {
  return (
    <div className="categories-container">
      <Directory />
      <Outlet />
    </div>
  );
};

export default Home;
