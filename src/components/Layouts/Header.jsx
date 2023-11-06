
import '../css/header.css'
import PropTypes from 'prop-types';
import { useSidebarContext, useSidebarToggleContext } from '../../providers/SidebarProvider';

const Header = () => {
  const sidebarOpen = useSidebarContext();
  const handlerSidebarVisible = useSidebarToggleContext();


  return (
    <div className='header-container'>
      {
        <span>
          <i className="fa fa-bars btn-bars" onClick={() => handlerSidebarVisible(!sidebarOpen)} />
        </span>
      }
      <h5 className='text-white bold d-inline-block'>Registro de Asistencia y Monedas </h5>
    </div>
  )
}

Header.propTypes = {
  handlerSidebarVisible: PropTypes.func
};
export default Header