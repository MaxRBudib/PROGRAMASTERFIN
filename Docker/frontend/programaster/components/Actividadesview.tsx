import Head from 'next/head';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter()
  const [clase, setClase] = useState('')
  useEffect(() => {
    if (router.isReady) {
      try {
        setClase(router.query.grupo as string)
      } catch {

      }
    }
  }, [router.isReady])

  const handleAddActivity = () => {
    console.log('Agregar Actividad')
  }

  return (
    <>
      <Head>
        <title>Actividades</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="bg-gray-900 text-white">
        <div className="max-w-screen px-4 pb-14 lg:px-8">
          <div className="max-w-screen">
            <div>
              <div className=" grid grid-cols-1 gap-8 md:mt-0 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
                <div className="flex items-start gap-4">
                  <span className="shrink-0 rounded-lg bg-white p-4 text-slate-900">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      ></path>
                    </svg>
                  </span>

                  <div>
                    <h2 className="text-lg font-bold text-white">Lorem, ipsum dolor.</h2>

                    <p className="mt-1 text-sm text-white">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                      cumque tempore est ab possimus quisquam reiciendis tempora animi!
                      Quaerat, saepe?
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="shrink-0 rounded-lg bg-white p-4 text-slate-900">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      ></path>
                    </svg>
                  </span>

                  <div>
                    <h2 className="text-lg font-bold text-white">Lorem, ipsum dolor.</h2>

                    <p className="mt-1 text-sm text-white">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                      cumque tempore est ab possimus quisquam reiciendis tempora animi!
                      Quaerat, saepe?
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="shrink-0 rounded-lg bg-white p-4 text-slate-900">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      ></path>
                    </svg>
                  </span>

                  <div>
                    <h2 className="text-lg font-bold text-white">Lorem, ipsum dolor.</h2>

                    <p className="mt-1 text-sm text-white">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                      cumque tempore est ab possimus quisquam reiciendis tempora animi!
                      Quaerat, saepe?
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="shrink-0 rounded-lg bg-white p-4 text-slate-900">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      ></path>
                    </svg>
                  </span>

                  <div>
                    <h2 className="text-lg font-bold text-white">Lorem, ipsum dolor.</h2>

                    <p className="mt-1 text-sm text-white">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                      cumque tempore est ab possimus quisquam reiciendis tempora animi!
                      Quaerat, saepe?
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="shrink-0 rounded-lg bg-white p-4 text-slate-900">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      ></path>
                    </svg>
                  </span>

                  <div>
                    <h2 className="text-lg font-bold text-white">Lorem, ipsum dolor.</h2>

                    <p className="mt-1 text-sm text-white">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                      cumque tempore est ab possimus quisquam reiciendis tempora animi!
                      Quaerat, saepe?
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="shrink-0 rounded-lg bg-white p-4 text-slate-900">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      ></path>
                    </svg>
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-white">Lorem, ipsum dolor.</h2>

                    <p className="mt-1 text-sm text-white">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                      cumque tempore est ab possimus quisquam reiciendis tempora animi!
                      Quaerat, saepe?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-row justify-end'>
          <Link href={`/userview/AddAct?queryparam=${clase}`} className="">
            <button className='bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 mx-6 mb-6 rounded-lg font-bold'
              onClick={handleAddActivity}>
              Agregar Actividad
            </button>
          </Link>
        </div>
      </section>

    </>

  )
}