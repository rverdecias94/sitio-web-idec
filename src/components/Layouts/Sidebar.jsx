import { useState } from "react";
import "../css/sidebar.css"

const Sidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <>
      <span>
        <i className="fa fa-bars fixed-top btn-sidebar" onClick={() => setSidebarVisible(!sidebarVisible)} />
      </span>
      {sidebarVisible && (
        <div className="sidebar-content">

        </div>
      )
      }
    </>
  )
}

export default Sidebar