import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import { Link } from 'react-router-dom';
import Header from './Layouts/Header';
import Sidebar from './Layouts/Sidebar';
import { useSidebarContext, useSidebarToggleContext } from '../providers/SidebarProvider';
import "./css/edit.css"
import { Toaster, toast } from 'react-hot-toast';

const Edit = () => {

  const sidebarOpen = useSidebarContext();
  const handlerSidebarVisible = useSidebarToggleContext();


  const [nombre, setNombre] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [edad, setEdad] = useState("")
  const [gender, setGender] = useState()
  const [monedas, setMonedas] = useState(0)


  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    getStudentById(id)
  }, [])


  const updateInfo = async (e) => {
    e.preventDefault()
    const student = doc(db, "estudiantes", id)
    const data = { nombre: nombre, apellidos: apellidos, gender: gender, edad: edad, monedas: monedas }
    await updateDoc(student, data)
    toast.success("Información actualizada existosamente")
    setTimeout(() => navigate("/"), 2000)
  }

  const getStudentById = async (id) => {
    const student = await getDoc(doc(db, "estudiantes", id))
    if (student.exists()) {
      setNombre(student.data().nombre)
      setApellidos(student.data().apellidos)
      setGender(student.data().gender)
      setEdad(student.data().edad)
      setMonedas(student.data().monedas)
    } else {
      toast.error("No hay data para mostrar");
    }
  }


  return (
    <>
      <div className='overflow-auto'>
        <Header handlerSidebarVisible={handlerSidebarVisible} />
        <div className='d-flex'>
          <Sidebar sidebarOpen={sidebarOpen} />
          <div className={`margin-top-movile ${sidebarOpen ? "width" : "width-full"}`} style={{ padding: "0 3%" }}>
            <div className="row">
              <Toaster
                position="top-center"
                reverseOrder={false}
              />
              <h3 style={{ fontFamily: "cursive" }}>Editar estudiante</h3>
              <form onSubmit={updateInfo}>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">Nombre</label>
                  <input type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className='form-control'
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">Apellidos</label>
                  <input type="text"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    className='form-control'
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">Género</label>
                  <div className='d-flex gap-2'>
                    <input type="radio" name="gender" value="M" checked={gender === 'M'} onChange={() => setGender('M')} /> Masculino
                    <input type="radio" name="gender" value="F" checked={gender === 'F'} onChange={() => setGender('F')} /> Femenino
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">Edad</label>
                  <input type="text"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    className='form-control'
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">Monedas</label>
                  <input type="text"
                    value={monedas}
                    onChange={(e) => setMonedas(e.target.value)}
                    className='form-control'
                  />
                </div>
                <div className='d-flex justify-content-end'>
                  <Link to="/" className='text-decoration-none'>
                    <button className="d-grid btn btn-secondary me-2">
                      Cancelar
                    </button>
                  </Link>
                  <button type='submit' className='btn btn-primary'>Actualizar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Edit