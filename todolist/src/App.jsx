import { useState } from 'react'
import Headding from './components/Headding'
import Todolist from './components/Todolist'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
    <ToastContainer />
      <div className='container min-h-screen mx-auto py-32 '>
        <Headding />
        <Todolist />
      </div>
    </>
  )
}

export default App
