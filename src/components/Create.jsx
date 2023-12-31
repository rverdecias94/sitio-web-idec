import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig/firebase';
import Header from './Layouts/Header';
import Sidebar from './Layouts/Sidebar';
import { useSidebarContext, useSidebarToggleContext } from '../providers/SidebarProvider';
import "./css/create.css"
import { Toaster, toast } from 'react-hot-toast';

const Create = () => {


  const sidebarOpen = useSidebarContext();
  const handlerSidebarVisible = useSidebarToggleContext();

  const [nombre, setNombre] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [gender, setGender] = useState("")
  const [edad, setEdad] = useState("")
  const [monedas, setMonedas] = useState("")
  const navigate = useNavigate()

  const studentsCollection = collection(db, "estudiantes")

  const addStudent = async (e) => {
    e.preventDefault()
    await addDoc(studentsCollection, { nombre: nombre, apellidos: apellidos, gender: gender, edad: edad, monedas: monedas })
    toast.success("Registro satisfactorio")
    setTimeout(() => navigate("/"), 2000)
  }


  return (
    <>
      <div className='overflow-auto'>
        <Header handlerSidebarVisible={handlerSidebarVisible} />
        <div className='d-flex'>
          <Sidebar sidebarOpen={sidebarOpen} />
          <div className={`margin-top-movile ${sidebarOpen ? "width" : "width-full"}`} style={{ padding: "0 3%" }}>
            <div className="row">
              <div className="col">
                <Toaster
                  position="top-center"
                  reverseOrder={false}
                />
                <h3 style={{ fontFamily: "cursive" }}>Registrar estudiante</h3>
                <form onSubmit={addStudent} className='form-control-sm'>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">Nombre</label>
                    <input type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className='form-control'
                      placeholder="Nombre..."
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">Apellidos</label>
                    <input type="text"
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                      className='form-control'
                      placeholder="Apellidos..."
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">Edad</label>
                    <input type="text"
                      value={edad}
                      onChange={(e) => setEdad(e.target.value)}
                      className='form-control'
                      placeholder="Ej: 8"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">Género</label><br />

                    <div className='d-flex gap-2'>
                      <input type="radio" name="gender" value="M" checked={gender === 'M'} onChange={() => setGender('M')} /> Masculino
                      <input type="radio" name="gender" value="F" checked={gender === 'F'} onChange={() => setGender('F')} /> Femenino
                    </div>

                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">Monedas</label>
                    <input type="text"
                      value={monedas}
                      onChange={(e) => setMonedas(e.target.value)}
                      className='form-control'
                      placeholder="Ej: 17"
                    />
                  </div>
                  <div className='d-flex justify-content-end'>
                    <Link to="/" className='text-decoration-none'>
                      <button className="d-grid btn btn-secondary me-2">
                        Cancelar
                      </button>
                    </Link>
                    <button type='submit' className='btn btn-primary'>Adicionar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Create