import { InputField } from '@ui/external/components/fields/Fields'
import { LoginForm, SignupForm } from '@utils/interface/form.interface';
import React from 'react'
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
      const onSubmit: SubmitHandler<SignupForm> = (data) => console.log(data);

  return (<>
    
    <form className='container w-[400px] mx-auto' onSubmit={handleSubmit(onSubmit)}>
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