import "../styles/Sidebar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthContext, clearAuthContext } from "../scripts/authContext";

interface SidebarProps {
  darkMode:boolean;
  toggleDarkMode:()=> void;
}

function Sidebar({darkMode,toggleDarkMode}:SidebarProps) {
  const history = useNavigate();
  const user = getAuthContext();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [darkMode, setDarkMode] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen((prevState) => !prevState);
  }

  function handleLogout() {
    clearAuthContext();
    localStorage.removeItem("token");
    history("/Login");
  }

  // function handleToggleDarkMode() {
  //   setDarkMode((prevMode) => {
  //     return !prevMode;
  //   });
  // }

  return (
    <>
      <div
        className={`sidebar ${isSidebarOpen ? "open" : ""}${
          darkMode ? "dark-mode" : ""
        }`}
      >
        <div className="logo_details">
          <div className="logo_name">Website name</div>
          <i className="bi bi-list" id="btn" onClick={toggleSidebar}></i>
        </div>
        <ul className="nav-list">
          <li>
            <a href="#">
              <i className="bi bi-grid"></i>
              <span className="link_name"> Dashboard</span>
            </a>
            <span className="tooltip">Dashboard</span>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-bar-chart-line"></i>
              <span className="link_name"> Bot Analytics</span>
            </a>
            <span className="tooltip">Bot Analytics</span>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-bank"></i>{" "}
              <span className="link_name"> Stock Info</span>
            </a>
            <span className="tooltip">Stock Info</span>
          </li>
          <p className="toggleText">Toggle Display</p>
          <div className="displayToggle">
            <input
              type="checkbox"
              id="darkmode-toggle"
              onChange={toggleDarkMode}
              checked={darkMode}
            />
            <label id="toggleLabel" htmlFor="darkmode-toggle"></label>
          </div>
          <li className="profile">
            <div className="profile_details">
              <div className="profilePicture"></div>
              <div className="profile_content">
                <div className="name">
                  {user.firstName} {user.lastName}
                </div>
              </div>
            </div>
            <i
              className="bi bi-box-arrow-in-left"
              id="log_out"
              onClick={handleLogout}
            ></i>
          </li>
        </ul>
      </div>

      <script src=""></script>
    </>
  );
}

export default Sidebar;
