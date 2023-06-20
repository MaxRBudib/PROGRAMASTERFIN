import Head from 'next/head';
import Link from "next/link";
import { useEffect, useState, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import ViewLayout from './layouts/common/ViewLayout';

export default function Home() {
  const { user } = useContext(AuthContext)
  const [matricula, setMatricula] = useState()
  const [usuariosGrupo, setUsuariosGrupos] = useState([])
  const [grupos, setGrupos] = useState([])

  useEffect(() => {
    if (user) {
      try {
        const decodedUser: any = jwtDecode(user);
        setMatricula(decodedUser.user_id)
      } catch {
        setMatricula(user.user_id)
      }
    }
    try {
      axios.get('http://backend:9200/my_view/usuarioGrupo/', {
        params: {
          matricula_nomina: matricula
        }
      }).then(response => {
        //const dataGrupo = response.data
        setUsuariosGrupos(response.data)
      })
    } catch {
      console.log("Error getting groups");
    }
  }, [user]);

  useEffect(() => {
    try {
      axios.get('http://backend:9200/my_view/grupo/').
        then((response) => {
          //console.log(response.data)
          setGrupos(response.data)
        })
    } catch {

    }
  }, [])

  return (
    <>
      <Head>
        <title>Mis Grupos </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ViewLayout>
        <nav className="bg-transparent pt-6 px-8 flex items-center justify-end h-[12%]">
          <button className="btn btn-primary text-base">
            <Link rel="stylesheet" href="/userview/Addgroupview/">Registrar grupo</Link>
          </button>
        </nav>
        <div className='h-[88%] w-full px-6 py-4 grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {usuariosGrupo.map((d_ug: any, i) => (
            <>
              {grupos.filter((d: any) => d.grupo_id === d_ug.grupo_id && matricula == d_ug.matricula_nomina)
                .map((d: any, index) => (
                  <div key={index} className='flex items-start gap-4"'>
                    <div className="card w-full bg-base-100 shadow-xl">

                      <div className="card-body">
                        <h2 className="card-title">{d.nombre_grupo} ({d.grupo_id})</h2>
                        <h2 className="card-subtitle">  Codigo de Acceso: {d.codigo_acceso}</h2>
                        <p>En este espacio se han integrado las actividades y recursos que te servirán de guía para desarrollar las subcompetencias correspondientes a esta unidad de formación.

                        </p>
                        <Link href="/userview/Modulosview">
                          <div className="card-actions justify-start">
                            <button className="btn btn-primary btn-sm mt-1">Ver</button>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          ))}
        </div>
      </ViewLayout>


    </>

  )
}