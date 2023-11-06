
import Create from './components/Create'
import Edit from './components/Edit'
import { Show } from './components/Show'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SidebarProvider } from './providers/SidebarProvider'

function App() {

  return (
    <>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Show />} />
            <Route path='/create' element={<Create />} />
            <Route path='/edit/:id' element={<Edit />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </>
  )
}

export default App
