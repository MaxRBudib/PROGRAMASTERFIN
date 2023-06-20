import Head from 'next/head';
import Link from "next/link";
import axios from 'axios';
import React, { useState, useEffect, useContext } from "react";
import jwtDecode from 'jwt-decode';
import AuthContext from '@/context/AuthContext';
import { useRouter } from 'next/router';

export default function Home() {

    const UsuarioGrupoURL = "http://backend:9200/my_view/usuarioGrupo/";
    const UsuariosURL = "http://backend:9200/my_view/usuarios/";

    const { user } = useContext(AuthContext)
    const router = useRouter()
    const [grupoID, setGrupoID] = useState('')
    const [matriculas, setMatriculas] = useState()

    useEffect(() => {
        if (router.isReady) {
            setGrupoID(router.query.grupo as string)
        }
    }, [router.isReady])

    const [usuarioGrupo, setUsuarioGrupo] = useState([])
    const [estudiantes, setEstudiantes] = useState([])

    useEffect(() => {
        axios.get(UsuarioGrupoURL, {
            params: {
                grupo_id: grupoID
            }
        }).then((response) => {
            setUsuarioGrupo(response.data)
        })
    }, [router.isReady]);

    useEffect(() => {
        axios.get(UsuariosURL).then((response) => {
            setEstudiantes(response.data)
        })
    }, []);

    const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

    const handleCheckboxChange = (index: number) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter((row) => row !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };

    const handleDelete = () => {
        setIsDeletePopupOpen(true);
        //logica para nuevos elementos
    };

    const handleAdd = () => {
        //logica para nuevos elementos
        const newStudent = {
            matricula_nomina: estudiantes.length + 1,
            nombre_usuario: "Nuevo",
            apellido: "Estudiante",
        }
        setEstudiantes([...estudiantes, newStudent]);
    };

    const handleConfirmDelete = () => {
        setEstudiantes(estudiantes.filter((_, index) => !selectedRows.includes(index - 1)))
        setSelectedRows([]);
        setIsDeletePopupOpen(false);
    }

    const handleCancelDelete = () => {
        setIsDeletePopupOpen(false);
    }

    return (
        <>
            <Head>
                <title>Estudiantes</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex justify-center items-center ">
                <div className='w-5/6'>
                    <div className='flex justify-end mb-4'>
                        <button className='btn bg-green-500 hover:bg-green-600 text-white' onClick={handleAdd}>
                            Agregar
                        </button>
                        <button className='btn bg-red-500 hover:bg-red-600 text-white ml-4' onClick={handleDelete} disabled={selectedRows.length === 0}>
                            Eliminar
                        </button>
                    </div>
                    <div className='overflow-x-auto'>
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>
                                        <label>
                                        </label>
                                    </th>
                                    <th>Nombre</th>
                                    <th>Grupo</th>
                                    <th>Matricula</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {usuarioGrupo.map((d_ug: any) => (
                                    <>
                                        {estudiantes.filter((d: any) => d.matricula_nomina === d_ug.matricula_nomina)
                                            .map((d: any, index) => (
                                                <tr key={d.matricula_nomina}>
                                                    <th>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                className="checkbox"
                                                                checked={selectedRows.includes(index)}
                                                                onChange={() => handleCheckboxChange(index)}
                                                            />
                                                        </label>
                                                    </th>
                                                    <td>
                                                        <div className="flex items-center space-x-3">
                                                            <div className="avatar">
                                                                <div className="mask mask-squircle w-12 h-12">
                                                                    <img src="/avatar1.jpg" alt="Avatar Tailwind CSS Component" />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold">{d.nombre_usuario}</div>
                                                                <div className="text-sm opacity-50">{d.apellido}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {grupoID}
                                                    </td>
                                                    <td>{d.matricula_nomina}</td>
                                                    <th>
                                                        <Link href="/userview/Detailview" className=''>
                                                            <button className="btn btn-ghost btn-xs">details</button>
                                                        </Link>
                                                    </th>
                                                </tr>
                                            ))}
                                    </>
                                ))}

                            </tbody>

                        </table>
                    </div>
                    {isDeletePopupOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6">
                                <h2 className="text-lg font-bold mb-4">Confirmar Eliminación</h2>
                                <p>¿Estás seguro de que deseas eliminar a los estudiantes seleccionados?</p>
                                <div className="flex justify-end mt-6">
                                    <button
                                        className="btn btn-red"
                                        onClick={handleConfirmDelete}
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        className="btn btn-gray ml-2"
                                        onClick={handleCancelDelete}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}