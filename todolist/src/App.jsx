
import Todolist from './page/Todolist'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
    <ToastContainer />
      <div className='container p-4 min-h-screen mx-auto py-32 '>
        <Todolist />
      </div>
    </>
  )
}

export default App
