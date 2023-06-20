import Head from 'next/head';
import React from 'react';
import Link from "next/link";
import Timer from '@/components/Utilities/Timer';
import axios from 'axios';
import { useEffect, useState, useRef, useContext } from 'react';
import ViewLayout from '@/components/layouts/common/ViewLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import jwtDecode from 'jwt-decode';

const extensions = [python()];

function Home() {

  const baseTareaURL = "http://10.50.70.236:9200/my_view/tarea/";
  const baseEjURL = "http://10.50.70.236:9200/my_view/ejercicios/";
  const baseOpcionesURL = "http://10.50.70.236:9200/my_view/opciones/";
  const baseTestCasesURL = "http://10.50.70.236:9200/my_view/testCases/";
  const baseUsEjTarURL = "http://10.50.70.236:9200/my_view/usuarioEjercicioTarea/";

  const router = useRouter()
  const [tareaID, setTareaID] = useState('')

  useEffect(() => {
    async function fetchData(){
      const data = await axios.get(`http://10.50.70.236:9200/my_view/ejercicioTarea/?tarea_id=${router.query.tarea as string}`)
      const question = await axios.get(`http://10.50.70.236:9200/my_view/tarea/?tarea_id=${router.query.tarea as string}`)
      setNombreTarea(question.data[0].nombre_tarea)
      setEjTar(data.data)
    }
    if (router.isReady) {
      setTareaID(router.query.tarea as string)
      fetchData()

    }
  }, [router.isReady]);

  let answ = ''
  const [nombreTarea, setNombreTarea] = useState('')
  const [tarea, setTarea] = useState([])
  const [failed, setFailed] = useState([])
  const [passed, setPassed] = useState([])
  const [ejTar, setEjTar] = useState([])
  const [ejercicio, setEjercicio] = useState([])
  const [opciones, setOpciones] = useState([])
  const [testCases, setTestCases] = useState([])
  const [cody, setCody] = useState('print()')
  const [resultado, setResultado] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const time = new Date();
  const [selected, setSelected] = useState('')
  time.setSeconds(time.getSeconds() + 600);
  const { user } = useContext(AuthContext)
  const [matricula_nomina, SetMatricula_Nomina] = useState()

  useEffect(() => {
    axios.get(baseTareaURL, {
      params: {
        tarea_id: tareaID
      }
    }).then((response) => {
      setTarea(response.data)
    })
  }, [tareaID]);

  const lastIndex = currentPage;
  const firstIndex = lastIndex - 1;
  const records = ejTar.slice(firstIndex, lastIndex);
  const npage = ejTar.length;
  const numbers = [...Array(npage + 1).keys()].slice(1);
  let selectedValue: any
  const [selectedRadios, setSelectedRadios] = useState(Array(30).fill(0))

  useEffect(() => {
    if (user) {
      try {
        const decodedUser = jwtDecode(user);
        SetMatricula_Nomina(decodedUser.user_id)

      } catch {
        console.log("Error decoding user");

        SetMatricula_Nomina(user.user_id)
        console.log(matricula_nomina)
      }
    }
  }, [user]);

  useEffect(() => {
    try {
      axios.get(baseEjURL).then((response) => {
        setEjercicio(response.data)
      })
    } catch {
      console.log("zero")
    }
  }, [])

  useEffect(() => {
    axios.get(baseOpcionesURL).then((response) => {
      setOpciones(response.data)
    })
  }, [])

  useEffect(() => {
    axios.get(baseTestCasesURL).then((response) => {
      console.log(response.data)
      setTestCases(response.data)
    })
  }, [])


  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, id_ejercicio: number) => {

    setSelected(event.target.value)
    selectedValue = event.target.value;

    //const selectedIndex = parseInt(event.target.id);
    let selectedOption = opciones.filter((opcion: any) => opcion.ejercicio_id === ejercicio[id_ejercicio - 1].ejercicio_id);

    const respuestasLista = selectedOption.map((opcion) => opcion.respuesta)
    
    let respuestaCorrecta: any

    for (let i = 0; i < respuestasLista.length; i++) {
      if (respuestasLista[i] == true) {
        respuestaCorrecta = i;
        break; // Si coincide, podemos detener el bucle ya que hemos encontrado una coincidencia
      }
    }

    if (selectedValue == selectedOption[respuestaCorrecta].texto) {
      try {
        const response = axios.patch(baseUsEjTarURL, {
          matricula_nomina: matricula_nomina,
          ejercicio_id: id_ejercicio,
          tarea_id: tareaID,
          status: '2',
        });
      } catch (error) {
        console.error(error);
      }
    } else {

      try {
        const response = axios.patch(baseUsEjTarURL, {
          matricula_nomina: matricula_nomina,
          ejercicio_id: id_ejercicio,
          tarea_id: tareaID,
          status: '1',
        });
        //console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    // Aqui se hace el patch de usuarioEjercicioTarea con correcto

    selectedRadios.map((c, i) => {
      if (i === currentPage - 1) {

        selectedRadios[currentPage - 1] = selectedValue;

      } else {
        // The rest haven't changed
      }
    })
  };



  const runCode = (see: any, id_ejercicio: number) => {


    const formattedTestCases = see.map((see: any) => {

      const inputs = JSON.parse(see.input);
      const output = JSON.parse(see.output);

      const formattedOutputs = JSON.stringify(output).replace(/\n/g, '\n');
      return `(${JSON.stringify(inputs)}, ${formattedOutputs})`;
    });

    const formattedString = formattedTestCases.join(", ");

    console.log(formattedString);

    const tests = formattedString
    let code
    if (answ.length == 0) {
      code = cody
    } else {
      code = answ
      setCody(answ)
    }
    const submit = false
    axios.post('http://10.50.70.236:9200/my_view/code/', { code, submit, tests }).then(({ data }) => {
      if (data.output.length != 0) {
        console.log(data.output)
        setResultado(data.output)
      } else {
        setResultado(data.errors)
      }
      if (data.passed.length != 0) {
        setPassed(data.passed)
      } else {
        setPassed([0])
      }
      if (data.failed.length != 0) {
        setFailed(data.failed)

        // status 1
        try {
          const response = axios.patch(baseUsEjTarURL, {
            matricula_nomina: matricula_nomina,
            ejercicio_id: id_ejercicio,
            tarea_id: tareaID,
            status: '1',
          });

          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        setFailed([0])

        // status 2
        try {
          const response = axios.patch(baseUsEjTarURL, {
            matricula_nomina: matricula_nomina,
            ejercicio_id: id_ejercicio,
            tarea_id: tareaID,
            status: '2',
          });

          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    })

  }

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }

  function changeCPage(id: number) {
    setCurrentPage(id)
  }

  function ReactivoWrapper({ id }: any) {
    return (
      <>
        {ejercicio.map((d: any, i: any) => (
          <>
            {id.tipo}
            {id === d.ejercicio_id ? (
              <Reactivo d={d}></Reactivo>
            ) : (
              <div key={i}></div>
            )}
          </>
        ))}
      </>
    )
  }

  function Reactivo({ d }: any) {
    if (d.tipo == "Opcion Multiple") {
      return (
        <div className='min-h-[79%] flex flex-col items-center justify-center p-8'>
          <div className='w-3/5'>
            <div className='flex flex-col'>
              <fieldset>
                <div className="rounded-lg shadow-md bg-gray-800 p-8 flex flex-col justify-between">
                  <div className="border-b border-slate-200 pb-4 font-semibold text-lg text-gray-200">{d.descripcion}</div>
                  {opciones.map((d_op: any, i: any) => (
                    <>
                      {d_op.ejercicio_id === d.ejercicio_id ? (
                        <div className="form-control" key={i}>
                          <label className="label pt-4 justify-start cursor-pointer">
                            <input onChange={(event) => handleRadioChange(event, d.ejercicio_id)} checked={selectedRadios[currentPage - 1] === d_op.texto} type="radio" name="status" id={i.toString()} value={d_op.texto} className="peer/option1 radio radio-sm radio-info border-slate-300 mr-3" />
                            <span className="peer-checked/option1:text-cyan-600 font-medium text-base label-text">{d_op.texto}</span>
                          </label>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </>
                  ))}
                </div>
              </fieldset>

              {currentPage === npage ? (
                <button className='place-self-end rounded-md mt-4 font-bold btn btn-primary'>
                  <Link rel="stylesheet" href="/userview/Inicioview/">Submit</Link>
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      );
    } else if (d.tipo == "Codigo") {
      return (
        <div className='h-[79%] flex items-start justify-center p-4'>
          <div className='flex flex-col bg-gray-800 block rounded-lg shadow-md h-full w-2/5 mr-3'>
            <div className='flex flex-col h-full w-full overflow-y-auto'>
              <div className='flex flex-col items-center'>
                <div className="flex flex-col w-full h-full p-6">
                  <div className='flex flex-row justify-start items-center'>
                    <span className="font-mono font-semibold text-lg text-gray-200">{d.titulo}</span>
                    <span className="badge badge-primary font-medium text-sm text-gray-100 ml-6 mr-2">{d.dificultad}</span>
                  </div>
                  <span className='font-base font-mono text-sm leading-tight text-gray-100 pt-3'>{d.descripcion}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex-col h-full w-full'>
            <CodeMirror className='flex-grow h-[52%] bg-gray-800 rounded-lg overflow-auto'
              value={cody}
              extensions={extensions}
              theme={'dark'}
              indentWithTab={true}
              onChange={(editor, value) => {
                answ = editor
              }}
            />
            <div></div>
            <div className='flex space-x-3 pt-3 justify-between w-full h-[38%] font-mono'>
              <div className='w-1/3 h-full bg-gray-800 rounded-lg overflow-auto'>
                <div className='flex items-center w-full h-[10%] bg-gray-700 rounded-t-lg'>
                  <span className='text-sm pl-3 font-semibold truncate'>
                    Casos de prueba
                    <div>
                      <div>
                        Pasados: {passed}
                      </div>
                      <div>
                        Fallados: {failed}
                      </div>
                    </div>
                  </span>
                </div>
              </div>
              <div className='w-2/3 h-full bg-gray-800 rounded-lg overflow-auto'>
                <div className='flex items-center w-full h-[10%] bg-gray-700 rounded-t-lg'>
                  <span className='text-sm pl-3 font-semibold truncate'>
                    Output
                    {resultado.map((d: any, i: any) => (
                      <div>testcase number {i + 1}: {d}</div>
                    ))}
                  </span>
                </div>
              </div>
            </div>
            <div className='flex h-[8%] w-full justify-end items-center font-mono font-normal pt-2 space-x-2 '>
              <button
                className="btn btn-neutral text-slate-200 bg-teal-600 hover:bg-teal-700 btn-sm"
                onClick={() => runCode(testCases
                  .filter((d_op: any) => d_op.ejercicio_id === d.ejercicio_id)
                  .map((d_op: any) => ({
                    input: d_op.input,
                    output: d_op.output
                  })), d.ejercicio_id)}
              >
                Run
              </button>
              {currentPage === npage ? (
                <button className='place-self-end rounded-md mt-4 font-bold btn btn-primary'>
                  <Link rel="stylesheet" href="/userview/Inicioview/">Submit</Link>
                </button>
              ) : (
                <></>
              )}

            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <>
      <Head>
        <title>Tareas View</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewLayout>
        <div id='choice' className='bg-gradient-to-r from-blue-950 via-slate-800 to-slate-950 flex flex-col justify-center font-sans w-full min-h-[12%] border-b-2 border-slate-400'>
          <div className='flex justify-between p-4 px-6'>
            <span className='self-center text-3xl font-semibold text-slate-100'>{nombreTarea}</span>
            <div className='flex flex-col gap-y-2'>
              <span className='text-base font-semibold text-slate-100'>Tiempo Restante: {<Timer expiryTimestamp={time}></Timer>}</span>
              <span className='text-sm font-medium text-slate-100'>Tarea cierra: 29 de Mayo 11:59 pm</span>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-r from-blue-950 via-slate-800 to-slate-950 flex flex-row justify-between items-center min-h-[9%] py-2 border-b-2 border-slate-400'>
          <div className='flex flex-row gap-2 items-center justify-center pl-4'>
            <button onClick={prevPage} className='w-fit rounded-md p-3 font-bold bg-gray-700 hover:bg-gray-600'>
              <FontAwesomeIcon className='text-slate-200 h-4' icon={solid("angle-left")} />
            </button>
            {numbers.map((n, i) => (
              <div key={i} className={`${currentPage === n ? 'active' : ''}flex gap-2`}>
                <button onClick={() => changeCPage(n)} className={`${currentPage === n ? 'bg-gray-600' : 'bg-gray-700'} ${selectedRadios[i] === 0 ? 'bg-gray-600' : 'bg-teal-600'} w-fit rounded-md py-2 px-4 font-bold hover:bg-gray-600 text-slate-200`}>{n}</button>
              </div>
            ))}
            <button onClick={nextPage} className='w-fit rounded-md p-3 font-bold bg-gray-700 hover:bg-gray-600'>
              <FontAwesomeIcon className='text-slate-200 h-4' icon={solid("angle-right")} />
            </button>
          </div>
          <span className='px-5 text-base font-semibold dark:text-slate-100'>Pregunta {currentPage} de {npage}</span>
        </div>
        <>
          {records.map((d: any, i: any) => (
            <ReactivoWrapper key={i} id={d.ejercicio_id}></ReactivoWrapper>
          ))}
        </>
      </ViewLayout >
    </>
  )
}




export default Home 