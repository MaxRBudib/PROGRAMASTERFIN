import Head from 'next/head';
import axios from 'axios';
import React from 'react';
import Link from "next/link";
import { useEffect, useState } from 'react';
import ViewLayout from '@/components/layouts/common/ViewLayout';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import jwtDecode from 'jwt-decode';

export default function Home() {

  const { user } = useContext(AuthContext)
  const [grupos, setGrupos] = useState()
  const [ute, setUte] = useState([])
  const [tareas, setTareas] = useState([])
  const tareasID: any = []
  const [anuncios, setAnuncios] = useState([])
  const [fecha, setFecha] = useState([])
  const [nomina, setNomina] = useState()
  const [nombre, setNombre] = useState([])
  const [apellido, setApellido] = useState([])
  const [email, setEmail] = useState([])

  //const [open, setOpen] = useState(false);
  const [act, setAct] = useState([])
  const [max, setMax] = useState([])
  const [val, setVal] = useState([])
  const [nivel, setNivel] = useState([])
  const [intento, setIntento] = useState([])
  const [estado, setEstado] = useState([])

  useEffect(() => {
    if (user) {
      try {
        const decodedUser = jwtDecode(user);
        setNomina(decodedUser.user_id)
        console.log(nomina)
      } catch {
        console.log("Error decoding user");
        setNomina(user.user_id)
        //console.log(matricula_nomina)
      }
    }
  }, [user]);

  //Get data for anuncios
  useEffect(() => {
    try {
      axios.get('http://backend:9200/my_view/usuarioGrupo/', {
        params: {
          matricula_nomina: nomina
        }
      }).then(response => {
        const dataGrupo = response.data[0].grupo_id
        setGrupos(dataGrupo)
        try {
          axios.get('http://backend:9200/my_view/anuncio/', {
            params: {
              grupo_id: dataGrupo
            }
          }).then(response => {

          })
        } catch {
          console.log("Error getting groups");
        }
      })
    } catch {
      console.log("Error getting groups");
    }
  }, [nomina]);

  //Get data for "Mi profesor" section
  useEffect(() => {
    try {
      axios.get('http://backend:9200/my_view/usuarioGrupo/', {
        params: {
          matricula_nomina: nomina
        }
      }).then(response => {
        const dataGrupo = response.data[0].grupo_id
        setGrupos(dataGrupo)
        axios.get('http://backend:9200/my_view/grupo/', {
          params: {
            grupo_id: dataGrupo
          }
        }).then(response => {
          const dataNomina = response.data[0].profe_nomina
          //setNomina(nomina)
          axios.get('http://backend:9200/my_view/usuarios/', {
            params: {
              matricula_nomina: dataNomina
            }
          }).then(response => {
            const dataNombre = response.data[0].nombre_usuario
            const dataApellido = response.data[0].apellido
            const dataCorreo = response.data[0].email

            setNombre(dataNombre)
            setApellido(dataApellido)
            setEmail(dataCorreo)
          })
        })
      })
    } catch {
      console.log("Error getting groups");
    }
  }, []);

  useEffect(() => {
    axios.get('http://backend:9200/my_view/tarea/').then(response => {
      setTareas(response.data)
    })
  }, [])

  useEffect(() => {
    axios.get('http://backend:9200/my_view/usuarioEjercicioTarea/', {
      params: {
        matricula_nomina: nomina
      }
    }).then(response => {
      setUte(response.data)
      tareas.map((d_t: any) => (
        ute.filter((d: any) => d.tarea_id === d_t.tarea_id && nomina === d.matricula_nomina).map((d: any, i: any) => (
          tareasID.push(d_t.tarea_id),
          act[i] = d_t.nombre_tarea
        ))
      ))
      setAct([...new Set(act)])
      tareasID.map((d_tID: any) => (
        ute.filter((d: any) => d_tID === d.tarea_id && nomina === d.matricula_nomina).map((d: any, i: any) => (
          console.log(d)
      ))
      ))
      //console.log(ute)
    })
  }, [])




  const titulo: string = "Pensamiento computacional para ingeniería"

  return (
    <>
      <Head>
        <title>Inicio view</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewLayout>
        <div className='bg-gradient-to-r from-blue-950 via-slate-800 to-slate-950 flex flex-col justify-center font-sans w-full min-h-[12%] border-b-2 border-slate-300'>
          <h1 className='px-8 self-center text-2xl font-bold text-slate-100'>{titulo} ({grupos})</h1>
        </div>
        <div className='w-full p-10'>
          <div className='flex flex-row justify-between'>
            <div className='w-3/4'>
              <h1 className='pb-3 text-xl text-slate-100 font-semibold border-b-2 border-slate-300'>Anuncios recientes</h1>
              <div className="p-4 border-b border-slate-500 whitespace-nowrap overflow-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start">
                    <img src='/achicopalado.jfif' className='rounded-full w-14'></img>
                    <Link href="/userview/Anuncioview" className='px-6 text-slate-100 underline underline-offset-2'>{anuncios}</Link>
                  </div>
                  <div className='flex flex-col pl-4'>
                    <span className='px-6 text-slate-100 font-semibold'>Publicado el:</span>
                    <span className='px-6 text-slate-300 font-base'>{fecha}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-1/5'>
              <h1 className='pb-3 text-xl font-semibold text-slate-200 border-b-2 border-slate-300 truncate'>Mi profesor</h1>
              <div className="text-slate-100 flex flex-col px-4 py-5 border-b border-slate-500 whitespace-nowrap overflow-auto">
                <span>{nombre} {apellido}</span>
                <span>Correo: {email}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col bg-slate-800 p-6 mt-8 rounded-2xl'>
            <div className='flex place-content-center border-b-2 border-slate-500 mb-3 pb-3'>
              <h1 className='text-xl font-semibold text-slate-200'>Progreso de actividades</h1>
            </div>
            <div className='flex flex-row justify-between px-4 lg:px-8 text-slate-200'>
              <div className='flex flex-col items-center'>
                <span className='font-semibold'>Actividad</span>
                {act.map((data) => (
                  <span className='py-1'>{data}</span>
                ))}
              </div>
              <div className='flex flex-row items-start'>
                <div className='flex flex-col items-start'>
                  <span className='pr-2 lg:pr-10 font-semibold'>% de Completado</span>
                  {max.map((data) => (
                    <progress className="progress progress-accent w-3/4 my-3 bg-slate-600" value={data} max={data}></progress>
                  ))}
                </div>
                <div className='flex flex-col items-center'>
                  <span className='font-semibold'>#</span>
                  {max.map((data) => (
                    <span className='py-1'>{data}</span>
                  ))}
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-semibold'>Nivel</span>
                {nivel.map((data) => (
                  <span className='py-1'>{data}</span>
                ))}
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-semibold'>Intentos</span>
                {intento.map((data) => (
                  <span className='py-1'>{data}</span>
                ))}
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-semibold'>Estado</span>
                {estado.map((data) => (
                  <div className={`${data == "Activa" ? 'badge-info' : 'badge-error'} badge text-sm my-1.5`}>{data}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ViewLayout >
    </>
  )

}