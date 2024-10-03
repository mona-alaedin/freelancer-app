import { BsFillCollectionFill } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-secondary-0 row-start-1 row-span-2">
      <ul className="flex flex-col gap-y-4 p-2.5">
        <li>
          <CustomNavlink to="/owner/dashboard">
            <IoHome />
            <span>خانه</span>
          </CustomNavlink>
        </li>
        <li>
          <CustomNavlink to="/owner/projects">
            <BsFillCollectionFill />
            <span>پروژه ها</span>
          </CustomNavlink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

function CustomNavlink({ children, to }) {
  const navlinkclass =
    "flex items-center gap-x-2 hover:bg-primary-100/50 hover:text-primary-900  px-2 py-2.5 rounded-lg transition-all duration-300";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? `${navlinkclass} bg-primary-100/50 text-primary-900`
          : `${navlinkclass} text-secondary-600`
      }>
      {children}
    </NavLink>
  );
}
