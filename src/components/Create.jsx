import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig/firebase';

const Create = () => {

  const [nombre, setNombre] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [gender, setGender] = useState("")
  const [edad, setEdad] = useState("")
  const [monedas, setMonedas] = useState(0)
  const navigate = useNavigate()

  const studentsCollection = collection(db, "estudiantes")

  const addStudent = async (e) => {
    e.preventDefault()
    await addDoc(studentsCollection, { nombre: nombre, apellidos: apellidos, gender: gender, edad: edad, monedas: monedas })
    navigate("/")
  }

  return (
    <>
      <div className="container" /* style={{ width: "85%", marginTop: "5%" }} */>
        <div className="row">
          <div className="col">
            <h1>Registrar estudiante</h1>
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
                <label htmlFor="" className="form-label">Género</label>
                <input type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className='form-control'
                  placeholder="Ej: M"
                />
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
    </>
  )
}

export default Create