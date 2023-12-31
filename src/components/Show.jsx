import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Header from './Layouts/Header';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Sidebar from './Layouts/Sidebar';
import './css/showStyles.css';
import { useSidebarContext, useSidebarToggleContext } from '../providers/SidebarProvider';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Toaster, toast } from 'react-hot-toast';

const Myswal = withReactContent(Swal)

export const Show = () => {

  const sidebarOpen = useSidebarContext();
  const handlerSidebarVisible = useSidebarToggleContext();

  const [studentsOriginal, setStudentsOriginal] = useState([]);
  const [students, setStudents] = useState([]);
  const [male, setMale] = useState([]);
  const [female, setFemale] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [field, setField] = useState("nombre");
  const [fieldSort, setFieldSort] = useState("nombre");
  const [sortOrder, setSortOrder] = useState("asc");
  const [download, setDownload] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Obtener los elementos a mostrar en la página actual


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const sortTable = () => {
    if (fieldSort === "nombre" || fieldSort === "apellidos") {
      let array = students.sort(function (b, a) {
        if (sortOrder === "asc") {
          return (b[fieldSort].toLowerCase().localeCompare(a[fieldSort].toLowerCase()))
        } else {
          return (a[fieldSort].toLowerCase().localeCompare(b[fieldSort].toLowerCase()))
        }

      });
      return array;
    } else {
      let array = students.sort(function (b, a) {
        if (sortOrder === "asc") {
          return (b[fieldSort] - a[fieldSort])
        } else {
          return (a[fieldSort] - b[fieldSort])
        }
      });
      return array;
    }
  }

  // Función para cambiar a la página siguiente
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Función para cambiar a la página anterior
  const previousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const studentsCollection = collection(db, "estudiantes")
  const navigate = useNavigate()

  const serchingTerm = (search) => {
    return function () {
      let res = studentsOriginal.filter(student => student[field].includes(search) || !search)
      return res
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
        toast.success("Monedas actualizadas")
        navigate("/")
      }
    }

  }


  useEffect(() => {
    let res = sortTable()
    if (res.length > 0) {
      const currentItems = res.slice(indexOfFirstItem, indexOfLastItem);
      if (currentItems.length > 0) {
        setData(currentItems)
      }
    }
    //eslint-disable-next-line
  }, [currentPage, students, fieldSort, sortOrder])


  useEffect(() => {
    if (search !== "") {
      const currentItems = serchingTerm(search)
      setStudents(currentItems)
      if (currentItems.length > 0) {
        setData(currentItems)
      }
    }
    else {
      getStudents()
    }
    //eslint-disable-next-line
  }, [search, itemsPerPage])



  const getStudents = async () => {
    const data = await getDocs(studentsCollection)
    setStudents(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    setStudentsOriginal(
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

  useEffect(() => {
    groupedByGender()
    //eslint-disable-next-line
  }, [students])


  const downloadPDF = () => {
    setDownload(true)
    setItemsPerPage(students.length)

    setTimeout(() => {
      const doc = new jsPDF();
      doc.autoTable({ html: '#mi-tabla' });
      doc.save('tabla.pdf');
      setItemsPerPage(6)
      setDownload(false)
      toast.success('Descarga exitosa!')
    }, 3000)
  }

  const groupedByGender = () => {
    students?.reduce((genders, student) => {
      if (!genders[student?.gender]) {
        genders[student.gender] = [];
      }
      genders[student?.gender].push(student);
      setMale(genders["M"]);
      setFemale(genders["F"]);
      return genders;
    }, {});
  }

  const sortColumn = (value) => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
    setFieldSort(value)
  }

  const calcularMonedas = students.reduce((suma, student) => suma + parseInt(student.monedas), 0);
  return (
    <>
      <div className='overflow-auto'>
        <Header handlerSidebarVisible={handlerSidebarVisible} />
        <div className='d-flex'>
          <Sidebar sidebarOpen={sidebarOpen} />
          <div className={`margin-top-movile ${sidebarOpen ? "width" : "width-full"}`} style={{ padding: "0 3%" }}>
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
            <div className="row mb-3 d-flex">
              <div className='col-lg-8 col-sm-6 col-md-2 align-items-center'>
                <Link to="/create" className='text-decoration-none'>
                  <button className="btn-create">
                    <i className="fa fa-user-plus"></i>
                    <span className='create-text ms-2'>Adicionar</span>
                  </button>
                </Link>
              </div>

              <div className='col-lg-2 col-sm-12 col-md-5 mb-3 d-flex justify-content-between position-relative'>
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

              <div className='col-lg-2 col-sm-12 col-md-5 mb-2 position-relative'>
                <i className='fa fa-search icon-search' />
                <input type="search"
                  className='justify-content-end'
                  placeholder='Buscar...'
                  style={{
                    border: "none",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 3px -1px",
                    outline: "none",
                    padding: "6px 44px 6px 12px",
                    width: "100%"
                  }}
                  onChange={e => setSearch(e.target.value)
                  }
                />
              </div>

            </div>
            <div className=' mb-2 col-sm-12 col-lg-12 col-md-12 d-flex aditional-info'>
              <span className=" me-2 aditional-info-item">Total de niños: {students?.length} | F: {female?.length}, M: {male?.length} </span>
              <span className=" aditional-info-item">Monedas repartidas: {calcularMonedas}</span>
            </div>
            <div className="overflow-y-auto">

              <div className="table-buttons">
                <button id="pdf-button" className='btn-pdf' onClick={downloadPDF}>
                  <i className='fa fa-file-pdf' />
                  <span className='downloadText'>
                    {download ? " Descargando..." : " Descargar"}
                  </span>
                </button>
              </div>

              <table className='table table-striped' id='mi-tabla'>
                <thead className="table-dark">
                  <tr>
                    <th></th>
                    <th>Nombre
                      <i className={sortOrder === "asc" ? `fa-solid fa-arrow-down-wide-short ms-3` : `fa-solid fa-arrow-up-short-wide ms-3`} onClick={() => {
                        sortColumn("nombre")
                      }} />
                    </th>
                    <th>Apellidos
                      <i className={sortOrder === "asc" ? `fa-solid fa-arrow-down-wide-short ms-3` : `fa-solid fa-arrow-up-short-wide ms-3`} onClick={() => {
                        sortColumn("apellidos")
                      }} />
                    </th>
                    <th className='show-item'>Edad
                      <i className={sortOrder === "asc" ? `fa-solid fa-arrow-down-wide-short ms-3` : `fa-solid fa-arrow-up-short-wide ms-3`} onClick={() => {
                        sortColumn("edad")
                      }} />
                    </th>
                    <th>Monedas
                      <i className={sortOrder === "asc" ? `fa-solid fa-arrow-down-wide-short ms-3` : `fa-solid fa-arrow-up-short-wide ms-3`} onClick={() => {
                        sortColumn("monedas")
                      }} />
                    </th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data ? (
                    data.map(student => (
                      <tr key={student.id}>
                        <td>{student.gender === "M"
                          ? <img src='/img/niño.png' className="show-item" style={{ width: 40, height: 40 }} />
                          : <img src='/img/niña.png' className="show-item" style={{ width: 40, height: 40 }} />}
                        </td>
                        <td>{student.nombre}</td>
                        <td>{student.apellidos}</td>
                        <td className='show-item'>{student.edad}</td>
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
                            <i className="fa-solid fa-pencil" style={{ color: "#ccab6a" }} />
                          </Link>
                          <button onClick={() => { confirmDelete(student.id) }} style={{ border: "none", background: 'transparent' }}>
                            <i className="fa-solid fa-trash" style={{ color: "#ccab6a" }} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : []}
                </tbody>

              </table>





              {/* Botones de paginación */}
              <div className='d-flex justify-content-between mt-4 mb-4'>
                <button
                  disabled={currentPage === 1}
                  onClick={previousPage}
                  className='previous'
                >
                  <i className="fa fa-chevron-left small me-2" />
                  <span className='text-btn-pag'>Anterior</span>
                </button>
                <div>
                  <div className='d-flex justify-content-center align-items-center'>
                    <select className='pagination' onChange={(e) => setItemsPerPage(e.target.value)}>
                      <option value="6">6</option>
                      <option value="15">15</option>
                      <option value="25">25</option>
                      <option value={students?.length}>Todos</option>
                    </select>
                    <h6 className='ms-3 text-secondary'>Pág: {currentPage} de {Math.ceil(students.length / itemsPerPage)} </h6>
                  </div>
                </div>
                <button
                  disabled={indexOfLastItem >= students.length}
                  onClick={nextPage}
                  className='next'
                >
                  <span className='text-btn-pag'>Siguiente</span>
                  <i className="fa fa-chevron-right small ms-2" />
                </button>
              </div>
            </div>
          </div >
        </div>
      </div>
    </>
  )
}
