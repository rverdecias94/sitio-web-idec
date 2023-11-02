import { useState } from "react";


const Sidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <>
      <span>
        <i className="fa fa-bars fixed-top" style={{
          marginTop: "14vh",
          fontSize: 24,
          zIndex: 0,
          color: "#273a4f",
          marginLeft: "20px",
          width: "fit-content",
        }} onClick={() => setSidebarVisible(!sidebarVisible)} />
      </span>
      {sidebarVisible && (
        <div style={{ flexGrow: 3, zIndex: 1, margin: 0, position: "relative", height: "88vh", background: "rgb(105 149 214)" }}>
          <i className="fa fa-bars" style={{
            fontSize: 24,
            color: "white",
            marginLeft: "10px",
            position: "absolute",
            right: 20,
            top: 20,
          }} onClick={() => setSidebarVisible(!sidebarVisible)} />
        </div>
      )
      }
    </>
  )
}

export default Sidebar