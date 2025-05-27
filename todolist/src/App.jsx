import { useState } from 'react'
import Headding from './components/Headding'
import Todolist from './components/Todolist'



function App() {


  return (
    <>
      <div className='container min-h-screen mx-auto py-32 '>
        <Headding />
        <Todolist />
      </div>
    </>
  )
}

export default App
