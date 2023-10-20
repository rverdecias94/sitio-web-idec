import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Header from './Layouts/Header';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Sidebar from './Layouts/Sidebar';
import './css/showStyles.css';


const Myswal = withReactContent(Swal)





export const Show = () => {
  const [students, setStudents] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [field, setField] = useState("nombre");

  const studentsCollection = collection(db, "estudiantes")
  const navigate = useNavigate()



  const serchingTerm = (search) => {
    if (field === "nombre") {
      return function (x) {
        return x.nombre.includes(search) || !search
      }
    }
    else if (field === "apellidos") {
      return function (x) {
        return x.apellidos.includes(search) || !search
      }
    }
    else if (field === "edad") {
      return function (x) {
        return x.edad.includes(search) || !search
      }
    }
    else if (field === "monedas") {
      return function (x) {
        return x.monedas.includes(search) || !search
      }
    }
  }

  const updateInfo = async (id, type) => {
    let res = students.find(s => s.id === id)
    if (res) {
      let monedas = type === "plus" ? parseInt(res.monedas) + 1 : parseInt(res.monedas) - 1

      if (monedas >= 0) {
        res.monedas = monedas;
        const student = doc(db, "estudiantes", id)
        const data = { monedas: monedas.toString() }
        await updateDoc(student, data)
        navigate("/")
      }
    }

  }


  useEffect(() => {
    setData(students)
  }, [students])



  const getStudents = async () => {
    const data = await getDocs(studentsCollection)

    setStudents(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );

  }

  const deleteStudent = async (id) => {
    const studentDoc = doc(db, "estudiantes", id)
    await deleteDoc(studentDoc)
    getStudents()
  }

  const confirmDelete = (id) => {
    Myswal.fire({
      title: '¿Estás seguro que deseas eliminar los datos del niño?',
      text: "Si aceptas no prodrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStudent(id)
        Swal.fire(
          'Eliminado!',
          'Los datos del niño han sido eliminados.',
          'success'
        )
      }
    })
  }

  useEffect(() => {
    getStudents()
    //eslint-disable-next-line
  }, [])


  /* const calcularMonedas = students.reduce((suma, student) => suma + parseInt(student.monedas), 0); */
  return (
    <>
      <div className='overflow-auto'>
        <Header />
        <div className='d-flex'>
          {/* <Sidebar /> */}
          <div style={{ padding: "0 3%" }}>
            <div className="row">
              <div className='col-lg-2 col-sm-6 col-md-2'>
                <Link to="/create" className='text-decoration-none'>
                  <button className="btn btn-success mb-2" style={{
                    position: "fixed",
                    bottom: "5%",
                    right: "7%",
                    borderRadius: "50%",
                    width: 50,
                    height: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                    <i className="fa fa-plus"></i>
                  </button>
                </Link>
              </div>
              {/* <div className='mt-4 mb-2 col-sm-6 col-lg-4 col-md-4 d-flex justify-content-end'>
            <span className="badge bg-primary me-2">Total de niños: {students.length}</span>
            <span className="badge bg-warning text-dark">Total de monedas: {calcularMonedas}</span>
          </div> */}

              <div className='col-lg-5 col-sm-12 col-md-5 mt-4 mb-2 d-flex justify-content-between position-relative'>
                <select onChange={(e) => setField(e.target.value !== "" ? e.target.value : null)}
                  style={{
                    borderRadius: 5,
                    boxShadow: "0 0 2px -1px",
                    border: "none",
                    outline: "none",
                    padding: "7px 34px 7px 10px",
                    flexGrow: 20
                  }}>
                  <option value="nombre">Nombre</option>
                  <option value="apellidos">Apellidos</option>
                  <option value="edad">Edad</option>
                  <option value="monedas">Monedas</option>
                </select>
              </div>

              <div className='col-lg-5 col-sm-12 col-md-5 mt-4 mb-2'>
                <input type="search"
                  className='justify-content-end'
                  placeholder='Buscar...'
                  style={{
                    border: "none",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 3px -1px",
                    outline: "none",
                    padding: "6px",
                    width: "100%"
                  }}
                  onChange={e => setSearch(e.target.value)
                  }
                />
              </div>

            </div>

            <div className="overflow-y-auto">
              <table className='table table-striped'>
                <thead className="table-dark">
                  <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Edad</th>
                    <th>Monedas<i className='ms-3 fa fa-info-circle text-warning' />
                      <select>
                        <option value="normal">+1</option>
                        <option value="5">+5</option>
                        <option value="10">+10</option>
                      </select>
                    </th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data ? (
                    data.filter(serchingTerm(search)).map(student => (
                      <tr key={student.id}>
                        <td>{student.gender === "M"
                          ? <img src='/img/niño.png' style={{ width: 40, height: 40 }} />
                          : <img src='/img/niña.png' style={{ width: 40, height: 40 }} />}
                        </td>
                        <td>{student.nombre}</td>
                        <td>{student.apellidos}</td>
                        <td>{student.edad}</td>
                        <td>
                          <button className='me-2 button-minus' type="submit" onClick={() => updateInfo(student.id, "minus")}>
                            <i className='fa fa-minus' />
                          </button>
                          {student.monedas}
                          <i className='ms-1 me-2 fa fa-coins ' style={{ color: "orange" }} />
                          <button className="button-plus" type="submit" onClick={() => updateInfo(student.id, "plus")}>
                            <i className=' fa fa-plus' />
                          </button>
                        </td>
                        <td>
                          <Link to={`/edit/${student.id}`} className=''>
                            <i className="fa-solid fa-pencil" style={{ color: "#2d7cc5" }} />
                          </Link>
                          <button onClick={() => { confirmDelete(student.id) }} style={{ border: "none", background: 'transparent' }}>
                            <i className="fa-solid fa-trash" style={{ color: "#f24343" }} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : []}
                </tbody>

              </table>

            </div>
          </div >
        </div>
      </div>
    </>
  )
}
