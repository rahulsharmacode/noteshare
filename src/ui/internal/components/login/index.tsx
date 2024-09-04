import { getLogin, getSignUp } from '@services/api.services';
import { InputField } from '@ui/external/components/fields/Fields'
import { LoginForm, SignupForm } from '@utils/interface/form.interface';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

const Login = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
      } = useForm<SignupForm>();
      const [logInfo,setlogInfo] = useState<any>();
      const onSubmit: SubmitHandler<SignupForm> =  async (data) => {
        try{
            const {data:logData,status}:any = searchParams.get("action")==="login" ? await getLogin({fdata : data}) : searchParams.get("action")==="signup" ? await getSignUp({fdata : data}) : null;
        if([200,201].includes(status)){
            setlogInfo({
                success : true,
                data : logData,
            });
            setTimeout(() => {
                Cookies.set("token" , logData.token);
                searchParams.delete("action");
                setSearchParams(()=>searchParams);
            }, 1500);
        }
        else{
            setlogInfo({
                success : false,
                data : "login failed",
            });
        }
        }
        catch(err){
            setlogInfo({
                success : false,
                data : "login failed",
            });
        }
      };

  return (<>
    
    <form className='container w-[400px] mx-auto' onSubmit={handleSubmit(onSubmit)}>
       

    {
                searchParams.get("action")==="signup" && 
                <div className="border-b mt-5">

                <Controller
                      name="name"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
        
                        <InputField 
                    placeholder='Enter full name'
                    type='text'
                    {...field}
                    className={"outline-0 w-full py-2"}
                    />
                      )}
                    />
            {errors.name && <span className='text-red-500 capitalize text-sm me-2'>{"name is required"} *</span>} 

                </div>
              }


        <div className="border-b mt-5 mb-3">

        <Controller
                name="email"
                control={control}
                rules={{ required: true,  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: 'Invalid email address'
                  } }}
                render={({ field }) => (
                  <InputField 
                  placeholder='Enter email'
                  autoFocus
                  type='text'
                   {...field}
                  className={`w-full py-2 rounded outline-0`}
                  
                   />
                )}
              />

{errors.email && <span className='text-red-500 capitalize text-sm me-2'>{errors.email.message || "email required"} *</span>}
            
        </div>
        <div className="border-b mb-5">

        <Controller
              name="password"
              control={control}
              rules={{ required: true}}
              render={({ field }) => (

                <InputField 
            placeholder='Enter password'
            type='password'
            {...field}
            className={"outline-0 w-full py-2"}
            />
              )}
            />
            {errors.password && <span className='text-red-500 capitalize text-sm me-2'>{"password required"} *</span>}
        </div>
       
      

     {logInfo &&   <div className={` mb-5 ${logInfo.data.message ? "bg-green-100" : "bg-red-100"} border${logInfo.data.message ? " border-green-400" : " border-red-400"} ${logInfo.data.message ? "text-green-700" : "text-red-700"} px-4 py-2 rounded relative`} role="alert">
  <span className="block sm:inline">{logInfo.data.message || logInfo.data }</span>
</div>}


              {
                searchParams.get("action")==="signup" && 
                <div className="border-b mb-5">

                <Controller
                      name="confirm_password"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
        
                        <InputField 
                    placeholder='Enter confirm password'
                    type='password'
                    {...field}
                    className={"outline-0 w-full py-2"}
                    />
                      )}
                    />
            {errors.confirm_password && <span className='text-red-500 capitalize text-sm me-2'>{"confirm password required"} *</span>}
            {(watch("password") !== watch("confirm_password") && !errors.confirm_password) && <span className='text-red-500 capitalize text-sm me-2'>{"password and confirm password mis-match"} *</span>}

                </div>
              }

        <div className="">
        <button type='submit' className='btn btn-outline'>{searchParams.get("action")==="signup" ? "Sign Up" : "Login"}</button>
        </div>
    </form>
  
  </>)
}

export default Login