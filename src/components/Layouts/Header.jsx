
const Header = () => {

  return (
    <div style={{ width: '100%', background: "#273a4f", height: 100, marginBottom: 10 }}>
      <img src="/img/logoClubDJ.png" width={80} height={80}
        style={{
          borderRadius: '50%',
          margin: ".7rem"
        }}
      />
      <span className='text-white bold'>Registro de Asistencia y Monedas </span>
    </div>
  )
}

export default Header