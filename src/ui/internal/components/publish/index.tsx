import React, { useEffect, useState } from 'react'
import "@assets/css/main.css"
import TextEditor from '@ui/external/components/texteditor'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { NoteForm } from '@utils/interface/form.interface'
import { InputField } from '@ui/external/components/fields/Fields'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getNoteAdd, getNoteBySlug, getNoteUpdate } from '@services/api.services'
import Cookies from 'js-cookie'

const Publish:React.FC = () => {
    const[searchParams,setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const getSlug = () => {
        const slug = window.location.pathname;
        return slug.startsWith('/') ? slug.slice(1) : slug;
    };

  
    
    const {
      register,
      handleSubmit,
      watch,
      control,
      reset,
      formState: { errors },
    } = useForm<NoteForm>();
  
    const errorsMessage:NoteForm  = {
      title : "title too short",
      aurthor : "aurthor too short",
      description : "description too short",
    };

    const [isPublish,setisPublish] = useState<boolean>(false);
    const onSubmit: SubmitHandler<NoteForm> = async (data) => {
        const {data:noteData, status}:any = !isPublish ? await getNoteAdd({fdata : data}) : await getNoteUpdate({fdata : data})  ;
        if([200,201].includes(status)){
            setisPublish(()=> true);
            navigate(`${noteData.data.slug}`)
            Cookies.set("content_id" , noteData.data.content_id)
        }
    };


    const getNote = async () => {
        try {
          const {data,status}:any = await getNoteBySlug({fdata : getSlug()});
            if([200,201].includes(status)){
                reset(data.data);
                if(data.is_edit) {
                    setisPublish(()=>true)
                }
            }
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    useEffect(()=>{
        if(getSlug()){
            getNote();
        }
    }, []);

  return (<>
         <div className="container w-[900px] mx-auto px-4 sm:px-6 lg:px-8  grid mt-10">

<div className="">
    {errors.title && <span className='text-red-500 capitalize text-sm me-2'>{errorsMessage.title} *</span>}
    {errors.aurthor && <span className='text-red-500 capitalize text-sm me-2'>{errorsMessage.aurthor} *</span>}
    {errors.description && <span className='text-red-500 capitalize text-sm'>{errorsMessage.description} *</span>}
    </div>
  <form onSubmit={handleSubmit(onSubmit)}>
  <div className="titleBox flex">
  <div className="w-full flex aligns-center">
   {(watch("title")?.length && (isPublish || !getSlug() ) ) ?  <div className="my-auto title-lable">Title</div> : null}

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
  {(isPublish || !getSlug() ) && <div className="">
    <button type='submit' className='btn btn-outline'>{isPublish ? "Edit" :"Publish"}</button>
  </div>}
  </div>

  <div className="aurthorBox w-full flex aligns-center">
   {(watch("aurthor")?.length && (isPublish || !getSlug() ) ) ?  <div className="my-auto aurthor-lable">Aurthor</div> : null}
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
   
   {(watch("description")?.length && (isPublish || !getSlug() ) ) ?  <div className="description-lable">Description</div> : null}
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
  
  
  </>)
}

export default Publish