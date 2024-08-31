import React from 'react'
import { useSearchParams } from 'react-router-dom';

const Header:React.FC = () => {
    const[searchParams,setSearchParams] = useSearchParams();

    
  const handelAction = ({type}:{type : "login" | "signup"}) => {
    searchParams.set("action" , type);
    setSearchParams(()=> searchParams);
    }
  return (<>
  
  <div className="container bg-cyan-600  px-10 py-3 flex justify-between aligns-center">
          <div className="my-auto">
            <span className="text-slate-200 text-sm my-auto">Note* without login, data access temporary</span>
          </div>
          <div className="btn-group">
          <button className='btn btn-white rounded-[5px] p-1 px-3 me-2' onClick={()=>handelAction({type  :"login"})}>Login</button>
          <button className='btn btn-white-outline rounded-[5px] text-white p-1 px-3' onClick={()=>handelAction({type  :"signup"})}>SignUp</button>
          </div>
        </div>


  
  </>)
}

export default Header