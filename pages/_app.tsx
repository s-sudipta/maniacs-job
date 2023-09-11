//https://youtu.be/ZmpO65DhRN0 
//https://github.com/sairajchouhan/nextjs-firebase-auth/blob/main/pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/globals.css';
import Head from "next/head";
import type { AppProps } from 'next/app'
import Footer from "../component/footer/footer.jsx"
import Navbar from "../component/navbar/navbar.jsx"
import { AuthContextProvider } from '../context/AuthContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { parseCookies } from 'nookies';
import ProtectedRoute from '../context/ProtectedRoute'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const noAuthRequired = ['/', '/login', '/signup', '/search']

function MyApp({ Component, pageProps }: AppProps) {
const router = useRouter()
const cookie = parseCookies()
useEffect(()=>{
    if(cookie.theme == 'dark'){
      document.documentElement.style.setProperty('--back-gd-color', '#1f2522');
      document.documentElement.style.setProperty('--text-color', '#cdcdcd');
      document.documentElement.style.setProperty('--second-bg-color', '#222220');
    }
  else{
    document.documentElement.style.setProperty('--back-gd-color', '#fff');
    document.documentElement.style.setProperty('--text-color', '#212529');
    document.documentElement.style.setProperty('--second-bg-color', ' #f0f7ff');
  }
},[cookie.theme]);  
return (
    <AuthContextProvider>
      <Head>
        <title>WRKR Miniacs</title>
        <link rel="icon" href="/icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <Navbar/>
      {noAuthRequired.includes(router.pathname) ? (
        <div className="main"><ToastContainer /><Component {...pageProps} /></div>
      ) : (
        <ProtectedRoute>
          <div className="main"><ToastContainer /><Component {...pageProps} /></div>
        </ProtectedRoute>
      )}
      <Footer/>
    </AuthContextProvider>
  )
}
export default MyApp