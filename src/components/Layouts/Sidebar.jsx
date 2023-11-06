
import "../css/sidebar.css"
import PropTypes from 'prop-types';
import { useSidebarContext } from '../../providers/SidebarProvider';


const Sidebar = () => {
  const sidebarOpen = useSidebarContext();
  return (
    <>
      {sidebarOpen && (
        <div className="sidebar-content">

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