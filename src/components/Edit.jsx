import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import { Link } from 'react-router-dom';


const Edit = () => {
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
    navigate("/")
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
      console.log("Student not exist")
    }
  }



  return (
    <>
      <div className="container"/*  style={{ width: "85%", marginTop: "5%" }} */>
        <div className="row">
          <div className="col">
            <h1>Editar estudiante</h1>
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
                <input type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className='form-control'
                />
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
    </>
  )
}

export default Edit