import { Suspense } from 'react'
import React from 'react'
import { fetchData } from '../../../js/FetchData'

const apiData = fetchData("https://stilettoapi.com/api/pacientes")

const FormularioHistoria = () => {
  const data = apiData.leer();
  console.log(data)
  return (
    <div>
      Formulario Historias
      <br />
      <Suspense fallback={<div>Cargando...</div>}>
        <ul className='card'>
          {data?.map((paciente)=>(
            <li key={paciente.id}>{paciente.nombres}</li>
          ))}
        </ul>
      </Suspense>
    </div>
  )
}

export default FormularioHistoria