import React from 'react'
import "@assets/css/main.css"
import Header from '@ui/internal/components/header'

import { Route, Routes, useSearchParams } from 'react-router-dom'
import Login from '@ui/internal/components/login'
import Cookies from "js-cookie"
import Publish from '@ui/internal/components/publish'

const App:React.FC = () => {
  const[searchParams] = useSearchParams();
  return (<>
       {Cookies.get("content_id") && !Cookies.get("token") && <Header />}
       {
         (["login","signup"].includes(searchParams.get("action")||"") && !Cookies.get("token"))  ? 
        <Login />
        :

        <Publish />
       }
     
  
  </>)
}

export default App