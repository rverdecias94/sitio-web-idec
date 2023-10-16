import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Myswal = withReactContent(Swal)





export const Show = () => {
  const [students, setStudents] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [field, setField] = useState("nombre");

  const studentsCollection = collection(db, "estudiantes")

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
      <div className="container">
        <div className="row">
          <div className='col-lg-2 col-sm-6 col-md-2'>
            <Link to="/create" className='text-decoration-none'>
              <button className="d-grid btn btn-success mt-4 mb-2">
                Registrar
              </button>
            </Link>
          </div>
          {/* <div className='mt-4 mb-2 col-sm-6 col-lg-4 col-md-4 d-flex justify-content-end'>
            <span className="badge bg-primary me-2">Total de niños: {students.length}</span>
            <span className="badge bg-warning text-dark">Total de monedas: {calcularMonedas}</span>
          </div> */}

          <div className='col-lg-5 col-sm-12 col-md-5 mt-4 mb-2 d-flex justify-content-between position-relative'>
            <span style={{
              position: "absolute",
              top: -15,
              left: 21,
              background: "white",
              padding: "0 5px"
            }}>Filtrar por</span>
            <select onChange={(e) => setField(e.target.value !== "" ? e.target.value : null)}
              style={{
                borderRadius: 5,
                boxShadow: "0 0 2px -1px",
                border: "none",
                outline: "none",
                padding: "7px 34px 7px 10px",
                width: "100%",


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

        <div className="col">
          <table className='table table-striped'>
            <thead className="table-dark">
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Edad</th>
                <th>Monedas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.filter(serchingTerm(search)).map(student => (
                  <tr key={student.id}>
                    <td>{student.gender === "M"
                      ? <img src='/img/niño.png' style={{ width: 60, height: 60 }} />
                      : <img src='/img/niña.png' style={{ width: 60, height: 60 }} />}
                    </td>
                    <td>{student.nombre}</td>
                    <td>{student.apellidos}</td>
                    <td>{student.edad}</td>
                    <td>{student.monedas}<i className='ms-3 fa fa-coins ' style={{ color: "orange" }} /></td>
                    <td>
                      <Link to={`/edit/${student.id}`} className='btn btn-primary me-2'>
                        <i className="fa-solid fa-pencil" />
                      </Link>
                      <button onClick={() => { confirmDelete(student.id) }} className='btn btn-danger'>
                        <i className="fa-solid fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : []}
            </tbody>

          </table>

        </div>
      </div >
    </>
  )
}
