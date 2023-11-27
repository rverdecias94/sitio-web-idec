
import "../css/sidebar.css"
import PropTypes from 'prop-types';
import { useSidebarContext } from '../../providers/SidebarProvider';


const Sidebar = () => {
  const sidebarOpen = useSidebarContext();
  return (
    <>
      {sidebarOpen && (
        <div className="sidebar-content">
          <button className="sidebar-buttons">Inicio</button>
          <button className="sidebar-buttons">Club DJ</button>
          <button className="sidebar-buttons">Seminario</button>
        </div>
      )
      }
    </>
  )
}

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool
};

export default Sidebar