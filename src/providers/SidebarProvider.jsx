import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';


const sidebarContext = React.createContext()
const sidebarToggleContext = React.createContext()

export function useSidebarContext() {
  return useContext(sidebarContext);
}
export function useSidebarToggleContext() {
  return useContext(sidebarToggleContext);
}

export function SidebarProvider({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handlerSidebarVisible = (value) => {
    setSidebarOpen(value)
  }

  return (
    <sidebarContext.Provider value={sidebarOpen}>
      <sidebarToggleContext.Provider value={handlerSidebarVisible}>
        {children}
      </sidebarToggleContext.Provider>
    </sidebarContext.Provider>
  );


}

SidebarProvider.propTypes = {
  children: PropTypes.object.isRequired
};