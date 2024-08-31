import React from 'react'
import "@assets/css/main.css"
import TextEditor from './ui/external/components/texteditor'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { NoteForm } from '@utils/interface/form.interface'
import { InputField } from './ui/external/components/fields/Fields'
import Header from '@ui/internal/components/header'

import { useSearchParams } from 'react-router-dom'
import Login from '@ui/internal/components/login'
import Cookies from "js-cookie"

const App:React.FC = () => {
  const[searchParams,setSearchParams] = useSearchParams();


  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<NoteForm>();

  const errorsMessage:NoteForm  = {
    title : "title too short",
    aurthor : "aurthor too short",
    description : "description too short",
  };
  const onSubmit: SubmitHandler<NoteForm> = (data) => console.log(data);

  return (<>
       {Cookies.get("content_id") && !Cookies.get("token") && <Header />}
       {
         (["login","signup"].includes(searchParams.get("action")||"") && !Cookies.get("token"))  ? 
        <Login />
        :

        <div className="container w-[900px] mx-auto px-4 sm:px-6 lg:px-8  grid mt-10">

        <div className="">
            {errors.title && <span className='text-red-500 capitalize text-sm me-2'>{errorsMessage.title} *</span>}
            {errors.aurthor && <span className='text-red-500 capitalize text-sm me-2'>{errorsMessage.aurthor} *</span>}
            {errors.description && <span className='text-red-500 capitalize text-sm'>{errorsMessage.description} *</span>}
            </div>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="titleBox flex">
          <div className="w-full flex aligns-center">
           {watch("title")?.length ?  <div className="my-auto title-lable">Title</div> : null}
  
            <Controller
                name="title"
                control={control}
                rules={{ required: true, minLength: 10 }}
                render={({ field }) => (
                  <InputField 
                  placeholder='Title'
                  autoFocus
                  type='text'
                   {...field}
                  className={`w-full p-2 rounded title-input`}
                  
                   />
                )}
              />
          </div>
          <div className="">
            <button type='submit' className='btn btn-outline'>Publish</button>
          </div>
          </div>
  
          <div className="aurthorBox w-full flex aligns-center">
           {watch("aurthor")?.length ?  <div className="my-auto aurthor-lable">Aurthor</div> : null}
            <Controller
                name="aurthor"
                control={control}
                rules={{ required: true, minLength: 5 }}
                render={({ field }) => (
                  <InputField 
                  placeholder='Your name'
                  type='text'
                   {...field}
                  className={`w-full px-2  rounded  aurthor-input`}
                   />
                )}
              />
          </div>
  
          <div className="contentBox flex my-5">
           
           {watch("description")?.length ?  <div className="description-lable">Description</div> : null}
          <div className="w-full">
          <Controller
                name="description"
                control={control}
                rules={{ required: true, minLength: 10 }}
                render={({ field }) => (
                  <TextEditor {...field} placeholder="Your story..." />
                )}
              />
          </div>
          </div>
         
          </form>
        </div>
       }
     
  
  </>)
}

export default App